import { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink, Info } from "lucide-react";
import { asArray, asText, pickText } from "./fieldUtils";
 export const Card = ({ className = "", children, ...props }) => (
   <div className={`bg-white rounded-xl border border-gray-200 border-solid shadow-sm${className}`} {...props}>
     {children}
   </div>
 );
 
 export const CardHeader = ({ className = "", children, ...props }) => (
   <div className={`px-6 pt-6 pb-2  `} {...props}>
     {children}
   </div>
 );
 
 export const CardTitle = ({ className = "", children, ...props }) => (
   <h2 className={`font-bold ${className}`} {...props}>
     {children}
   </h2>
 );
 
 export const CardContent = ({ className = "", children, ...props }) => (
   <div className={`px-6 py-4 ${className}`} {...props}>
     {children}
   </div>
 );
 

// ✅ Local Button fallback if you don't have a Button component
const Button = ({ children, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`inline-flex items-center text-sm font-medium ${className}`}
  >
    {children}
  </button>
);
const OverviewTab = ({ activeTab, profile }) => {
  // Hooks must run on every render — keep this above the loading early-return.
  const [expanded, setExpanded] = useState(false);

  if (!profile) {
    return (
      <div className="text-center text-gray-600 py-12">
        Loading faculty details...
      </div>
    );
  }

  const name = asText(profile.name, 'this faculty member');
  const shortBio = asText(profile.shortBio);
  const fullBio = asText(profile.fullBio, shortBio);
  const hasLongBio = Boolean(fullBio) && fullBio !== shortBio;

  // Research areas may be stored as objects ({title, description}) or as plain
  // strings coming from the tags field.
  const researchAreas = asArray(profile.researchAreas)?.map((area) =>
    typeof area === 'string'
      ? { title: area, description: '' }
      : { title: pickText(area, ['title', 'name']), description: pickText(area, ['description']) },
  );

  // Only surface links the faculty has actually filled in.
  const quickLinks = [
    { label: 'Curriculum Vitae', url: asText(profile.cv) },
    { label: 'Google Scholar', url: asText(profile.googleScholar) },
    { label: 'ORCID Profile', url: asText(profile.orcid) },
    { label: 'Faculty Page', url: asText(profile.faculty_url) },
  ].filter((link) => link.url);

  return (
    <div className="space-y-6 bg-gray-50">
      {/* Bio Section */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-900 flex items-center">
            <Info className="w-6 h-6 mr-2 text-blue-600" />
            About {name}
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">
              {(expanded ? fullBio : shortBio) || 'No biography added yet.'}
            </p>
            {hasLongBio && (
              <Button
                variant="ghost"
                onClick={() => setExpanded(!expanded)}
                className="mt-4 p-0 h-auto text-blue-600 hover:text-blue-700"
              >
                {expanded ? (
                  <>
                    <ChevronUp className="w-4 h-4 mr-1" />
                    Read Less
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4 mr-1" />
                    Read More
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Research Areas */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">
            Research Areas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {researchAreas?.map((area, index) => (
              <div
                key={index}
                className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100"
              >
                <h3 className="font-semibold text-blue-900 mb-2">
                  {area.title}
                </h3>
                {area.description && (
                  <p className="text-sm text-blue-700">{area.description}</p>
                )}
              </div>
            ))}
            {researchAreas.length === 0 && (
              <p className="py-6 text-center text-sm text-gray-500 md:col-span-2">
                No research areas added yet.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      {quickLinks.length > 0 && (
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">Quick Links</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickLinks?.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-auto items-center rounded-lg border border-blue-200 border-solid bg-gradient-to-br from-blue-50 to-blue-100 p-4 transition-all duration-200 hover:from-blue-100 hover:to-blue-200"
                >
                  <ExternalLink className="w-4 h-4 mr-2 text-blue-700" />
                  <span className="text-sm text-blue-900">{link.label}</span>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OverviewTab;
