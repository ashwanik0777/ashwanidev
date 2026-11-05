<?php
/*
 * Serves uploaded files at /uploads/... on the website's own domain (.htaccess routes them here).
 *
 * The backend writes them to the folder below, outside every deploy folder, so
 * deploys never touch them. This runs on the origin where logins live, so only
 * types that cannot run scripts are served: never HTML or SVG. Grievance
 * attachments stay private.
 */

$root = getenv('GBU_UPLOAD_ROOT') ?: '/home/u261412788/gbu-storage/uploads';

$inline = [
    'webp' => 'image/webp',
    'jpg' => 'image/jpeg',
    'jpeg' => 'image/jpeg',
    'png' => 'image/png',
    'gif' => 'image/gif',
    'avif' => 'image/avif',
    'pdf' => 'application/pdf',
];
$download = [
    'doc' => 'application/msword',
    'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'xls' => 'application/vnd.ms-excel',
    'xlsx' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];

function not_found(): void
{
    http_response_code(404);
    header('Content-Type: text/plain; charset=utf-8');
    header('X-Content-Type-Options: nosniff');
    // Never cached, so a file restored later shows up straight away.
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
if (!is_string($uri) || strncmp($uri, '/uploads/', 9) !== 0) {
    not_found();
}

$relative = rawurldecode(substr($uri, 9));
if (strpos($relative, "\0") !== false || strpos($relative, '\\') !== false) {
    not_found();
}

$segments = explode('/', $relative);
foreach ($segments as $segment) {
    if ($segment === '' || $segment[0] === '.') {
        not_found();
    }
}
if (strtolower($segments[0]) === 'grievances') {
    not_found();
}

$extension = strtolower(pathinfo($relative, PATHINFO_EXTENSION));
$type = $inline[$extension] ?? $download[$extension] ?? null;
if ($type === null) {
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

header('Content-Type: ' . $type);
header('X-Content-Type-Options: nosniff');
// File names carry a timestamp and a random part, so a name never changes content.
header('Cache-Control: public, max-age=31536000, immutable');
header('ETag: ' . $etag);
header('Last-Modified: ' . gmdate('D, d M Y H:i:s', $modified) . ' GMT');
if (isset($download[$extension])) {
    header('Content-Disposition: attachment; filename="' . addcslashes(basename($file), '"\\') . '"');
}

if (trim($_SERVER['HTTP_IF_NONE_MATCH'] ?? '') === $etag) {
    http_response_code(304);
    exit;
}

header('Content-Length: ' . $size);
if ($method === 'GET') {
    while (ob_get_level() > 0) {
        ob_end_clean();
    }
    readfile($file);
}
