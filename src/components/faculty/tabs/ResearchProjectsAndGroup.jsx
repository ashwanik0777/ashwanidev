import React, { useState } from "react";
import {
  Filter,
  Calendar,
  DollarSign,
  FileText,
  Users,
  Mail,
  ExternalLink,
} from "lucide-react";
import { asText, matchKey } from "./fieldUtils";
import { facultySections, withValue } from "./facultyTabData";
import StatTiles from "./StatTiles";
import SubTabs from "./SubTabs";
import {
  GROUP_STATUS_COLORS,
  normalizeGroupMember,
  normalizeProject,
  sumPublications,
} from "./researchNormalizers";

// Minimal custom UI components for Card, Badge, and Button with Tailwind CSS

// Card Component
const Card = ({ className = "", children }) => (
  <div
    className={`bg-white rounded-xl border border-gray-200 border-solid shadow-sm ${className}`}
  >
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="px-6 pt-6 pb-2  ">
    {children}
  </div>
);

const CardTitle = ({ className = "", children }) => (
  <h2 className={`font-semibold text-lg ${className}`}>{children}</h2>
);

const CardContent = ({ children }) => (
  <div className="px-6 pb-6 pt-4">{children}</div>
);

// Badge Component
const Badge = ({ className = "", variant = "default", children }) => {
  const base =
    "inline-flex items-center px-2 py-0.5 rounded-full font-medium transition-colors duration-150";
  const variants = {
    default: "bg-blue-100 text-blue-800",
    outline: "bg-white border border-blue-300 text-blue-700",
  };
  return (
    <span className={`${base} ${variants[variant] || ""} ${className}`}>
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
    "inline-flex items-center justify-center rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm",
    outline: "bg-white border border-blue-600 text-blue-700 hover:bg-blue-50",
  };
  const sizes = {
    sm: "px-3 py-1 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-2.5 text-base",
  };
  return (
    <button
      className={`${base} ${variants[variant] || ""} ${
        sizes[size] || ""
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const titleCase = (value) => {
  const text = asText(value);
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : "";
};

// Label / value rows with the empty ones left out.
const DetailRows = ({ rows, className = "" }) => {
  const shown = rows.filter((row) => asText(row.value));
  if (!shown.length) return null;
  return (
    <div className={className}>
      {shown.map((row) => {
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
  );
};

// Research Projects Tab Component
const ResearchProjectsTab = ({ profile }) => {
  const [filterStatus, setFilterStatus] = useState("all");
  const projects = facultySections(profile).projects.map(normalizeProject);
  const statuses = [...new Set(projects.map((project) => project.status).filter(Boolean))];

  const filteredProjects =
    filterStatus === "all"
      ? projects
      : projects.filter((project) => project.status === filterStatus);

  const getStatusColor = (status) => {
    return asText(status).toLowerCase() === "ongoing"
      ? "bg-green-100 text-green-800"
      : "bg-blue-100 text-blue-800";
  };

  const ongoingCount = projects.filter((project) => project.status === "ongoing").length;
  const collaboratorCount = new Set(
    projects.flatMap((project) => project.collaborators).map((name) => asText(name)).filter(Boolean),
  ).size;

  const stats = withValue([
    { label: "Total Projects", value: projects.length, tone: "blue" },
    { label: "Ongoing Projects", value: ongoingCount, tone: "green" },
    { label: "Completed Projects", value: projects.length - ongoingCount, tone: "purple" },
    { label: "Collaborators", value: collaboratorCount, tone: "orange" },
  ]);

  if (!projects.length) return null;

  return (
    <div className="space-y-8">
      {/* Project Statistics */}
      {stats.length > 0 && (
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">
              Project Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <StatTiles stats={stats} />
          </CardContent>
        </Card>
      )}

      {/* Projects, with a status filter when there is more than one status */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="text-2xl text-gray-900">
              Research Projects
            </CardTitle>
            {statuses.length > 1 && (
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <div className="flex flex-wrap gap-2">
                  {["all", ...statuses].map((status) => (
                    <Button
                      key={status}
                      variant={filterStatus === status ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterStatus(status)}
                      className="text-xs"
                    >
                      {status === "all" ? "All Projects" : titleCase(status)}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {filteredProjects.map((project, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-6 border border-gray-200 border-solid hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {project.title}
                    </h3>
                    {project.description && (
                      <p className="text-gray-700 mb-3">{project.description}</p>
                    )}

                    <div className="grid sm:grid-cols-2 gap-x-4 gap-y-1 text-sm">
                      <DetailRows
                        rows={[
                          { label: "Funding Agency", value: project.fundingAgency },
                          { label: "Role", value: project.role },
                        ]}
                      />
                      <DetailRows
                        rows={[
                          { label: "Duration", value: project.duration, icon: Calendar },
                          { label: "Budget", value: project.budget, icon: DollarSign },
                        ]}
                      />
                    </div>
                  </div>
                  {project.status && (
                    <div className="flex flex-col items-start lg:items-end gap-2">
                      <Badge className={getStatusColor(project.status)}>
                        {titleCase(project.status)}
                      </Badge>
                    </div>
                  )}
                </div>

                {(project.collaborators.length > 0 || project.deliverables.length > 0) && (
                  <div className="grid lg:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200 border-solid">
                    {project.collaborators.length > 0 && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                          Collaborators:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.collaborators.map((collaborator, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {collaborator}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {project.deliverables.length > 0 && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                          Key Deliverables:
                        </h4>
                        <ul className="space-y-1">
                          {project.deliverables.slice(0, 2).map((deliverable, idx) => (
                            <li
                              key={idx}
                              className="text-xs text-gray-600 flex items-start"
                            >
                              <span className="w-1 h-1 bg-blue-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                              {deliverable}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Contact / profile buttons only render for members that actually have links.
const GroupMemberLinks = ({ member, className = "" }) => {
  if (!member.email && !member.profileUrl) return null;
  return (
    <div className={`flex gap-2 ${className}`}>
      {member.email && (
        <a href={`mailto:${member.email}`}>
          <Button variant="outline" size="sm">
            <Mail className="w-4 h-4 mr-1" />
            Contact
          </Button>
        </a>
      )}
      {member.profileUrl && (
        <a href={member.profileUrl} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="sm">
            <ExternalLink className="w-4 h-4 mr-1" />
            Profile
          </Button>
        </a>
      )}
    </div>
  );
};

// Year and publication count line under a member, when either is filled.
const MemberMeta = ({ when, publications }) => {
  if (!when && !(publications > 0)) return null;
  return (
    <div className="flex items-center gap-4">
      {when && (
        <span className="flex items-center">
          <Calendar className="w-4 h-4 mr-1" />
          {when}
        </span>
      )}
      {publications > 0 && (
        <span className="flex items-center">
          <FileText className="w-4 h-4 mr-1" />
          {publications} Publications
        </span>
      )}
    </div>
  );
};

// The editor saves one "topic"; show it once, not as both research area and thesis.
const withoutRepeat = (value, ...others) => (others.includes(value) ? "" : value);

// Research Group Tab Component
const ResearchGroupTab = ({ profile }) => {
  const sections = facultySections(profile);
  const phdScholars = sections.phdScholars.map(normalizeGroupMember);
  const postdocs = sections.postdocs.map(normalizeGroupMember);
  const researchAssistants = sections.researchAssistants.map(normalizeGroupMember);

  const getStatusColor = (status) =>
    matchKey(status, GROUP_STATUS_COLORS, "bg-gray-100 text-gray-800");

  const stats = withValue([
    { label: "PhD Scholars", value: phdScholars.length, tone: "blue" },
    { label: "Postdocs", value: postdocs.length, tone: "green" },
    { label: "Research Assistants", value: researchAssistants.length, tone: "purple" },
    { label: "Total Publications", value: sumPublications(phdScholars, postdocs), tone: "orange" },
  ]);

  return (
    <div className="space-y-8">
      {/* Research Group Overview */}
      {stats.length > 0 && (
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900 flex items-center">
              <Users className="w-6 h-6 mr-2 text-blue-600" />
              Research Group Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <StatTiles stats={stats} />
          </CardContent>
        </Card>
      )}

      {/* PhD Scholars */}
      {phdScholars.length > 0 && (
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">PhD Scholars</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {phdScholars.map((scholar, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-6 border border-gray-200 border-solid hover:shadow-md transition-shadow flex flex-col gap-3"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {scholar.name}
                      </h3>
                      {scholar.program && (
                        <p className="text-blue-600 text-sm">{scholar.program}</p>
                      )}
                    </div>
                    {scholar.status && (
                      <Badge className={getStatusColor(scholar.status)}>
                        {scholar.status}
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-2 text-sm text-gray-600 empty:hidden">
                    <DetailRows
                      className="space-y-2"
                      rows={[
                        { label: "Research Area", value: scholar.researchArea },
                        { label: "Thesis", value: withoutRepeat(scholar.thesis, scholar.researchArea) },
                      ]}
                    />
                    <MemberMeta when={scholar.year} publications={scholar.publications} />
                  </div>

                  <GroupMemberLinks member={scholar} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Postdoctoral Fellows */}
      {postdocs.length > 0 && (
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">
              Postdoctoral Fellows
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {postdocs.map((postdoc, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100 flex flex-col gap-3"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {postdoc.name}
                    </h3>
                    {postdoc.program && (
                      <p className="text-blue-600 text-sm mt-1">{postdoc.program}</p>
                    )}
                  </div>

                  <div className="space-y-2 text-sm text-gray-600 empty:hidden">
                    <DetailRows
                      className="space-y-2"
                      rows={[
                        { label: "Research Area", value: postdoc.researchArea },
                        { label: "Previous Institute", value: postdoc.previousInstitute },
                      ]}
                    />
                    <MemberMeta when={postdoc.duration} publications={postdoc.publications} />
                  </div>

                  <GroupMemberLinks member={postdoc} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Research Assistants */}
      {researchAssistants.length > 0 && (
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">
              Research Assistants
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {researchAssistants.map((assistant, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-100 border-solid flex flex-col gap-2"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {assistant.name}
                    </h3>
                    {assistant.program && (
                      <p className="text-green-600 text-sm mt-1">{assistant.program}</p>
                    )}
                  </div>

                  <div className="space-y-1 text-sm text-gray-600 empty:hidden">
                    <DetailRows rows={[{ label: "Project / Role", value: assistant.project }]} />
                    <MemberMeta when={assistant.year} />
                  </div>

                  <GroupMemberLinks member={assistant} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// Main Combined Component: only the sub-tabs that have data are offered.
const ResearchProjectsAndGroup = ({ profile }) => {
  const [activeTab, setActiveTab] = useState("projects");
  const sections = facultySections(profile);
  const subTabs = [
    sections.projects.length > 0 && { id: "projects", label: "Research Projects", icon: FileText },
    (sections.phdScholars.length > 0 || sections.postdocs.length > 0 || sections.researchAssistants.length > 0) && {
      id: "group",
      label: "Research Group",
      icon: Users,
    },
  ].filter(Boolean);
  const current = subTabs.some((tab) => tab.id === activeTab) ? activeTab : subTabs[0]?.id;

  if (!current) return null;

  return (
    <div className="w-full">
      <div className="w-full px-2 sm:px-4 lg:px-6 py-6">
        <SubTabs tabs={subTabs} active={current} onChange={setActiveTab} />

        <div className="transition-opacity duration-300">
          {current === "projects" ? (
            <ResearchProjectsTab profile={profile} />
          ) : (
            <ResearchGroupTab profile={profile} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ResearchProjectsAndGroup;
