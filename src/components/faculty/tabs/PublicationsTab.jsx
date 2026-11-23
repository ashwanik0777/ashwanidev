import React, { useState } from "react";
import {
  Filter,
  Calendar,
  ExternalLink,
  Download,
  FileText,
  Award,
  MapPin,
  Trophy,
  BookOpen,
  Users,
  Target,
} from "lucide-react";
import {
  asText,
  matchKey,
  pickArray,
  pickNumber,
  pickText,
} from "./fieldUtils";
import { facultySections, withValue } from "./facultyTabData";
import SubTabs from "./SubTabs";

const PATENT_STATUS_VARIANTS = {
  filed: "blue",
  "under examination": "yellow",
  published: "green",
  granted: "purple",
};

// Bridges the dashboard's editor field names to what this tab renders.
const normalizePublication = (item) => ({
  title: pickText(item, ["title", "name"]),
  authors: pickText(item, ["authors"]),
  venue: pickText(item, ["venue", "journal", "conference"]),
  type: asText(pickText(item, ["type"], "journal")).toLowerCase(),
  quartile: pickText(item, ["quartile"]),
  ranking: pickText(item, ["ranking"]),
  year: pickNumber(item, ["year"], 0),
  citations: pickNumber(item, ["citations"], 0),
  impactFactor: pickText(item, ["impactFactor", "impact_factor"]),
  paperUrl: pickText(item, ["paperUrl", "url"]),
  pdfUrl: pickText(item, ["pdfUrl", "pdf"]),
  publisher: pickText(item, ["publisher"]),
  keyword: pickText(item, ["keyword"]),
  doi: pickText(item, ["doi"]),
  issn: pickText(item, ["issn"]),
  journalName: pickText(item, ["journalName"]),
  volume: pickText(item, ["volume"]),
  volumePage: pickText(item, ["volumePage"]),
  conferenceName: pickText(item, ["conferenceName"]),
  location: pickText(item, ["location"]),
  pageNo: pickText(item, ["pageNo"]),
  chapterTitle: pickText(item, ["chapterTitle"]),
  bookTitle: pickText(item, ["bookTitle"]),
  editorName: pickText(item, ["editorName"]),
  pageCount: pickText(item, ["pageCount"]),
  scopus: item.scopus,
  wos: item.wos,
  sci: item.sci,
  ssci: item.ssci,
  ahci: item.ahci,
  esci: item.esci || item.csci,
});

const normalizePatent = (item) => ({
  title: pickText(item, ["title", "name"]),
  description: pickText(item, ["description", "abstract"]),
  applicationNo: pickText(item, ["applicationNo", "applicationNumber"]),
  technicalField: pickText(item, ["technicalField", "field"]),
  applicationDate: pickText(item, ["applicationDate", "filingDate"]),
  country: pickText(item, ["country"], "India"),
  patentOffice: pickText(item, ["patentOffice", "office"]),
  filedYear: pickNumber(item, ["filedYear", "year"], 0),
  status: pickText(item, ["status"], "Filed"),
  inventors: pickArray(item, ["inventors", "authors"]),
});

// Card Components
const Card = ({ className = "", children }) => (
  <div
    className={`rounded-xl bg-white border border-gray-200 shadow-sm ${className}`}
  >
    {children}
  </div>
);
const CardHeader = ({ children }) => (
  <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-gray-50 to-white rounded-t-xl">
    {children}
  </div>
);
const CardTitle = ({ className = "", children }) => (
  <h2 className={`font-semibold text-base sm:text-lg text-gray-800 ${className}`}>
    {children}
  </h2>
);
const CardContent = ({ children }) => (
  <div className="px-4 sm:px-6 py-3 sm:py-4">{children}</div>
);

// Badge Component
const Badge = ({ className = "", variant = "", children }) => {
  const base =
    "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium";
  const variants = {
    outline: "border border-gray-300 bg-white text-gray-700",
    solid: "bg-gray-100 text-gray-800",
    yellow: "bg-yellow-100 text-yellow-800 border border-yellow-200",
    blue: "bg-blue-100 text-blue-800 border border-blue-200",
    green: "bg-green-100 text-green-800 border border-green-200",
    purple: "bg-purple-100 text-purple-800 border border-purple-200",
    red: "bg-red-100 text-red-800 border border-red-200",
    orange: "bg-orange-100 text-orange-800 border border-orange-200",
  };
  return (
    <span
      className={`${base} ${
        variants[variant] || variants.outline
      } ${className}`}
    >
      {children}
    </span>
  );
};

// Button Component
const Button = ({
  className = "",
  variant = "default",
  size = "md",
  children,
  ...props
}) => {
  const base =
    "inline-flex items-center font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    outline:
      "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-blue-400 focus:ring-blue-500",
    yellow:
      "bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500",
    ghost: "text-gray-600 hover:text-gray-800 hover:bg-gray-100",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Static class names only, so Tailwind can see them.
const STAT_TONES = {
  blue: ["from-blue-50 to-blue-100 border-blue-200", "text-blue-600", "text-blue-700"],
  green: ["from-green-50 to-green-100 border-green-200", "text-green-600", "text-green-700"],
  orange: ["from-orange-50 to-orange-100 border-orange-200", "text-orange-600", "text-orange-700"],
  purple: ["from-purple-50 to-purple-100 border-purple-200", "text-purple-600", "text-purple-700"],
  yellow: ["from-yellow-50 to-yellow-100 border-yellow-200", "text-yellow-600", "text-yellow-700"],
};

// Count cards; the ones with nothing to count are already left out by the caller.
const StatCards = ({ stats }) => {
  if (!stats.length) return null;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
      {stats.map((stat) => {
        const [box, value, label] = STAT_TONES[stat.tone] || STAT_TONES.blue;
        return (
          <Card key={stat.label} className={`bg-gradient-to-br ${box}`}>
            <CardContent>
              <div className="text-center py-2 sm:py-4">
                <div className={`text-xl sm:text-3xl font-bold ${value}`}>{stat.value}</div>
                <div className={`text-xs sm:text-sm font-medium ${label} mt-0.5 sm:mt-1`}>{stat.label}</div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

// Patent fields in two columns, with the empty ones left out.
const PatentDetails = ({ patent }) => {
  const columns = [
    [
      { label: "Application No", value: patent.applicationNo },
      { label: "Technical Field", value: patent.technicalField },
      { label: "Filed", value: patent.applicationDate, icon: Calendar },
    ],
    [
      { label: "Country", value: patent.country, icon: MapPin },
      { label: "Patent Office", value: patent.patentOffice },
      { label: "Year", value: patent.filedYear > 0 ? String(patent.filedYear) : "" },
    ],
  ]
    .map((rows) => rows.filter((row) => asText(row.value)))
    .filter((rows) => rows.length);
  if (!columns.length) return null;
  return (
    <div className="grid sm:grid-cols-2 gap-4 text-sm mb-4">
      {columns.map((rows, index) => (
        <div key={index} className="space-y-2">
          {rows.map((row) => {
            const Icon = row.icon;
            return (
              <p key={row.label} className="text-gray-600 flex items-center">
                {Icon && <Icon className="w-4 h-4 mr-1 shrink-0" />}
                <span className="font-medium mr-1">{row.label}:</span>
                {row.value}
              </p>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default function PublicationsTab({ profile }) {
  const [activeTab, setActiveTab] = useState("publications");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const sections = facultySections(profile);
  const publications = sections.publications.map(normalizePublication);
  const patents = sections.patents.map(normalizePatent);

  // Only the sub-tabs that have data are offered.
  const subTabs = [
    publications.length > 0 && { id: "publications", label: "Publications", icon: BookOpen },
    patents.length > 0 && { id: "patents", label: "Patents", icon: Award },
  ].filter(Boolean);
  const current = subTabs.some((tab) => tab.id === activeTab) ? activeTab : subTabs[0]?.id;

  const years = [...new Set(publications?.map((p) => p.year).filter(Boolean))].sort(
    (a, b) => b - a
  );
  const types = [...new Set(publications?.map((p) => p.type).filter(Boolean))];

  const filteredPublications = publications.filter((pub) => {
    const yearMatch = selectedYear === "all" || String(pub.year) === selectedYear;
    const typeMatch = selectedType === "all" || pub.type === selectedType;
    return yearMatch && typeMatch;
  });

  const journalCount = publications.filter((p) => p.type === "journal").length;
  const conferenceCount = publications.filter((p) => p.type === "conference").length;
  const bookCount = publications.filter((p) => p.type === "book").length;
  const bookChapterCount = publications.filter((p) => p.type === "book chapter").length;

  const publicationStats = withValue([
    { label: "Journal", value: journalCount, tone: "blue" },
    { label: "Conference", value: conferenceCount, tone: "green" },
    { label: "Book", value: bookCount, tone: "orange" },
    { label: "Book Chapter", value: bookChapterCount, tone: "purple" },
  ]);

  const getStatusColor = (status) => matchKey(status, PATENT_STATUS_VARIANTS, "outline");

  const countPatentsByStatus = (status) =>
    patents.filter((patent) => asText(patent.status).toLowerCase() === status).length;

  // Sort a copy — `.sort()` on the source array mutates state during render.
  const patentsByYear = [...patents].sort((a, b) => b.filedYear - a.filedYear);

  const patentStats = withValue([
    { label: "Total Patents", value: patents.length, tone: "yellow" },
    { label: "Filed", value: countPatentsByStatus("filed"), tone: "blue" },
    { label: "Published", value: countPatentsByStatus("published"), tone: "green" },
    { label: "Latest Year", value: patentsByYear[0]?.filedYear || 0, tone: "purple" },
  ]);

  if (!current) return null;

  const getTypeColor = (type) => {
    return type === "journal" ? "blue" : "green";
  };

  const getQuartileColor = (quartile) => {
    switch (quartile) {
      case "Q1":
        return "purple";
      case "Q2":
        return "blue";
      default:
        return "outline";
    }
  };

  const getRankingColor = (ranking) => {
    switch (ranking) {
      case "A*":
        return "red";
      case "A":
        return "orange";
      default:
        return "outline";
    }
  };

  return (
    <div className="w-full">
      <div className="w-full px-0 sm:px-2 py-4">
        <SubTabs tabs={subTabs} active={current} onChange={setActiveTab} />

        {current === "publications" && (
          <div className="space-y-6 sm:space-y-8">
            {/* Statistics Cards */}
            <StatCards stats={publicationStats} />

            {/* Overview Text */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-yellow-500 shrink-0" />
                  Publications Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  {`${publications.length} publication${publications.length === 1 ? "" : "s"} across journals, conferences, and books.`}
                </p>
              </CardContent>
            </Card>

            {/* Filters */}
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                  <CardTitle>Publication Timeline</CardTitle>
                  {(years.length > 1 || types.length > 1) && (
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                    <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                      <Filter className="w-4 h-4 text-gray-500 shrink-0" />
                      {years.length > 1 && (
                      <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="border border-gray-300 rounded-lg px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
                      >
                        <option value="all">All Years</option>
                        {years?.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                      )}
                      {types.length > 1 && (
                      <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="border border-gray-300 rounded-lg px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
                      >
                        <option value="all">All Types</option>
                        {types.filter(Boolean)?.map((type) => (
                          <option key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </option>
                        ))}
                      </select>
                      )}
                    </div>
                  </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredPublications?.map((publication, index) => (
                    <div
                      key={index}
                      className="relative pl-8 pb-6 border-l-2 border-yellow-200 last:border-l-0 last:pb-0"
                    >
                      <div className="absolute left-0 top-0 w-4 h-4 bg-yellow-500 rounded-full transform -translate-x-2"></div>
                      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-6 border border-yellow-200">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              {publication.title || publication.chapterTitle || publication.bookTitle}
                            </h3>
                            {(publication.authors || publication.editorName) && (
                              <p className="text-sm text-gray-600 mb-2">
                                {publication.authors} {publication.editorName && `(Ed: ${publication.editorName})`}
                              </p>
                            )}
                            
                            {publication.type === "journal" && (publication.journalName || publication.venue || publication.volume || publication.pageNo || publication.volumePage) && (
                              <p className="text-blue-600 font-medium mb-3">
                                {publication.journalName || publication.venue}
                                {publication.volume ? ` | ${publication.volume}` : ""}
                                {publication.pageNo ? `, page no ${publication.pageNo}` : ""}
                                {publication.volumePage && !publication.volume && !publication.pageNo ? ` | ${publication.volumePage}` : ""}
                              </p>
                            )}
                            {publication.type === "conference" && (publication.conferenceName || publication.venue || publication.location || publication.pageNo) && (
                              <p className="text-blue-600 font-medium mb-3">
                                {publication.conferenceName || publication.venue} {publication.location && `| ${publication.location}`} {publication.pageNo && `| ${publication.pageNo}`}
                              </p>
                            )}
                            {publication.type === "book chapter" && (publication.bookTitle || publication.pageNo) && (
                              <p className="text-blue-600 font-medium mb-3">
                                {publication.bookTitle} {publication.pageNo && `| ${publication.pageNo}`}
                              </p>
                            )}
                            {publication.type === "book" && (publication.publisher || publication.pageCount) && (
                              <p className="text-blue-600 font-medium mb-3">
                                {publication.publisher} {publication.pageCount && `| ${publication.pageCount} pages`}
                              </p>
                            )}

                            <div className="flex flex-wrap gap-2 mb-4">
                              <Badge variant={getTypeColor(publication.type)}>
                                {(publication.type || 'publication').charAt(0).toUpperCase() +
                                  (publication.type || 'publication').slice(1)}
                              </Badge>

                              {publication.type === "journal" && publication.quartile && publication.quartile !== "None" && (
                                <Badge
                                  variant={getQuartileColor(
                                    publication.quartile
                                  )}
                                >
                                  {publication.quartile}
                                </Badge>
                              )}

                              {publication.type === "conference" && publication.ranking && publication.ranking !== "None" && (
                                <Badge
                                  variant={getRankingColor(publication.ranking)}
                                >
                                  {publication.ranking}
                                </Badge>
                              )}

                              {publication.year > 0 && (
                                <Badge variant="outline">
                                  {publication.year}
                                </Badge>
                              )}
                            </div>

                            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4 empty:hidden">
                              {publication.publisher && (
                                <span>
                                  <strong>Publisher:</strong> {publication.publisher}
                                </span>
                              )}
                              {publication.keyword && (
                                <span>
                                  <strong>Keywords:</strong> {publication.keyword}
                                </span>
                              )}
                              {publication.doi && (
                                <span>
                                  <strong>DOI:</strong> {publication.doi}
                                </span>
                              )}
                              {publication.issn && (
                                <span>
                                  <strong>ISSN/ISBN:</strong> {publication.issn}
                                </span>
                              )}
                              {publication.citations > 0 && (
                                <span>
                                  <strong>Citations:</strong>{" "}
                                  {publication.citations}
                                </span>
                              )}
                              {publication.impactFactor && (
                                <span>
                                  <strong>Impact Factor:</strong>{" "}
                                  {publication.impactFactor}
                                </span>
                              )}
                              {publication.type === "journal" && (publication.scopus || publication.wos) && (
                                <span>
                                  <strong>Indexed:</strong>{" "}
                                  {[
                                    publication.scopus ? "Scopus" : null,
                                    publication.wos
                                      ? `Web of Science ${[(publication.sci && "SCI/SCIE"), (publication.ssci && "SSCI"), (publication.ahci && "AHCI"), (publication.esci && "ESCI")].filter(Boolean).length > 0 ? `(${[(publication.sci && "SCI/SCIE"), (publication.ssci && "SSCI"), (publication.ahci && "AHCI"), (publication.esci && "ESCI")].filter(Boolean).join(", ")})` : ""}`.trim()
                                      : null
                                  ].filter(Boolean).join(", ")}
                                </span>
                              )}
                            </div>

                            <div className="flex gap-2 empty:hidden">
                              {publication.paperUrl && (
                                <a
                                  href={publication.paperUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Button variant="outline" size="sm">
                                    <ExternalLink className="w-4 h-4 mr-1" />
                                    View Paper
                                  </Button>
                                </a>
                              )}
                              {publication.pdfUrl && (
                                <a
                                  href={publication.pdfUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Button variant="outline" size="sm">
                                    <Download className="w-4 h-4 mr-1" />
                                    Download PDF
                                  </Button>
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {filteredPublications.length === 0 && (
                    <p className="py-6 text-center text-sm text-gray-500">
                      No publications match the selected filters.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {current === "patents" && (
          <div className="space-y-8">
            {/* Patent Statistics */}
            <StatCards stats={patentStats} />

            {/* Patent Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2 text-yellow-500" />
                  Patent Portfolio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {`${patents.length} patent application${patents.length === 1 ? "" : "s"} translating research work into practical, real-world solutions.`}
                </p>
              </CardContent>
            </Card>

            {/* Patent Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Patent Filing Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patentsByYear
                    ?.map((patent, index) => (
                      <div
                        key={index}
                        className="relative pl-8 pb-6 border-l-2 border-yellow-200 last:border-l-0 last:pb-0"
                      >
                        <div className="absolute left-0 top-0 w-4 h-4 bg-yellow-500 rounded-full transform -translate-x-2"></div>
                        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-6 border border-yellow-200">
                          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {patent.title}
                              </h3>
                              {patent.description && (
                                <p className="text-gray-700 mb-4 leading-relaxed">
                                  {patent.description}
                                </p>
                              )}

                              <PatentDetails patent={patent} />

                              {patent.inventors.length > 0 && (
                                <div className="mb-4">
                                  <h4 className="font-medium text-gray-900 mb-2">
                                    Inventors:
                                  </h4>
                                  <div className="flex flex-wrap gap-2">
                                    {patent.inventors?.map((inventor, idx) => (
                                      <Badge key={idx} variant="outline">
                                        {inventor}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>

                            {patent.status && (
                              <div className="flex-shrink-0">
                                <Badge variant={getStatusColor(patent.status)}>
                                  {patent.status}
                                </Badge>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
