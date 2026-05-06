import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  User,
  Building,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";
import BannerSection from "../../components/HeroBanner";
import { contactData } from "../../Data/schools/SOICT/contact";

// Reusable Card Components
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-lg border-gray-300 ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`p-5 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-xl font-bold text-foreground ${className}`}>
    {children}
  </h3>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-5 ${className}`}>{children}</div>
);

// Contact Component
const Contact = ({ data, departments, officeHours, generalInfo }) => {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <BannerSection
        title={generalInfo.heading}
        subtitle={generalInfo.subheading}
        bgTheme={3}
      />

      {/* General Info Cards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-foreground mb-12">
              General Information
            </h2>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {generalInfo.cards.map((info, idx) => (
                <Card key={idx} className="text-center hover:shadow-xl border-0 shadow-lg">
                  <CardHeader>
                    <div className={`w-16 h-16 ${info.gradient} rounded-full flex items-center justify-center mx-auto`}>
                      {info.icon}
                    </div>
                    <CardTitle>{info.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground whitespace-pre-line">{info.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Office Hours */}
            <Card className="mb-9">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Office Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {officeHours.map((schedule, index) => (
                    <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="font-semibold text-foreground">{schedule.day}</div>
                      <div className="text-muted-foreground">{schedule.time}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* Department Contacts */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-foreground mb-4">
              Department Contacts
            </h2>
            <p className="text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
              Get in touch with specific departments and their heads for academic inquiries.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {departments.map((dept, index) => (
                <Card key={index} className="hover:shadow-xl border-0 shadow-lg overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${dept.color}`}></div>
                  <CardHeader className="pb-4">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${dept.color} rounded-lg flex items-center justify-center`}>
                        <Building className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg text-foreground mb-1">{dept.name}</CardTitle>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <User className="h-4 w-4" />
                          <span>HOD: {dept.hod}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-3 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{dept.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{dept.email}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">HOD: {dept.hodEmail}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{dept.office}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COE Contacts */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-foreground mb-8">
              Center of Excellence Contacts
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {data.map((item, index) => (
                <Card key={index} className="hover:shadow-xl border-0 shadow-lg overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${item.color}`}></div>
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-center space-x-4 min-h-[80px] md:min-h-[90px]">
                      <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center`}>
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg text-foreground mb-1">{item.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{item.department}</p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-3 text-sm">
                      <MapPin className="h-4 w-4 " />
                      <span className="text-muted-foreground">{item.address}</span>
                    </div>
                    <div className="flex items-start space-x-3 text-sm">
                      <Mail className="h-4 w-4 " />
                      <span className="text-muted-foreground">{item.email}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{item.phone}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-2">Connect With Us</p>
                      <div className={`flex space-x-4 ${item.textColor} text-xl`}>
                        <a href={item.socials.linkedin} aria-label="LinkedIn"><Linkedin /></a>
                        <a href={item.socials.twitter} aria-label="Twitter"><Twitter /></a>
                        <a href={item.socials.instagram} aria-label="Instagram"><Instagram /></a>
                        <a href={item.socials.youtube} aria-label="YouTube"><Youtube /></a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Rendering Contact Component
const ContactPage = () => (
  <Contact
    data={contactData.coeContacts}
    departments={contactData.departments}
    officeHours={contactData.officeHours}
    generalInfo={contactData.generalInfo}
  />
);

export default ContactPage;
