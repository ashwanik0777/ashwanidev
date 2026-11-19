import React, { useMemo, useState } from "react";
import { Heart, Trophy, Calendar } from "lucide-react";
import { pickText } from "./fieldUtils";
import { facultySections, withValue } from "./facultyTabData";
import SubTabs from "./SubTabs";

const Card = ({ className = "", children }) => (
  <div className={`rounded-xl bg-white border border-gray-200 shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => <div className="px-6 pt-6 pb-2">{children}</div>;

const CardTitle = ({ className = "", children }) => (
  <h2 className={`font-bold ${className}`}>{children}</h2>
);

const CardContent = ({ children }) => <div className="px-6 py-4">{children}</div>;

const Badge = ({ className = "", children }) => (
  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${className}`}>
    {children}
  </span>
);

// Bridges the dashboard's editor field names to what this page renders.
const normalizeAward = (item) => ({
  title: pickText(item, ["title", "name"]),
  level: pickText(item, ["level"]),
  awardingBody: pickText(item, ["awardingBody", "organization", "organisation", "awardedBy"]),
  description: pickText(item, ["description"]),
  year: pickText(item, ["year"]),
});

// Static class names only, so Tailwind can see them.
const AWARD_TONES = {
  blue: "border-blue-200 bg-blue-50 text-blue-700",
  green: "border-green-200 bg-green-50 text-green-700",
  orange: "border-orange-200 bg-orange-50 text-orange-700",
  purple: "border-purple-200 bg-purple-50 text-purple-700",
};

const normalizeActivity = (item) => ({
  title: pickText(item, ["title", "name"]),
  organization: pickText(item, ["organization", "organisation"]),
  description: pickText(item, ["description"]),
  duration: pickText(item, ["duration"]),
  location: pickText(item, ["location", "role"]),
});

const AwardsAndSocialImpactPage = ({ profile }) => {
  const [activeTab, setActiveTab] = useState("awards");

  const sections = facultySections(profile);
  const awards = sections.awards.map(normalizeAward);
  const socialActivities = sections.socialActivities.map(normalizeActivity);

  // Only the sub-tabs that have data are offered.
  const subTabs = [
    awards.length > 0 && { id: "awards", label: "Awards & Recognition", icon: Trophy },
    socialActivities.length > 0 && { id: "social", label: "Social Impact", icon: Heart },
  ].filter(Boolean);
  const current = subTabs.some((tab) => tab.id === activeTab) ? activeTab : subTabs[0]?.id;

  const recentYear = useMemo(() => {
    // Award years are free text in the editor — pull out any 4-digit year.
    const years = awards
      ?.map((award) => Number(String(award.year).match(/\d{4}/)?.[0] || 0))
      .filter((year) => year > 1900);
    return years.length ? Math.max(...years) : 0;
  }, [awards]);

  const internationalAwards = useMemo(() => {
    return awards.filter((a) => String(a.level).toLowerCase() === "international").length;
  }, [awards]);

  const nationalAwards = useMemo(() => {
    return awards.filter((a) => String(a.level).toLowerCase() === "national").length;
  }, [awards]);

  // Counts with nothing in them are left out.
  const stats = withValue([
    { label: "Total Awards", value: awards.length, tone: "blue" },
    { label: "International", value: internationalAwards, tone: "green" },
    { label: "National", value: nationalAwards, tone: "orange" },
    { label: "Latest Year", value: recentYear, tone: "purple" },
  ]);

  if (!current) return null;

  return (
    <div className="w-full">
      <div className="w-full px-2 sm:px-4 lg:px-6 py-6">
        <SubTabs tabs={subTabs} active={current} onChange={setActiveTab} />

        {current === "awards" ? (
          <div className="space-y-6">
            {stats.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900">Awards Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat) => (
                      <div key={stat.label} className={`rounded-lg border p-4 text-center ${AWARD_TONES[stat.tone]}`}>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <div className="text-sm">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Awards</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {awards?.map((award, index) => (
                    <div key={index} className="rounded-lg border border-gray-200 bg-white p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="font-semibold text-gray-900">{award.title}</h3>
                        {award.level && (
                          <Badge className="bg-blue-100 text-blue-700">{award.level}</Badge>
                        )}
                      </div>
                      {award.awardingBody && (
                        <p className="text-sm text-blue-700 mt-1">{award.awardingBody}</p>
                      )}
                      {award.description && (
                        <p className="text-sm text-gray-700 mt-2">{award.description}</p>
                      )}
                      {award.year && (
                        <p className="text-xs text-gray-500 mt-2 flex items-center">
                          <Calendar className="w-3 h-3 mr-1" /> {award.year}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">Social Impact Initiatives</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {socialActivities?.map((item, index) => (
                    <div key={index} className="rounded-lg border border-gray-200 bg-white p-4">
                      <h3 className="font-semibold text-gray-900">{item.title}</h3>
                      {item.organization && (
                        <p className="text-sm text-blue-700 mt-1">{item.organization}</p>
                      )}
                      {item.description && (
                        <p className="text-sm text-gray-700 mt-2">{item.description}</p>
                      )}
                      {(item.duration || item.location) && (
                        <p className="text-xs text-gray-500 mt-2">
                          {[item.duration, item.location].filter(Boolean).join(" • ")}
                        </p>
                      )}
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
};

export default AwardsAndSocialImpactPage;
