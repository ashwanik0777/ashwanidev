import React, { useEffect, useMemo, useState } from "react";
import ButtonGroup from '../TabsData.jsx';
import {
  DEFAULT_TENDERS,
  TENDERS_STORAGE_KEY,
  getTenderAutoHideDate,
  splitTendersByStatus,
} from "../../Data/tendersData";
import { listTenders } from "../../services/tendersService";

/*
 * Tenders come from the database (GET /tenders), which is what the admin
 * dashboard writes to. localStorage is kept only as an offline cache for the
 * first paint: it used to be the sole source, so a visitor whose browser had
 * never run the dashboard saw the hardcoded DEFAULT_TENDERS instead of the real
 * ones. The rendering below is unchanged.
 */
const getCachedTenders = () => {
  try {
    const raw = localStorage.getItem(TENDERS_STORAGE_KEY);
    if (!raw) return DEFAULT_TENDERS;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return DEFAULT_TENDERS;
    return parsed;
  } catch {
    return DEFAULT_TENDERS;
  }
};

const cacheTenders = (items) => {
  try {
    localStorage.setItem(TENDERS_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Cache write failures are not fatal — the API data is already rendered.
  }
};

const formatAutoHideLabel = (closingDate) => {
  const autoHideDate = getTenderAutoHideDate(closingDate);
  if (!autoHideDate) return "N/A";
  return autoHideDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// ✅ Tender Card UI
const TenderCard = ({ tender, index, variant = "current" }) => (
  <div
    className={`rounded-xl border p-6 transition hover:shadow-lg ${
      variant === "archived"
        ? "bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200"
        : "bg-gradient-to-br from-white to-teal-50 border-teal-200"
    }`}
  >
    <h3
      className={`text-lg font-bold mb-2 ${
        variant === "archived" ? "text-gray-800" : "text-indigo-800"
      }`}
    >
      {index + 1}. {tender.title}
    </h3>
    <p className="text-sm text-gray-600 mb-3">{tender.description}</p>
    <p className="text-sm mb-2">
      <span className="font-semibold">Closing Date:</span> {tender.closingDate}
    </p>
    <a
      href={tender.documentUrl}
      className={`inline-block text-sm font-semibold underline transition-colors duration-200 ${
        variant === "archived"
          ? "text-orange-600 hover:text-orange-800"
          : "text-teal-600 hover:text-teal-800"
      }`}
      target="_blank"
      rel="noopener noreferrer"
    >
      View Document
    </a>
  </div>
);

// ✅ Tenders Table Page
const TendersTable = () => {
  const [activeTab, setActiveTab] = useState("current");
  const [tenders, setTenders] = useState(getCachedTenders);

  useEffect(() => {
    let isMounted = true;

    const loadTenders = async () => {
      try {
        const items = await listTenders();
        if (!isMounted) return;
        setTenders(items);
        cacheTenders(items);
      } catch {
        // Offline or API down — keep showing the cached list.
        if (isMounted) setTenders(getCachedTenders());
      }
    };

    loadTenders();
    window.addEventListener("storage", loadTenders);
    window.addEventListener("focus", loadTenders);
    window.addEventListener("tenders-data-updated", loadTenders);
    return () => {
      isMounted = false;
      window.removeEventListener("storage", loadTenders);
      window.removeEventListener("focus", loadTenders);
      window.removeEventListener("tenders-data-updated", loadTenders);
    };
  }, []);

  const { current: currentTenders, archived: archivedTenders } = useMemo(
    () => splitTendersByStatus(tenders),
    [tenders],
  );

  const tabButtons = [
    { id: "current", label: "Current Opportunities", tooltip: "View active tenders" },
    { id: "archived", label: "Archived Opportunities", tooltip: "View past tenders" },
  ];

  return (
    <div className="w-full bg-white shadow-xl border border-gray-200 p-8 sm:p-10 rounded-2xl">
      {/* Tabs */}
      <ButtonGroup
        buttons={tabButtons}
        onClick={setActiveTab}
        activeButton={activeTab}
        size="lg"
        fullWidth={false}
        rounded="xl"
        animated={true}
        theme="primary"
        gap={true}
        className="flex justify-center mb-8"
      />

      {/* Tab Content */}
      {activeTab === "current" && (
        <div className="space-y-5">
         
          {currentTenders.map((t, i) => (
            <TenderCard tender={t} index={i} key={t.id} variant="current" />
          ))}
          {!currentTenders.length ? (
            <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-5 text-sm text-gray-600">
              There are no active tenders available right now.
            </div>
          ) : null}
        </div>
      )}

      {activeTab === "archived" && (
        <div className="space-y-5">
          {archivedTenders.map((t, i) => (
            <TenderCard tender={t} index={i} key={t.id} variant="archived" />
          ))}
          {!archivedTenders.length ? (
            <div className="mt-6 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-5 text-sm text-gray-600">
              There are no archived tenders available right now.
            </div>
          ) : (
            <>
            
            {/* <div className="mt-6 rounded-lg border-l-4 border-orange-400 bg-gray-50 p-4">
              <p className="text-sm text-gray-600 italic">
               The auto-hide cutoff for these tenders happens 1 day after the closing date.
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Latest cutoff: {formatAutoHideLabel(archivedTenders[0]?.closingDate)}
              </p>
            </div> */}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TendersTable;
