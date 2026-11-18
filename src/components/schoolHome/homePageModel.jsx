import React from "react";
import { parseImageUrl } from "../../utils/imageUtils";

/*
 * A school's home page content as edited from the School and Admin dashboards and stored in
 * schools.content.homePage. Anything left empty there falls back to the school's built-in
 * page config (src/Data/schools/<CODE>/home.jsx), so the website never shows a blank block.
 */

export const MAX_BANNERS = 6;
export const MAX_ABOUT_CARDS = 4;

// Site paths such as /assets/ICT.png stay as they are; uploads and outside links are resolved.
const resolveImage = (url, width) => (url.startsWith("/") && !url.startsWith("/uploads/") ? url : parseImageUrl(url, width));

const text = (value) => (value === undefined || value === null ? "" : String(value).trim());
const textList = (value) => (Array.isArray(value) ? value.map(text).filter(Boolean) : []);

// Plain text of a JSX fragment from the page config (vision / mission paragraphs with <span>s).
export const nodeText = (node) => {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeText).join("");
  if (node.props) return nodeText(node.props.children);
  return "";
};
const flat = (node) => nodeText(node).replace(/\s+/g, " ").trim();

export const normalizeHomePage = (raw) => {
  if (!raw || typeof raw !== "object") return null;
  return {
    heroImages: textList(raw.heroImages),
    about: {
      heading: text(raw.about?.heading),
      cards: (Array.isArray(raw.about?.cards) ? raw.about.cards : [])
        .map((card) => ({ title: text(card?.title), text: text(card?.text), points: textList(card?.points), tags: textList(card?.tags) }))
        .filter((card) => card.title || card.text),
    },
    dean: {
      name: text(raw.dean?.name),
      designation: text(raw.dean?.designation),
      photo: text(raw.dean?.photo),
      shortMessage: text(raw.dean?.shortMessage),
      message: text(raw.dean?.message),
    },
    updatedAt: text(raw.updatedAt),
  };
};

/* ── Built-in page config ── */

export const loadStaticHomeConfig = async (code) => {
  try {
    const module = await import(`../../Data/schools/${code}/home.jsx`);
    return Array.isArray(module.sectionsConfig) ? module.sectionsConfig : [];
  } catch {
    return [];
  }
};

// What the website shows today from the built-in config, in the dashboard's shape.
export const homePageFromConfig = (sectionsConfig = []) => {
  const propsOf = (name) => sectionsConfig.find((section) => section.componentName === name)?.props || {};
  const landing = propsOf("Landing");
  const about = propsOf("AboutSection").data || {};
  const dean = propsOf("LeadershipCard");

  return normalizeHomePage({
    heroImages: (landing.slides || []).map((slide) => slide.image),
    about: {
      heading: flat(about.heading) || "About Us",
      cards: (about.cards || []).map((card) => ({
        title: flat(card.title).replace(/\|.*/, "").trim(),
        text: [flat(card.content), card.highlight && !Array.isArray(card.highlight) ? flat(card.highlight) : ""].filter(Boolean).join("\n\n"),
        points: (card.bullets || []).map(flat),
        tags: Array.isArray(card.highlight) ? card.highlight.map(flat) : [],
      })),
    },
    dean: {
      name: flat(dean.name),
      designation: flat(dean.title),
      photo: dean.image || "",
      shortMessage: typeof dean.shortMessage === "string" ? dean.shortMessage : flat(dean.shortMessage),
      message: typeof dean.description === "string" ? dean.description : flat(dean.description),
    },
  });
};

/* ── Public page ── */

const paragraphs = (value) =>
  value
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part, index) => (
      <p key={index} className={index ? "mt-2" : ""}>
        {part}
      </p>
    ));

// The page config's sections with the saved home page content put in, block by block.
export const applyHomePage = (sections, homePage, schoolName = "") => {
  if (!homePage) return sections;
  return sections.map((section) => {
    const props = section.props || {};
    switch (section.componentName) {
      case "Landing":
        if (!homePage.heroImages.length) return section;
        return { ...section, props: { ...props, slides: homePage.heroImages.map((image) => ({ image: resolveImage(image, 2000), title: schoolName })) } };
      case "AboutSection":
        if (!homePage.about.cards.length) return section;
        return {
          ...section,
          props: {
            ...props,
            data: {
              ...(props.data || {}),
              heading: homePage.about.heading || props.data?.heading,
              cards: homePage.about.cards.map((card) => ({
                title: card.title,
                content: paragraphs(card.text),
                bullets: card.points,
                highlight: card.tags.length ? card.tags : undefined,
              })),
            },
          },
        };
      case "LeadershipCard":
        return homePage.dean.name ? { ...section, props: { ...props, ...deanCardProps(homePage.dean) } } : section;
      default:
        return section;
    }
  });
};

// Props for the Dean's Message card. A new dean without a photo gets the placeholder, never the old photo.
export const deanCardProps = (dean) => ({
  name: dean.name,
  title: dean.designation,
  image: dean.photo ? resolveImage(dean.photo, 600) : "",
  shortMessage: dean.shortMessage,
  description: dean.message || dean.shortMessage,
});
