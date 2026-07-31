import React, { useMemo, useState } from "react";
import { Heart, Trophy, Calendar } from "lucide-react";
import { asArray, pickText } from "./fieldUtils";

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

const normalizeActivity = (item) => ({
  title: pickText(item, ["title", "name"]),
  organization: pickText(item, ["organization", "organisation"]),
  description: pickText(item, ["description"]),
  duration: pickText(item, ["duration"]),
  location: pickText(item, ["location", "role"]),
});

const AwardsAndSocialImpactPage = ({ profile }) => {
  const [activeTab, setActiveTab] = useState("awards");

  const awardsData = profile?.tabData?.awards || {};
  const socialData = profile?.tabData?.socialImpact || {};

  const awards = asArray(awardsData?.awards)?.map(normalizeAward);
  const achievements = asArray(awardsData?.achievements);
  const socialActivities = asArray(socialData?.socialActivities)?.map(normalizeActivity);

  const recentYear = useMemo(() => {
    // Award years are free text in the editor — pull out any 4-digit year.
    const years = awards
      ?.map((award) => Number(String(award.year).match(/\d{4}/)?.[0] || 0))
      .filter((year) => year > 1900);
    return years.length ? Math.max(...years) : "-";
  }, [awards]);

  return (
    <div className="w-full">
      <div className="w-full px-2 sm:px-4 lg:px-6 py-6">
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <button
            type="button"
            onClick={() => setActiveTab("awards")}
            className={`flex items-center cursor-pointer text-xl sm:text-2xl font-bold pb-2 ${
              activeTab === "awards" ? "text-blue-600 border-b-4 border-blue-600" : "text-gray-900"
            }`}
          >
            <Trophy className={`w-6 h-6 mr-2 ${activeTab === "awards" ? "text-blue-600" : "text-gray-400"}`} />
            Awards & Recognition
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("social")}
            className={`flex items-center cursor-pointer text-xl sm:text-2xl font-bold pb-2 ${
              activeTab === "social" ? "text-blue-600 border-b-4 border-blue-600" : "text-gray-900"
            }`}
          >
            <Heart className={`w-6 h-6 mr-2 ${activeTab === "social" ? "text-blue-600" : "text-gray-400"}`} />
            Social Impact
          </button>
        </div>

        {activeTab === "awards" ? (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">Awards Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-center">
                    <div className="text-2xl font-bold text-blue-700">{awards.length}</div>
                    <div className="text-sm text-blue-700">Total Awards</div>
                  </div>
                  <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-center">
                    <div className="text-2xl font-bold text-green-700">{achievements.length}</div>
                    <div className="text-sm text-green-700">Achievements</div>
                  </div>
                  <div className="rounded-lg border border-purple-200 bg-purple-50 p-4 text-center">
                    <div className="text-2xl font-bold text-purple-700">{recentYear}</div>
                    <div className="text-sm text-purple-700">Latest Year</div>
                  </div>
                </div>
              </CardContent>
            </Card>

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
                  {awards.length === 0 && (
                    <p className="py-6 text-center text-sm text-gray-500">
                      No awards added yet.
                    </p>
                  )}
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
                  {socialActivities.length === 0 && (
                    <p className="py-6 text-center text-sm text-gray-500">
                      No social impact activities added yet.
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
};

export default AwardsAndSocialImpactPage;
