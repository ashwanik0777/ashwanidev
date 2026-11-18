/*
 * Non-component helpers shared by the club page and the club manager
 * (kept out of the component files so fast refresh keeps working).
 */
import {
  BookOpen,
  Clapperboard,
  Cpu,
  Dumbbell,
  GraduationCap,
  HandHeart,
  HeartPulse,
  Leaf,
  Palette,
  Rocket,
  Users,
} from "lucide-react";
import { checkUploadStatus } from "../../services/uploadService";
import { parseImageUrl } from "../../utils/imageUtils";
import { SOCIAL_PLATFORMS } from "./clubModel";

/* ── Club page ── */

export const CONTAINER = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";

export const CATEGORY_ICONS = {
  Technical: Cpu,
  Cultural: Palette,
  Literary: BookOpen,
  Sports: Dumbbell,
  Social: HandHeart,
  Media: Clapperboard,
  Environmental: Leaf,
  Wellness: HeartPulse,
  Entrepreneurship: Rocket,
  Academic: GraduationCap,
};
export const categoryIcon = (category) => CATEGORY_ICONS[category] || Users;

export const imageSrc = (url, width = 1600) => (url ? parseImageUrl(url, width) : "");

const withProtocol = (url) => (/^https?:\/\//i.test(url) ? url : `https://${url}`);

export const socialEntries = (club) =>
  SOCIAL_PLATFORMS.filter(({ key }) => club.socialMedia?.[key]).map((p) => ({ ...p, url: withProtocol(club.socialMedia[p.key]) }));

// Whether the club page has a join link, contact details or social links to show.
export const hasContact = (club) => !!(club.joinLink || club.contact.email || club.contact.phone || socialEntries(club).length);

/* ── Club manager ── */

export const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10";
export const primaryButton =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-50";
export const secondaryButton =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50";
export const iconButton =
  "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:pointer-events-none disabled:opacity-30";

export const move = (list, from, to) => {
  if (to < 0 || to >= list.length) return list;
  const next = [...list];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
};

// Runs the storage check once per page before the first upload.
let storageChecked = null;
export const ensureStorage = async () => {
  if (storageChecked === true) return;
  const status = await checkUploadStatus().catch(() => null);
  if (!status?.configured) throw new Error("File storage is not connected. Please contact the website admin.");
  storageChecked = true;
};

export const uploadError = (error) => error?.response?.data?.message || error?.message || "Upload failed. Please try again.";

