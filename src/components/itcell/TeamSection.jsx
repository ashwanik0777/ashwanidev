import React, { useMemo, useState, useEffect } from "react";
import { Mail, Linkedin, Users, GraduationCap, Globe, User, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { listItcellMembers } from "../../services/itcellService";
import { resolveFacultyImage } from "../../utils/imageUtils";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const TeamCard = ({ member }) => {
  const displayImage = resolveFacultyImage(member.image, member.image, member.name, member.email);
  const isStudent = member.isStudent ?? (member.teamType === "student");

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

        <div className=" space-y-1">
          {member.department && (
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{member.department}</p>
          )}
          {member.designation && (
            <p className="text-sm text-slate-600">{member.designation}</p>
          )}
          {/* <span
            className={cn(
              "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold mt-1",
              isStudent ? "bg-emerald-100 text-emerald-700" : "bg-indigo-100 text-indigo-700",
            )}
          >
            {isStudent ? "Student Team" : "Faculty Team"}
          </span> */}
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

      <div className="flex flex-wrap items-center gap-2 mt-auto pt-2">
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

  const facultyMembers = useMemo(() => {
    return teamData.faculty.map((m) => ({ ...m, isStudent: false }));
  }, [teamData]);

  const studentMembers = useMemo(() => {
    return teamData.student.map((m) => ({ ...m, isStudent: true }));
  }, [teamData]);

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
    <section className="space-y-10">
      {/* Faculty Team Section */}
      <div>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 flex items-center gap-2">
          <Users className="h-6 w-6 text-indigo-600" />
          Faculty Team
        </h3>
        {facultyMembers.length ? (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {facultyMembers.map((member, idx) => (
              <TeamCard key={`faculty-${idx}`} member={member} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">
            No faculty members found.
          </div>
        )}
      </div>

      {/* Student Team Section */}
      <div>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-emerald-600" />
          Student Team
        </h3>
        {studentMembers.length ? (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {studentMembers.map((member, idx) => (
              <TeamCard key={`student-${idx}`} member={member} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">
            No student members found.
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamSection;
