import { BookOpen, Layers, Users, Wifi } from "lucide-react";

/*
 * The Central Library's own text and headline numbers. The Library page
 * (campus-life/library) shows them in full; the About GBU page shows a short
 * section from the same data, so both always say the same thing.
 */

export const LIBRARY_INFO = {
  title: "Bodhisattva Dr. B.R. Ambedkar Library",
  description: "Standing as a majestic structural landmark on the GBU campus, the Bodhisattva Dr. B.R. Ambedkar Library is spread over approximately 1.078 Lakh sq. ft. spanning 5 magnificent storeys. As the center of academic excellence and research at Gautam Buddha University, it offers a peaceful reading environment, state-of-the-art digital access, and comprehensive stacks cataloged under standard classification systems."
};

export const LIBRARY_STATS = [
  { label: "2.5L+", value: "Library Book Collection", icon: BookOpen, color: "text-purple-600 bg-purple-50" },
  { label: "2,000+", value: "Simultaneous Reader Capacity", icon: Users, color: "text-blue-600 bg-blue-50" },
  { label: "1.07L", value: "Square Feet Total Covered Area", icon: Layers, color: "text-emerald-600 bg-emerald-50" },
  { label: "10,000+", value: "National & International E-Journals", icon: Wifi, color: "text-orange-600 bg-orange-50" }
];

export const LIBRARY_PAGE = "/campus-life/library";
