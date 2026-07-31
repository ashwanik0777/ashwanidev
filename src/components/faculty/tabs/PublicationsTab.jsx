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
  asArray,
  asText,
  matchKey,
  pickArray,
  pickNumber,
  pickText,
  displayOr,
} from "./fieldUtils";

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
  paperUrl: pickText(item, ["paperUrl", "url", "doi"]),
  pdfUrl: pickText(item, ["pdfUrl", "pdf"]),
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
  <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-white rounded-t-xl  ">
    {children}
  </div>
);
const CardTitle = ({ className = "", children }) => (
  <h2 className={`font-semibold text-lg text-gray-800 ${className}`}>
    {children}
  </h2>
);
const CardContent = ({ children }) => (
  <div className="px-6 py-4">{children}</div>
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

export default function PublicationsTab({ profile }) {
  const [activeTab, setActiveTab] = useState("publications");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const tabData = profile?.tabData?.publications || {};
  const publications = asArray(tabData.publications)?.map(normalizePublication);
  // Dashboard saves patents under publications.patents; legacy fallback to patents.patents
  const pubPatents = asArray(tabData.patents);
  const patents = (pubPatents.length
    ? pubPatents
    : asArray(profile?.tabData?.patents?.patents)
  )?.map(normalizePatent);

  const years = [...new Set(publications?.map((p) => p.year).filter(Boolean))].sort(
    (a, b) => b - a
  );
  const types = [...new Set(publications?.map((p) => p.type).filter(Boolean))];

  const filteredPublications = publications.filter((pub) => {
    const yearMatch = selectedYear === "all" || String(pub.year) === selectedYear;
    const typeMatch = selectedType === "all" || pub.type === selectedType;
    return yearMatch && typeMatch;
  });

  const totalCitations = publications.reduce((sum, pub) => sum + (pub?.citations || 0), 0);
  const journalCount = publications.filter((p) => p.type === "journal").length;

  const getStatusColor = (status) => matchKey(status, PATENT_STATUS_VARIANTS, "outline");

  const countPatentsByStatus = (status) =>
    patents.filter((patent) => asText(patent.status).toLowerCase() === status).length;

  // Sort a copy — `.sort()` on the source array mutates state during render.
  const patentsByYear = [...patents].sort((a, b) => b.filedYear - a.filedYear);

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
      <div className="w-full px-2 sm:px-4 lg:px-6 py-6">
        {/* Tab Navigation */}

        <div className="flex flex-wrap items-center gap-4 mb-8">
          <div
            onClick={() => setActiveTab("publications")}
            className={`flex items-center cursor-pointer text-xl sm:text-2xl font-bold pb-2 ${
              activeTab === "publications"
                ? "text-blue-600 border-b-4 border-blue-600"
                : "text-gray-900"
            }`}
          >
            <BookOpen
              className={`w-6 h-6 mr-2 ${
                activeTab === "publications" ? "text-blue-600" : "text-gray-400"
              }`}
            />
            Publications
          </div>

          <div
            onClick={() => setActiveTab("patents")}
            className={`flex items-center cursor-pointer text-xl sm:text-2xl font-bold pb-2 ${
              activeTab === "patents"
                ? "text-blue-600 border-b-4 border-blue-600"
                : "text-gray-900"
            }`}
          >
            <Award
              className={`w-6 h-6 mr-2 ${
                activeTab === "patents" ? "text-blue-600" : "text-gray-400"
              }`}
            />
            Patents
          </div>
        </div>

        {activeTab === "publications" && (
          <div className="space-y-8">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
                <CardContent>
                  <div className="text-center py-4">
                    <div className="text-3xl font-bold text-yellow-600">
                      {publications.length}
                    </div>
                    <div className="text-sm text-yellow-700 font-medium">
                      Total Publications
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardContent>
                  <div className="text-center py-4">
                    <div className="text-3xl font-bold text-purple-600">
                      {journalCount}
                    </div>
                    <div className="text-sm text-purple-700 font-medium">
                      Journal Papers
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardContent>
                  <div className="text-center py-4">
                    <div className="text-3xl font-bold text-green-600">
                      {totalCitations}
                    </div>
                    <div className="text-sm text-green-700 font-medium">
                      Total Citations
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardContent>
                  <div className="text-center py-4">
                    <div className="text-3xl font-bold text-blue-600">
                      {years.length ? years[0] : "--"}
                    </div>
                    <div className="text-sm text-blue-700 font-medium">
                      Latest Year
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Overview Text */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                  Publications Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {publications.length > 0
                    ? `${publications.length} publication${publications.length === 1 ? "" : "s"} across journals and conferences${totalCitations > 0 ? `, with ${totalCitations} recorded citation${totalCitations === 1 ? "" : "s"}` : ""}.`
                    : "No publications have been added to this profile yet."}
                </p>
              </CardContent>
            </Card>

            {/* Filters */}
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <CardTitle>Publication Timeline</CardTitle>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-gray-500" />
                      <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="all">All Years</option>
                        {years?.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                      <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="all">All Types</option>
                        {types.filter(Boolean)?.map((type) => (
                          <option key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
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
                              {publication.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">
                              {publication.authors}
                            </p>
                            <p className="text-blue-600 font-medium mb-3">
                              {publication.venue}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-4">
                              <Badge variant={getTypeColor(publication.type)}>
                                {(publication.type || 'publication').charAt(0).toUpperCase() +
                                  (publication.type || 'publication').slice(1)}
                              </Badge>

                              {publication.quartile && (
                                <Badge
                                  variant={getQuartileColor(
                                    publication.quartile
                                  )}
                                >
                                  {publication.quartile}
                                </Badge>
                              )}

                              {publication.ranking && (
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

                            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                              <span>
                                <strong>Citations:</strong>{" "}
                                {publication.citations}
                              </span>
                              {publication.impactFactor && (
                                <span>
                                  <strong>Impact Factor:</strong>{" "}
                                  {publication.impactFactor}
                                </span>
                              )}
                            </div>

                            <div className="flex gap-2">
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
                      {publications.length === 0
                        ? "No publications added yet."
                        : "No publications match the selected filters."}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "patents" && (
          <div className="space-y-8">
            {/* Patent Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
                <CardContent>
                  <div className="text-center py-4">
                    <div className="text-3xl font-bold text-yellow-600">
                      {patents.length}
                    </div>
                    <div className="text-sm text-yellow-700 font-medium">
                      Total Patents
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardContent>
                  <div className="text-center py-4">
                    <div className="text-3xl font-bold text-blue-600">
                      {countPatentsByStatus("filed")}
                    </div>
                    <div className="text-sm text-blue-700 font-medium">
                      Filed
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardContent>
                  <div className="text-center py-4">
                    <div className="text-3xl font-bold text-green-600">
                      {countPatentsByStatus("published")}
                    </div>
                    <div className="text-sm text-green-700 font-medium">
                      Published
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardContent>
                  <div className="text-center py-4">
                    <div className="text-3xl font-bold text-purple-600">
                      {patentsByYear.length && patentsByYear[0].filedYear > 0
                        ? patentsByYear[0].filedYear
                        : "--"}
                    </div>
                    <div className="text-sm text-purple-700 font-medium">
                      Latest Year
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

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
                  {patents.length > 0
                    ? `${patents.length} patent application${patents.length === 1 ? "" : "s"} translating research work into practical, real-world solutions.`
                    : "No patents have been added to this profile yet."}
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

                              <div className="grid sm:grid-cols-2 gap-4 text-sm mb-4">
                                <div className="space-y-2">
                                  <p className="text-gray-600">
                                    <span className="font-medium">
                                      Application No:
                                    </span>{" "}
                                    {displayOr(patent.applicationNo)}
                                  </p>
                                  <p className="text-gray-600">
                                    <span className="font-medium">
                                      Technical Field:
                                    </span>{" "}
                                    {displayOr(patent.technicalField)}
                                  </p>
                                  <p className="text-gray-600 flex items-center">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    <span className="font-medium">
                                      Filed:
                                    </span>{" "}
                                    {displayOr(patent.applicationDate)}
                                  </p>
                                </div>
                                <div className="space-y-2">
                                  <p className="text-gray-600 flex items-center">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    <span className="font-medium">
                                      Country:
                                    </span>{" "}
                                    {displayOr(patent.country)}
                                  </p>
                                  <p className="text-gray-600">
                                    <span className="font-medium">
                                      Patent Office:
                                    </span>{" "}
                                    {displayOr(patent.patentOffice)}
                                  </p>
                                  <p className="text-gray-600">
                                    <span className="font-medium">Year:</span>{" "}
                                    {patent.filedYear || "—"}
                                  </p>
                                </div>
                              </div>

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

                            <div className="flex-shrink-0">
                              <Badge variant={getStatusColor(patent.status)}>
                                {patent.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  {patentsByYear.length === 0 && (
                    <p className="py-6 text-center text-sm text-gray-500">
                      No patents added yet.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
