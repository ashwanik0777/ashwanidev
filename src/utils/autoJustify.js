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
 *  - it is not title-like: medium or bold text of three lines or fewer (a thesis title,
 *    a card title in a <p>) is left alone; long bold intro paragraphs still count;
 *  - nobody chose an alignment for this text itself: centred text keeps its centring, and a
 *    block with its own text-left / text-right class keeps that. Left alignment that only
 *    comes from a wrapper (e.g. "text-center lg:text-left" on a section) does not count;
 *  - its column is wide enough: at least 22 times the font size (about 44 characters a line);
 *  - once justified, it looks right: if any line opens a gap between words wider than
 *    1.1 times the font size (e.g. a few long words on a line in a narrow card), the block goes
 *    back to normal alignment. Short text (under 120 characters, such as titles that run to
 *    two lines) is left alone.
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
const MAX_GAP_EMS = 1.1;
// An alignment class on the text block itself (any breakpoint), e.g. "lg:text-left"
const OWN_ALIGNMENT = /(^|\s|:)text-(left|start|right|end|center)(\s|$)/;
const MIN_CHARS = 120;
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

// Widest gap between two words on any line but the last, while the block is justified.
const widestGap = (el) => {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const range = document.createRange();
  const lines = new Map();
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const text = node.textContent;
    const words = /\S+/g;
    for (let m = words.exec(text); m; m = words.exec(text)) {
      range.setStart(node, m.index);
      range.setEnd(node, m.index + m[0].length);
      const rects = range.getClientRects();
      if (!rects.length) continue;
      const key = Math.round(rects[0].top / 4); // same line, allowing for sup/sub offsets
      if (!lines.has(key)) lines.set(key, []);
      lines.get(key).push([rects[0].left, rects[rects.length - 1].right]);
    }
  }
  const keys = [...lines.keys()].sort((a, b) => a - b).slice(0, -1);
  let widest = 0;
  for (const key of keys) {
    const words = lines.get(key).sort((a, b) => a[0] - b[0]);
    for (let i = 1; i < words.length; i += 1) widest = Math.max(widest, words[i][0] - words[i - 1][1]);
  }
  return widest;
};

// Decisions are kept per block and reused while its size, text and font size stay the same.
// A web font finishing loading moves line breaks without changing the size, so that clears it.
let lookCache = new WeakMap();

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
    const inheritedLeft = style.textAlign === "left" && !OWN_ALIGNMENT.test(el.getAttribute("class") || "");
    if (style.textAlign !== "start" && !inheritedLeft) continue;
    if (style.display === "inline" || style.display === "none" || style.whiteSpace === "nowrap") continue;

    // Layout size, not on-screen size: cards that animate in (scale) would otherwise measure small
    const width = el.offsetWidth;
    const height = el.offsetHeight;
    const fontSize = parseFloat(style.fontSize) || 16;
    if (width / fontSize < MIN_EMS_PER_LINE) continue;
    const lineHeight = parseFloat(style.lineHeight) || fontSize * 1.5;
    if (height < lineHeight * 1.8) continue;
    if (parseInt(style.fontWeight, 10) >= 500 && height < lineHeight * 3.5) continue;

    // The height changes when a web font finishes loading, so a stale decision is not reused
    chosen.push({ el, key: `${width}x${height}|${el.textContent.length}|${fontSize}`, fontSize });
  }
  chosen.forEach(({ el }) => el.setAttribute(ATTR, ""));

  // Keep it only where justified text looks right
  let kept = 0;
  for (const { el, key, fontSize } of chosen) {
    let cached = lookCache.get(el);
    if (!cached || cached.key !== key) {
      // On-screen gaps shrink while a card is scaled by an animation; undo that scale.
      const scale = el.getBoundingClientRect().width / (el.offsetWidth || 1) || 1;
      cached = { key, ok: widestGap(el) / scale <= fontSize * MAX_GAP_EMS };
      lookCache.set(el, cached);
    }
    if (cached.ok) kept += 1;
    else el.removeAttribute(ATTR);
  }
  return kept;
};

/** Keeps root's text justified as its content changes and the window resizes. Returns a stop function. */
export const watchJustify = (root) => {
  if (!root || typeof MutationObserver === "undefined") return () => {};
  let timer = null;
  // A justified block can change size without any DOM change (images loading, a card
  // growing), which can open wide gaps; watching their size re-checks them.
  // Only a real change counts: the observer also reports every block once when watching starts.
  const lastSize = new WeakMap();
  const sizes = typeof ResizeObserver !== "undefined"
    ? new ResizeObserver((entries) => {
        let changed = false;
        for (const { target, contentRect } of entries) {
          const size = `${Math.round(contentRect.width)}x${Math.round(contentRect.height)}`;
          if (lastSize.has(target) && lastSize.get(target) !== size) changed = true;
          lastSize.set(target, size);
        }
        if (changed) schedule();
      })
    : null;
  const schedule = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const started = performance.now();
      const count = justifyPass(root);
      if (sizes) {
        sizes.disconnect();
        sizes.observe(root);
        root.querySelectorAll(`[${ATTR}]`).forEach((el) => sizes.observe(el));
      }
      // For checking in development only
      if (import.meta.env.DEV) window.__autoJustify = { count, ms: Math.round(performance.now() - started) };
    }, 150);
  };

  // Content and class changes (route changes, data loading, tabs). Our own attribute and
  // inline styles (animations) are not watched, so this never loops.
  const observer = new MutationObserver(schedule);
  observer.observe(root, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["class", "hidden", "open"] });
  window.addEventListener("resize", schedule);
  const fontsLoaded = () => {
    lookCache = new WeakMap();
    schedule();
  };
  document.fonts?.ready?.then(fontsLoaded);
  document.fonts?.addEventListener?.("loadingdone", fontsLoaded);
  schedule();

  return () => {
    clearTimeout(timer);
    observer.disconnect();
    sizes?.disconnect();
    window.removeEventListener("resize", schedule);
    document.fonts?.removeEventListener?.("loadingdone", fontsLoaded);
  };
};
