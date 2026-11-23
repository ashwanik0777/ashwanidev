/*
 * Justified description text across the public website, decided per block of text.
 *
 * Marking every paragraph by hand across hundreds of components is not practical, and a
 * blanket CSS rule would also justify headings, centred captions and short text in narrow
 * cards (where justified lines open wide gaps between words). So each block is checked:
 *
 *  - it is running text: a <p>, <li>, <dd>, <blockquote>, or a <div>/<span> that holds only
 *    text and inline tags (strong, a, br ...), at least two lines and 60 characters long;
 *  - it is not a heading or inside one, nor inside a header, nav, footer, button, table,
 *    form field, code block or anything marked .no-justify;
 *  - nobody chose an alignment for it: its alignment is the browser default ("start").
 *    Centred text, and text with text-left / text-right, keeps its alignment;
 *  - its column is wide enough: at least 22 times the font size (about 44 characters a line).
 *
 * Blocks that pass get data-auto-justify (styled in index.css). React leaves that attribute
 * alone, and the check runs again when the page content changes or the window is resized.
 */

const SKIP_INSIDE = [
  "h1", "h2", "h3", "h4", "h5", "h6",
  "header", "nav", "footer", "button", "table", "pre", "code",
  "label", "select", "textarea", "input", "[contenteditable]", "svg",
  '[role="navigation"]', ".no-justify",
].join(",");

const BLOCK_TAGS = "p,li,dd,blockquote,div,span";
const INLINE_TAGS = new Set(["STRONG", "B", "EM", "I", "A", "SPAN", "BR", "SMALL", "SUP", "SUB", "MARK", "U", "ABBR", "TIME", "Q", "CITE", "S", "DEL", "INS"]);
const MIN_EMS_PER_LINE = 22;
const MIN_CHARS = 60;
export const ATTR = "data-auto-justify";

// Holds running text: has its own words, and every child element is an inline tag.
const isTextBlock = (el) => {
  let hasText = false;
  for (const node of el.childNodes) {
    if (node.nodeType === Node.TEXT_NODE) {
      if (!hasText && node.textContent.trim()) hasText = true;
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      if (!INLINE_TAGS.has(node.tagName)) return false;
    }
  }
  return hasText;
};

export const justifyPass = (root) => {
  if (!root) return 0;
  // Clear first, so every block is judged on its own alignment, not on the one we gave it.
  root.querySelectorAll(`[${ATTR}]`).forEach((el) => el.removeAttribute(ATTR));

  const chosen = [];
  for (const el of root.querySelectorAll(BLOCK_TAGS)) {
    if (!isTextBlock(el)) continue;
    if ((el.textContent || "").trim().length < MIN_CHARS) continue;
    if (el.closest(SKIP_INSIDE)) continue;

    const style = getComputedStyle(el);
    if (style.textAlign !== "start") continue;
    if (style.display === "inline" || style.display === "none" || style.whiteSpace === "nowrap") continue;

    const rect = el.getBoundingClientRect();
    const fontSize = parseFloat(style.fontSize) || 16;
    if (rect.width / fontSize < MIN_EMS_PER_LINE) continue;
    const lineHeight = parseFloat(style.lineHeight) || fontSize * 1.5;
    if (rect.height < lineHeight * 1.8) continue;

    chosen.push(el);
  }
  chosen.forEach((el) => el.setAttribute(ATTR, ""));
  return chosen.length;
};

/** Keeps root's text justified as its content changes and the window resizes. Returns a stop function. */
export const watchJustify = (root) => {
  if (!root || typeof MutationObserver === "undefined") return () => {};
  let timer = null;
  const schedule = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const started = performance.now();
      const count = justifyPass(root);
      // For checking in development only
      if (import.meta.env.DEV) window.__autoJustify = { count, ms: Math.round(performance.now() - started) };
    }, 150);
  };

  // Content and class changes (route changes, data loading, tabs). Our own attribute and
  // inline styles (animations) are not watched, so this never loops.
  const observer = new MutationObserver(schedule);
  observer.observe(root, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["class", "hidden", "open"] });
  window.addEventListener("resize", schedule);
  if (document.fonts?.ready) document.fonts.ready.then(schedule);
  schedule();

  return () => {
    clearTimeout(timer);
    observer.disconnect();
    window.removeEventListener("resize", schedule);
  };
};
