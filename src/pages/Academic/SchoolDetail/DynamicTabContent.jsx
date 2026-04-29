import React, { lazy, Suspense } from 'react';

// Lazy loading the dynamic components for optimal performance
const FacultyList = lazy(() => import('../../departments/Faculty'));
const AnnouncementsList = lazy(() => import('../../Announcements/NewsNotifications'));
const NoticesList = lazy(() => import('../../Announcements/Notice'));

const DynamicTabContent = ({ tabConfig, shortCode, schoolData }) => {
  if (!tabConfig) return null;

  // Handler for Static Content from JSON
  if (tabConfig.type === 'static') {
    return (
      <div className="prose max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{tabConfig.title}</h2>
        {tabConfig.content?.description && (
          <p className="mb-4">{tabConfig.content.description}</p>
        )}
        {tabConfig.content?.mission && (
          <div className="mb-6 p-6 bg-blue-50 rounded-md">
            <h3 className="text-xl text-blue-900 font-semibold mb-2">Our Mission</h3>
            <p>{tabConfig.content.mission}</p>
          </div>
        )}
        {tabConfig.content?.vision && (
           <div className="mb-6 p-6 bg-green-50 rounded-md">
            <h3 className="text-xl text-green-900 font-semibold mb-2">Our Vision</h3>
            <p>{tabConfig.content.vision}</p>
          </div>
        )}
      </div>
    );
  }

  // Handler for Dynamic API Content
  if (tabConfig.type === 'dynamic') {
    return (
      <div className="dynamic-content-wrapper">
        
        <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading component...</div>}>
          {tabConfig.apiComponent === 'FacultyList' && <FacultyList schoolCode={shortCode} />}
          {tabConfig.apiComponent === 'Announcements' && <NoticesList schoolCode={shortCode} />}
          {tabConfig.apiComponent === 'NewsUpdates' && <AnnouncementsList schoolCode={shortCode} />}
          
          {!['FacultyList', 'Announcements', 'NewsUpdates'].includes(tabConfig.apiComponent) && (
             <div className="p-8 border border-dashed border-gray-300 rounded-lg text-center bg-gray-50">
               <p className="text-gray-500 mb-2">
                 Loading dynamic content component: <span className="font-semibold text-gray-800">{tabConfig.apiComponent}</span>
               </p>
               <p className="text-sm text-gray-400">
                 (Fetches API data for school: <span className="font-mono">{shortCode}</span>)
               </p>
             </div>
          )}
        </Suspense>
      </div>
    );
  }

  return <div>Unknown tab configuration.</div>;
};

export default DynamicTabContent;
