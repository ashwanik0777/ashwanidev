<?php
/*
 * Serves the website's PDFs (syllabi, brochures, acts, reports ...) at their usual addresses,
 * e.g. /courses/soict/cse/btech-cse-syllabus-2025-29.pdf.
 *
 * Why: together they are well over a gigabyte, and keeping them in git made the repository
 * too big for Hostinger to clone, so deployments failed. They now live on the server in the
 * folder below, outside every deploy folder (like /uploads), and .htaccess sends any PDF
 * that is not part of the deployed site here. The address of every PDF stays the same.
 *
 * Adding or replacing a PDF: put it in that folder under the same path it has in the
 * website (public/courses/x.pdf -> gbu-storage/static/courses/x.pdf). PDFs are not committed
 * (see .gitignore).
 *
 * Only PDFs are served; anything else, and anything outside the folder, is a 404.
 */

$root = getenv('GBU_STATIC_ROOT') ?: '/home/u261412788/gbu-storage/static';

function not_found(): void
{
    http_response_code(404);
    header('Content-Type: text/plain; charset=utf-8');
    header('X-Content-Type-Options: nosniff');
    header('Cache-Control: no-store');
    echo "Not found\n";
    exit;
}

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
if ($method !== 'GET' && $method !== 'HEAD') {
    http_response_code(405);
    header('Allow: GET, HEAD');
    exit;
}

$uri = parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH);
if (!is_string($uri) || $uri === '' || $uri[0] !== '/') {
    not_found();
}

$relative = rawurldecode(substr($uri, 1));
if ($relative === '' || strpos($relative, "\0") !== false || strpos($relative, '\\') !== false) {
    not_found();
}
foreach (explode('/', $relative) as $segment) {
    if ($segment === '' || $segment[0] === '.') {
        not_found();
    }
}
if (strtolower(pathinfo($relative, PATHINFO_EXTENSION)) !== 'pdf') {
    not_found();
}

$base = realpath($root);
$file = realpath($root . '/' . $relative);
if ($base === false || $file === false || strpos($file, $base . DIRECTORY_SEPARATOR) !== 0 || !is_file($file)) {
    not_found();
}

$size = filesize($file);
$modified = filemtime($file);
$etag = '"' . dechex($modified) . '-' . dechex($size) . '"';

header('Content-Type: application/pdf');
header('X-Content-Type-Options: nosniff');
header('Content-Disposition: inline; filename="' . addcslashes(basename($file), '"\\') . '"');
// A syllabus can be replaced under the same name, so browsers re-check once a day.
header('Cache-Control: public, max-age=86400');
header('ETag: ' . $etag);
header('Last-Modified: ' . gmdate('D, d M Y H:i:s', $modified) . ' GMT');
header('Accept-Ranges: bytes');

$ifNoneMatch = trim($_SERVER['HTTP_IF_NONE_MATCH'] ?? '');
$ifModifiedSince = strtotime($_SERVER['HTTP_IF_MODIFIED_SINCE'] ?? '') ?: 0;
if ($ifNoneMatch === $etag || ($ifNoneMatch === '' && $ifModifiedSince >= $modified)) {
    http_response_code(304);
    exit;
}

// Browsers' PDF viewers read big files in parts (Range requests), so the first page shows quickly.
$start = 0;
$end = $size - 1;
$range = $_SERVER['HTTP_RANGE'] ?? '';
if ($range !== '' && preg_match('/^bytes=(\d*)-(\d*)$/', trim($range), $m) && ($m[1] !== '' || $m[2] !== '')) {
    if ($m[1] === '') {
        $start = max(0, $size - (int) $m[2]); // last N bytes
    } else {
        $start = (int) $m[1];
        if ($m[2] !== '') {
            $end = min((int) $m[2], $size - 1);
        }
    }
    if ($start > $end || $start >= $size) {
        http_response_code(416);
        header('Content-Range: bytes */' . $size);
        exit;
    }
    http_response_code(206);
    header('Content-Range: bytes ' . $start . '-' . $end . '/' . $size);
}

$length = $end - $start + 1;
header('Content-Length: ' . $length);
if ($method === 'HEAD') {
    exit;
}

while (ob_get_level() > 0) {
    ob_end_clean();
}
$handle = fopen($file, 'rb');
if ($handle === false) {
    exit;
}
fseek($handle, $start);
$left = $length;
while ($left > 0 && !feof($handle)) {
    $chunk = fread($handle, (int) min(1048576, $left));
    if ($chunk === false) {
        break;
    }
    echo $chunk;
    flush();
    $left -= strlen($chunk);
}
fclose($handle);
