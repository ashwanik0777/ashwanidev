import React, { useState, useEffect, useMemo } from 'react';
import { Search, Users, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import ContactCard from '../../components/directory/ContactCard';
import CategoryDropdown from '../../components/directory/CategoryDropdown';
import { contactsData } from './contactsData';

import BannerSection from '../../components/HeroBanner';
import SearchableWrapper from '../../components/Searchbar/SearchableWrapper';

const ITEMS_PER_PAGE = 15;

const ContactDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page on filter/search change
  }, [searchTerm, selectedCategory]);

  const filteredContacts = useMemo(() => {
    let filtered = contactsData;

    if (selectedCategory) {
      filtered = filtered.filter(
        (contact) => contact.category === selectedCategory
      );
    }

    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      filtered = filtered.filter((contact) =>
        (contact.name?.toLowerCase().includes(searchLower) ||
          contact.designation?.toLowerCase().includes(searchLower) ||
          contact.department?.toLowerCase().includes(searchLower) ||
          contact.email?.toLowerCase().includes(searchLower) ||
          contact.phone?.includes(searchTerm.trim()))
      );
    }

    return filtered;
  }, [searchTerm, selectedCategory]);

  const groupedContacts = useMemo(() => {
    const groups = {};
    filteredContacts.forEach(contact => {
      const cat = contact.category || "General";
      if (!groups[cat]) {
        groups[cat] = {
          id: cat,
          category: cat,
          members: []
        };
      }
      groups[cat].members.push(contact);
    });
    // Sort groups alphabetically by category name
    return Object.values(groups).sort((a, b) => a.category.localeCompare(b.category));
  }, [filteredContacts]);

  const totalPages = Math.ceil(groupedContacts.length / ITEMS_PER_PAGE);
  const paginatedGroups = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return groupedContacts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [groupedContacts, currentPage]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
  };

  return (
    <SearchableWrapper>
       <BannerSection
          title="Contact Directory"
          subtitle="Gautam Buddha University"
          bgTheme={4}
        />
      <div className="relative mx-0 md:mx-10 lg:mx-20 mb-20 bg-[#F8FAFC] min-h-screen smooth-transition pb-10">
       

        {/* Search & Filter Section */}
        <div className="container mx-auto px-4 py-6 md:py-10">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center justify-between bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 rounded-2xl p-6 animate-fade-in-up">
            {/* Search */}
            <div className="relative w-full md:w-1/2">
              <Search
                className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-all ${
                  isSearchFocused ? 'text-blue-500' : 'text-slate-400'
                }`}
              />
              <input
                type="text"
                placeholder="Search by name, department, phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all bg-slate-50 focus:bg-white text-slate-700 placeholder:text-slate-400"
              />
            </div>

            {/* Category Filter */}
            <div className="w-full md:w-1/2 flex items-center gap-2">
              <CategoryDropdown
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </div>
          </div>

          {/* Filter Count + Clear */}
          <div className="flex justify-between mt-5 px-2">
            <div className="text-sm text-slate-600 font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-600" />
              {filteredContacts.length} contact(s) across {groupedContacts.length} office(s)
            </div>
            {(searchTerm || selectedCategory) && (
              <button
                onClick={clearFilters}
                className="text-blue-600 hover:text-blue-800 font-bold text-sm px-3 py-1.5 rounded-lg hover:bg-blue-50 transition"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Contacts Section */}
        <div className="container mx-auto px-4">
          {filteredContacts.length === 0 ? (
            <div className="text-center py-16 md:py-24 animate-fade-in bg-white rounded-3xl border border-slate-100 shadow-sm">
              <Search className="h-16 w-16 mx-auto mb-4 text-slate-300" />
              <h3 className="text-xl md:text-2xl font-bold text-slate-700 mb-2 font-outfit">
                No contacts found
              </h3>
              <p className="text-slate-500 mb-6 font-inter">
                {searchTerm || selectedCategory
                  ? "Try adjusting your search or category filters."
                  : 'No contacts available currently.'}
              </p>
              {(searchTerm || selectedCategory) && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition shadow-md"
                >
                  <Filter className="h-4 w-4" />
                  Clear all
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Contact Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
                {paginatedGroups.map((group, index) => (
                  <div
                    key={group.id}
                    className="animate-fade-in h-full"
                    style={{
                      animationDelay: `${Math.min(index * 100, 800)}ms`,
                      animationFillMode: 'both',
                    }}
                  >
                    <ContactCard group={group} />
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12 gap-4 items-center animate-fade-in-up">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className={`flex items-center gap-1.5 px-5 py-2.5 font-semibold border rounded-xl transition-all ${
                      currentPage === 1
                        ? 'bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed'
                        : 'bg-white hover:bg-blue-50 text-blue-600 border-blue-100 hover:border-blue-200 shadow-sm'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Prev
                  </button>

                  <span className="text-slate-600 font-semibold bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(p + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className={`flex items-center gap-1.5 px-5 py-2.5 font-semibold border rounded-xl transition-all ${
                      currentPage === totalPages
                        ? 'bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed'
                        : 'bg-white hover:bg-blue-50 text-blue-600 border-blue-100 hover:border-blue-200 shadow-sm'
                    }`}
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </SearchableWrapper>
  );
};

export default ContactDirectory;