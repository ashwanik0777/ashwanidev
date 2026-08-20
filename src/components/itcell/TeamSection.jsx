import React, { useMemo, useState, useEffect } from "react";
import { Mail, Linkedin, Search, Users, GraduationCap, Star, Globe, User, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { listItcellMembers } from "../../services/itcellService";
import { resolveFacultyImage } from "../../utils/imageUtils";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const TeamCard = ({ member, isStudent = false }) => {
  const displayImage = resolveFacultyImage(member.image, member.image, member.name, member.email);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md flex flex-col justify-between"
    >
      <div>
        <div className="relative mb-4 flex items-center gap-4">
          {displayImage ? (
            <img
              src={displayImage}
              alt={member.name}
              className="h-16 w-16 rounded-2xl object-cover object-top ring-2 ring-slate-100 flex-shrink-0"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name || "Member")}&background=0D8ABC&color=fff&size=150`;
              }}
            />
          ) : (
            <div className="h-16 w-16 rounded-2xl bg-slate-100 flex items-center justify-center ring-2 ring-slate-100 text-slate-400 flex-shrink-0">
              <User className="h-8 w-8" />
            </div>
          )}
          <div className="min-w-0">
            <p className="truncate text-base font-bold text-slate-900">{member.name}</p>
            <p className="truncate text-sm font-medium text-blue-700">{member.role}</p>
          </div>
        </div>

        <div className="mb-4 space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{member.department}</p>
          <p className="text-sm text-slate-600">{member.designation}</p>
          <span
            className={cn(
              "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
              isStudent ? "bg-emerald-100 text-emerald-700" : "bg-indigo-100 text-indigo-700",
            )}
          >
            {isStudent ? "Student Team" : "Faculty Team"}
          </span>
        </div>

        {isStudent && member.bio ? (
          <p className="text-xs text-slate-600 mb-4 leading-relaxed">
            {member.bio}
          </p>
        ) : null}

        {isStudent && member.skills && member.skills.length > 0 ? (
          <div className="flex flex-wrap gap-1 mb-5">
            {member.skills.map((skill) => (
              <span key={skill} className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600">
                {skill}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-2 mt-auto">
        {member.email ? (
          <a
            href={`mailto:${member.email}`}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100"
          >
            <Mail className="h-3.5 w-3.5" /> Email
          </a>
        ) : null}
        {member.linkedin ? (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100"
          >
            <Linkedin className="h-3.5 w-3.5" /> LinkedIn
          </a>
        ) : null}
        {member.portfolio ? (
          <a
            href={member.portfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100"
          >
            <Globe className="h-3.5 w-3.5" /> Portfolio
          </a>
        ) : null}
      </div>
    </motion.article>
  );
};

const TeamSection = () => {
  const [activeTab, setActiveTab] = useState("faculty");
  const [query, setQuery] = useState("");
  const [teamData, setTeamData] = useState({ faculty: [], student: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const data = await listItcellMembers();
        setTeamData({
          faculty: (data.faculty || []).filter((m) => m.isActive),
          student: (data.student || []).filter((m) => m.isActive),
        });
      } catch (error) {
        console.error("Failed to fetch IT Cell team members:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  const currentMembers = activeTab === "faculty" ? teamData.faculty : teamData.student;

  const filteredMembers = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return currentMembers;

    return currentMembers.filter((member) =>
      [member.name, member.role, member.department, member.designation]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(normalized),
    );
  }, [currentMembers, query]);

  const leadership = teamData.faculty.length > 0 ? teamData.faculty[0] : null;

  if (loading) {
    return (
      <div className="flex h-48 items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col items-center gap-2 text-slate-500">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-sm font-medium">Loading IT Cell team members...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      {leadership && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Leadership Spotlight</p>
              <h3 className="mt-1 text-2xl font-bold text-slate-900">{leadership.name}</h3>
              <p className="text-sm font-medium text-blue-700">{leadership.role}</p>
              <p className="mt-2 text-sm text-slate-600">
                Strategic guidance for high-impact digital transformation initiatives across the university.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Core Team Snapshot</p>
              <div className="mt-2 flex gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                  <Users className="h-3.5 w-3.5" /> {teamData.faculty.length} Faculty
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                  <GraduationCap className="h-3.5 w-3.5" /> {teamData.student.length} Students
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setActiveTab("faculty");
                setQuery("");
              }}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition",
                activeTab === "faculty"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200",
              )}
            >
              Faculty Team
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("students");
                setQuery("");
              }}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition",
                activeTab === "students"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200",
              )}
            >
              Student Team
            </button>
          </div>

          <div className="relative min-w-[240px] flex-1 md:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search name, role, department..."
              className="w-full rounded-xl border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 outline-none transition focus:border-slate-700"
            />
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm font-medium text-slate-600">
            {filteredMembers.length} result{filteredMembers.length === 1 ? "" : "s"}
          </p>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500">
            <Star className="h-3.5 w-3.5" /> Team-first collaborative culture
          </span>
        </div>

        {filteredMembers.length ? (
          <div className={cn("grid gap-4", activeTab === "faculty" ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3")}>
            {filteredMembers.map((member) => (
              <TeamCard key={`${member.name}-${member.role}`} member={member} isStudent={activeTab === "students"} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">
            No team member found for this search.
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamSection;
