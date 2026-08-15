import React from "react";
import SearchableWrapper from "../../../components/Searchbar/SearchableWrapper";

const importantLinks = [
  { id: 1, title: "World Intellectual Property Organization (WIPO)", link: "https://www.wipo.int/portal/en/" },
  { id: 2, title: "American Patents' Database", link: "http://patft.uspto.gov/" },
  { id: 3, title: "Indian Patents' Database", link: "http://patinfo.nic.in/" },
  { id: 4, title: "Intellectual Property, India", link: "http://ipindia.nic.in/" },
  { id: 5, title: "European Patent Office", link: "http://epo.org/" },
];

export default function ImportantLinks() {
  return (
    <SearchableWrapper>
      <div className="bg-white rounded-2xl p-6 sm:p-10 border border-gray-100 shadow-sm space-y-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
            Important Links
          </h2>
          <div className="h-1 w-20 bg-amber-500 rounded-full mb-6"></div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-gray-200">
              <thead>
                <tr className="bg-slate-100 border-b border-gray-200 text-gray-800 text-sm sm:text-base font-bold">
                  <th className="p-3 border-r border-gray-200 w-16 text-center">Sl.</th>
                  <th className="p-3 border-r border-gray-200">Discription :</th>
                  <th className="p-3 w-32 text-center">Website Link</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm sm:text-base text-gray-700">
                {importantLinks.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 border-r border-gray-200 text-center font-semibold">{item.id}</td>
                    <td className="p-3 border-r border-gray-200 font-medium">{item.title}</td>
                    <td className="p-3 text-center">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-sky-500 hover:bg-sky-600 text-white text-xs sm:text-sm font-semibold px-4 py-1.5 rounded transition-colors shadow-xs"
                      >
                        Visit
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SearchableWrapper>
  );
}
