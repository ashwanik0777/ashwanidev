import React, { useState, useMemo } from "react";
import {
  Calendar as CalendarIcon,
  Moon,
  Search,
  CheckCircle2,
  Sparkles,
  Grid,
  List as ListIcon,
  MapPin,
  ShieldCheck,
  CalendarDays,
  X,
  Download
} from "lucide-react";
import BannerSection from "../../components/HeroBanner.jsx";
import SearchableWrapper from "../../components/Searchbar/SearchableWrapper.jsx";

// Official Gautam Buddha University Holiday List 2026 Data (English Version)
// Based on Office Order No.: GBU-029/Admn./Exec.Admn./43/2026-2670 dated 07 January 2026
const HOLIDAYS_DATA = [
  // --- 1. PUBLIC HOLIDAYS (24 Days) ---
  {
    id: "gh-1",
    date: "2026-01-03",
    day: "Saturday",
    title: "Birth Anniversary of Hazrat Ali",
    category: "GH",
    categoryName: "Public Holiday",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    dotColor: "bg-emerald-500",
    month: "January",
    year: "2026",
    isMoonSighted: true,
    description: "Public holiday in honor of Hazrat Ali's birth anniversary."
  },
  {
    id: "gh-2",
    date: "2026-01-26",
    day: "Monday",
    title: "Republic Day",
    category: "GH",
    categoryName: "Public Holiday",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    dotColor: "bg-emerald-500",
    month: "January",
    year: "2026",
    isMoonSighted: false,
    description: "National holiday celebrating the enactment of the Constitution of India."
  },
  {
    id: "gh-3",
    date: "2026-02-15",
    day: "Sunday",
    title: "Maha Shivratri",
    category: "GH",
    categoryName: "Public Holiday",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    dotColor: "bg-emerald-500",
    month: "February",
    year: "2026",
    isMoonSighted: false,
    description: "Festival commemorating Lord Shiva."
  },
  {
    id: "gh-4",
    date: "2026-03-02",
    day: "Monday",
    title: "Holika Dahan",
    category: "GH",
    categoryName: "Public Holiday",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    dotColor: "bg-emerald-500",
    month: "March",
    year: "2026",
    isMoonSighted: false,
    description: "Eve of Holi symbolizing the triumph of good over evil."
  },
  {
    id: "gh-5",
    date: "2026-03-04",
    day: "Wednesday",
    title: "Holi",
    category: "GH",
    categoryName: "Public Holiday",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    dotColor: "bg-emerald-500",
    month: "March",
    year: "2026",
    isMoonSighted: false,
    description: "Main festival of colors."
  },
  {
    id: "gh-6",
    date: "2026-03-21",
    day: "Saturday",
    title: "Id-ul-Fitr",
    category: "GH",
    categoryName: "Public Holiday",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    dotColor: "bg-emerald-500",
    month: "March",
    year: "2026",
    isMoonSighted: true,
    description: "Islamic festival marking the end of Ramadan."
  },
  {
    id: "gh-7",
    date: "2026-03-26",
    day: "Thursday",
    title: "Ram Navami",
    category: "GH",
    categoryName: "Public Holiday",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    dotColor: "bg-emerald-500",
    month: "March",
    year: "2026",
    isMoonSighted: false,
    description: "Birth anniversary of Lord Rama."
  },
  {
    id: "gh-8",
    date: "2026-03-31",
    day: "Tuesday",
    title: "Mahavir Jayanti",
    category: "GH",
    categoryName: "Public Holiday",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    dotColor: "bg-emerald-500",
    month: "March",
    year: "2026",
    isMoonSighted: false,
    description: "Birth anniversary of Lord Mahavira."
  },
  {
    id: "gh-9",
    date: "2026-04-03",
    day: "Friday",
    title: "Good Friday",
    category: "GH",
    categoryName: "Public Holiday",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    dotColor: "bg-emerald-500",
    month: "April",
    year: "2026",
    isMoonSighted: false,
    description: "Christian holiday observing the crucifixion of Jesus Christ."
  },
  {
    id: "gh-10",
    date: "2026-04-14",
    day: "Tuesday",
    title: "Dr. B.R. Ambedkar Jayanti",
    category: "GH",
    categoryName: "Public Holiday",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    dotColor: "bg-emerald-500",
    month: "April",
    year: "2026",
    isMoonSighted: false,
    description: "Birth anniversary of Dr. B.R. Ambedkar."
  },
  {
    id: "gh-11",
    date: "2026-05-01",
    day: "Friday",
    title: "Buddha Purnima",
    category: "GH",
    categoryName: "Public Holiday",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    dotColor: "bg-emerald-500",
    month: "May",
    year: "2026",
    isMoonSighted: false,
    description: "Birth anniversary and enlightenment of Gautama Buddha."
  },
  {
    id: "gh-12",
    date: "2026-05-27",
    day: "Wednesday",
    title: "Id-ul-Zuha (Bakrid)",
    category: "GH",
    categoryName: "Public Holiday",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    dotColor: "bg-emerald-500",
    month: "May",
    year: "2026",
    isMoonSighted: true,
    description: "Feast of the Sacrifice in Islamic tradition."
  },
  {
    id: "gh-13",
    date: "2026-06-26",
    day: "Friday",
    title: "Muharram",
    category: "GH",
    categoryName: "Public Holiday",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    dotColor: "bg-emerald-500",
    month: "June",
    year: "2026",
    isMoonSighted: true,
    description: "First month of the Islamic calendar."
  },
  {
    id: "gh-14",
    date: "2026-08-15",
    day: "Saturday",
    title: "Independence Day",
    category: "GH",
    categoryName: "Public Holiday",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    dotColor: "bg-emerald-500",
    month: "August",
    year: "2026",
    isMoonSighted: false,
    description: "National holiday commemorating Indian Independence."
  },
  {
    id: "gh-15",
    date: "2026-08-26",
    day: "Wednesday",
    title: "Eid-e-Milad / Barawafat",
    category: "GH",
    categoryName: "Public Holiday",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    dotColor: "bg-emerald-500",
    month: "August",
    year: "2026",
    isMoonSighted: true,
    description: "Observance of the Prophet Muhammad's birth anniversary."
  },
  {
    id: "gh-16",
    date: "2026-08-28",
    day: "Friday",
    title: "Raksha Bandhan",
    category: "GH",
    categoryName: "Public Holiday",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    dotColor: "bg-emerald-500",
    month: "August",
    year: "2026",
    isMoonSighted: false,
    description: "Festival celebrating the bond of protection between siblings."
  },
  {
    id: "gh-17",
    date: "2026-09-04",
    day: "Friday",
    title: "Janmashtami",
    category: "GH",
    categoryName: "Public Holiday",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    dotColor: "bg-emerald-500",
    month: "September",
    year: "2026",
    isMoonSighted: false,
    description: "Birth anniversary of Lord Krishna."
  },
  {
    id: "gh-18",
    date: "2026-10-02",
    day: "Friday",
    title: "Mahatma Gandhi Jayanti",
    category: "GH",
    categoryName: "Public Holiday",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    dotColor: "bg-emerald-500",
    month: "October",
    year: "2026",
    isMoonSighted: false,
    description: "National holiday celebrating the birth anniversary of Mahatma Gandhi."
  },
  {
    id: "gh-19",
    date: "2026-10-20",
    day: "Tuesday",
    title: "Dussehra (Mahanavami / Vijayadashami)",
    category: "GH",
    categoryName: "Public Holiday",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    dotColor: "bg-emerald-500",
    month: "October",
    year: "2026",
    isMoonSighted: false,
    description: "Celebration of the victory of good over evil."
  },
  {
    id: "gh-20",
    date: "2026-11-08",
    day: "Sunday",
    title: "Deepawali",
    category: "GH",
    categoryName: "Public Holiday",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    dotColor: "bg-emerald-500",
    month: "November",
    year: "2026",
    isMoonSighted: false,
    description: "Festival of lights."
  },
  {
    id: "gh-21",
    date: "2026-11-09",
    day: "Monday",
    title: "Govardhan Puja",
    category: "GH",
    categoryName: "Public Holiday",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    dotColor: "bg-emerald-500",
    month: "November",
    year: "2026",
    isMoonSighted: false,
    description: "Post-Diwali Govardhan worship festival."
  },
  {
    id: "gh-22",
    date: "2026-11-11",
    day: "Wednesday",
    title: "Bhaiya Dooj / Chitragupta Jayanti",
    category: "GH",
    categoryName: "Public Holiday",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    dotColor: "bg-emerald-500",
    month: "November",
    year: "2026",
    isMoonSighted: false,
    description: "Festival honoring sibling bonds and Lord Chitragupta."
  },
  {
    id: "gh-23",
    date: "2026-11-24",
    day: "Tuesday",
    title: "Guru Nanak Jayanti / Kartik Purnima",
    category: "GH",
    categoryName: "Public Holiday",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    dotColor: "bg-emerald-500",
    month: "November",
    year: "2026",
    isMoonSighted: false,
    description: "Birth anniversary of Guru Nanak Dev Ji."
  },
  {
    id: "gh-24",
    date: "2026-12-25",
    day: "Friday",
    title: "Christmas Day",
    category: "GH",
    categoryName: "Public Holiday",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    dotColor: "bg-emerald-500",
    month: "December",
    year: "2026",
    isMoonSighted: false,
    description: "Celebration of the birth of Jesus Christ."
  },

  // --- 2. RESTRICTED HOLIDAYS (31 Days) ---
  {
    id: "rh-1",
    date: "2026-01-01",
    day: "Thursday",
    title: "New Year's Day",
    category: "RH",
    categoryName: "Restricted Holiday",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200/80",
    dotColor: "bg-purple-500",
    month: "January",
    year: "2026",
    isMoonSighted: false,
    description: "First day of the Gregorian year."
  },
  {
    id: "rh-2",
    date: "2026-01-14",
    day: "Wednesday",
    title: "Makar Sankranti",
    category: "RH",
    categoryName: "Restricted Holiday",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200/80",
    dotColor: "bg-purple-500",
    month: "January",
    year: "2026",
    isMoonSighted: false,
    description: "Solar harvest festival marking the Sun's transit into Capricorn."
  },
  {
    id: "rh-3",
    date: "2026-01-23",
    day: "Friday",
    title: "Vasant Panchami",
    category: "RH",
    categoryName: "Restricted Holiday",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200/80",
    dotColor: "bg-purple-500",
    month: "January",
    year: "2026",
    isMoonSighted: false,
    description: "Festival dedicated to Goddess Saraswati."
  },
  {
    id: "rh-4",
    date: "2026-01-24",
    day: "Saturday",
    title: "Jannayak Karpoori Thakur Jayanti",
    category: "RH",
    categoryName: "Restricted Holiday",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200/80",
    dotColor: "bg-purple-500",
    month: "January",
    year: "2026",
    isMoonSighted: false,
    description: "Birth anniversary of Jannayak Karpoori Thakur."
  },
  {
    id: "rh-5",
    date: "2026-02-01",
    day: "Sunday",
    title: "Sant Ravidas Jayanti",
    category: "RH",
    categoryName: "Restricted Holiday",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200/80",
    dotColor: "bg-purple-500",
    month: "February",
    year: "2026",
    isMoonSighted: false,
    description: "Birth anniversary of Saint Ravidas."
  },
  {
    id: "rh-6",
    date: "2026-02-04",
    day: "Wednesday",
    title: "Shab-e-Barat",
    category: "RH",
    categoryName: "Restricted Holiday",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200/80",
    dotColor: "bg-purple-500",
    month: "February",
    year: "2026",
    isMoonSighted: true,
    description: "Night of Forgiveness in Islamic tradition."
  },
  {
    id: "rh-7",
    date: "2026-03-05",
    day: "Thursday",
    title: "Holi (Second Day)",
    category: "RH",
    categoryName: "Restricted Holiday",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200/80",
    dotColor: "bg-purple-500",
    month: "March",
    year: "2026",
    isMoonSighted: false,
    description: "Extended Holi holiday."
  },
  {
    id: "rh-8",
    date: "2026-03-13",
    day: "Friday",
    title: "Jamat-ul-Vida / Alvida",
    category: "RH",
    categoryName: "Restricted Holiday",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200/80",
    dotColor: "bg-purple-500",
    month: "March",
    year: "2026",
    isMoonSighted: true,
    description: "Last Friday of the holy month of Ramadan."
  },
  {
    id: "rh-9",
    date: "2026-03-19",
    day: "Thursday",
    title: "Cheti Chand",
    category: "RH",
    categoryName: "Restricted Holiday",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200/80",
    dotColor: "bg-purple-500",
    month: "March",
    year: "2026",
    isMoonSighted: false,
    description: "Sindhi New Year festival."
  },
  {
    id: "rh-10",
    date: "2026-03-22",
    day: "Sunday",
    title: "Id-ul-Fitr (Second Day)",
    category: "RH",
    categoryName: "Restricted Holiday",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200/80",
    dotColor: "bg-purple-500",
    month: "March",
    year: "2026",
    isMoonSighted: true,
    description: "Second day of Eid-ul-Fitr celebrations."
  },
  {
    id: "rh-11",
    date: "2026-04-04",
    day: "Saturday",
    title: "Easter Saturday",
    category: "RH",
    categoryName: "Restricted Holiday",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200/80",
    dotColor: "bg-purple-500",
    month: "April",
    year: "2026",
    isMoonSighted: false,
    description: "Holy Saturday before Easter Sunday."
  },
  {
    id: "rh-12",
    date: "2026-04-05",
    day: "Sunday",
    title: "Maharishi Kashyap & Nishadraj Jayanti",
    category: "RH",
    categoryName: "Restricted Holiday",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200/80",
    dotColor: "bg-purple-500",
    month: "April",
    year: "2026",
    isMoonSighted: false,
    description: "Birth anniversaries of Maharishi Kashyap and Maharaja Nishadraj."
  },
  {
    id: "rh-13",
    date: "2026-04-06",
    day: "Monday",
    title: "Easter Monday",
    category: "RH",
    categoryName: "Restricted Holiday",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200/80",
    dotColor: "bg-purple-500",
    month: "April",
    year: "2026",
    isMoonSighted: false,
    description: "Day following Easter Sunday."
  },
  {
    id: "rh-14",
    date: "2026-04-17",
    day: "Friday",
    title: "Chandra Shekhar Jayanti",
    category: "RH",
    categoryName: "Restricted Holiday",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200/80",
    dotColor: "bg-purple-500",
    month: "April",
    year: "2026",
    isMoonSighted: false,
    description: "Birth anniversary of former Prime Minister Chandra Shekhar."
  },
  {
    id: "rh-15",
    date: "2026-04-19",
    day: "Sunday",
    title: "Parshuram Jayanti",
    category: "RH",
    categoryName: "Restricted Holiday",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200/80",
    dotColor: "bg-purple-500",
    month: "April",
    year: "2026",
    isMoonSighted: false,
    description: "Birth anniversary of Lord Parshuram."
  },
  {
    id: "rh-16",
    date: "2026-05-09",
    day: "Saturday",
    title: "Maharana Pratap Jayanti",
    category: "RH",
    categoryName: "Restricted Holiday",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200/80",
    dotColor: "bg-purple-500",
    month: "May",
    year: "2026",
    isMoonSighted: false,
    description: "Birth anniversary of Lok Nayak Maharana Pratap."
  },
  {
    id: "rh-17",
    date: "2026-05-28",
    day: "Thursday",
    title: "Id-ul-Zuha (Bakrid Second Day)",
    category: "RH",
    categoryName: "Restricted Holiday",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200/80",
    dotColor: "bg-purple-500",
    month: "May",
    year: "2026",
    isMoonSighted: true,
    description: "Second day of Bakrid."
  },
  {
    id: "rh-18",
    date: "2026-06-25",
    day: "Thursday",
    title: "Muharram (Eve)",
    category: "RH",
    categoryName: "Restricted Holiday",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200/80",
    dotColor: "bg-purple-500",
    month: "June",
    year: "2026",
    isMoonSighted: true,
    description: "Eve of Muharram observance."
  },
  {
    id: "rh-19",
    date: "2026-08-04",
    day: "Tuesday",
    title: "Chehallum",
    category: "RH",
    categoryName: "Restricted Holiday",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200/80",
    dotColor: "bg-purple-500",
    month: "August",
    year: "2026",
    isMoonSighted: true,
    description: "40th day observance following Ashura."
  },
  {
    id: "rh-20",
    date: "2026-09-17",
    day: "Thursday",
    title: "Vishwakarma Puja",
    category: "RH",
    categoryName: "Restricted Holiday",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200/80",
    dotColor: "bg-purple-500",
    month: "September",
    year: "2026",
    isMoonSighted: false,
    description: "Worship of Lord Vishwakarma, divine architect."
  },
  {
    id: "rh-21",
    date: "2026-09-25",
    day: "Friday",
    title: "Anant Chaturdashi",
    category: "RH",
    categoryName: "Restricted Holiday",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200/80",
    dotColor: "bg-purple-500",
    month: "September",
    year: "2026",
    isMoonSighted: false,
    description: "Festival dedicated to Lord Ananta and Ganesh Visarjan."
  },
  {
    id: "rh-22",
    date: "2026-10-11",
    day: "Sunday",
    title: "Maharaja Agrasen Jayanti",
    category: "RH",
    categoryName: "Restricted Holiday",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200/80",
    dotColor: "bg-purple-500",
    month: "October",
    year: "2026",
    isMoonSighted: false,
    description: "Birth anniversary of Maharaja Agrasen."
  },
  {
    id: "rh-23",
    date: "2026-10-19",
    day: "Monday",
    title: "Dussehra (Maha Ashtami)",
    category: "RH",
    categoryName: "Restricted Holiday",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200/80",
    dotColor: "bg-purple-500",
    month: "October",
    year: "2026",
    isMoonSighted: false,
    description: "Durga Maha Ashtami festival."
  },
  {
    id: "rh-24",
    date: "2026-10-26",
    day: "Monday",
    title: "Maharishi Valmiki Jayanti",
    category: "RH",
    categoryName: "Restricted Holiday",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200/80",
    dotColor: "bg-purple-500",
    month: "October",
    year: "2026",
    isMoonSighted: false,
    description: "Birth anniversary of Sage Valmiki."
  },
  {
    id: "rh-25",
    date: "2026-10-31",
    day: "Saturday",
    title: "Sardar Patel & Acharya Narendra Dev Jayanti",
    category: "RH",
    categoryName: "Restricted Holiday",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200/80",
    dotColor: "bg-purple-500",
    month: "October",
    year: "2026",
    isMoonSighted: false,
    description: "National Unity Day & Acharya Narendra Dev Jayanti."
  },
  {
    id: "rh-26",
    date: "2026-11-08",
    day: "Sunday",
    title: "Narak Chaturdashi",
    category: "RH",
    categoryName: "Restricted Holiday",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200/80",
    dotColor: "bg-purple-500",
    month: "November",
    year: "2026",
    isMoonSighted: false,
    description: "Choti Diwali celebration."
  },
  {
    id: "rh-27",
    date: "2026-11-15",
    day: "Sunday",
    title: "Chhath Puja",
    category: "RH",
    categoryName: "Restricted Holiday",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200/80",
    dotColor: "bg-purple-500",
    month: "November",
    year: "2026",
    isMoonSighted: false,
    description: "Sun God worship festival."
  },
  {
    id: "rh-28",
    date: "2026-11-16",
    day: "Monday",
    title: "Veerangana Uda Devi Martyrdom Day",
    category: "RH",
    categoryName: "Restricted Holiday",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200/80",
    dotColor: "bg-purple-500",
    month: "November",
    year: "2026",
    isMoonSighted: false,
    description: "Commemoration of freedom fighter Uda Devi's martyrdom."
  },
  {
    id: "rh-29",
    date: "2026-12-16",
    day: "Wednesday",
    title: "Khwaja Garib Nawaz Urs",
    category: "RH",
    categoryName: "Restricted Holiday",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200/80",
    dotColor: "bg-purple-500",
    month: "December",
    year: "2026",
    isMoonSighted: true,
    description: "Urs of Hazrat Khwaja Moinuddin Chishti Ajmeri."
  },
  {
    id: "rh-30",
    date: "2026-12-23",
    day: "Wednesday",
    title: "Chaudhary Charan Singh Jayanti (Kisan Diwas)",
    category: "RH",
    categoryName: "Restricted Holiday",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200/80",
    dotColor: "bg-purple-500",
    month: "December",
    year: "2026",
    isMoonSighted: false,
    description: "National Farmers' Day / Birth anniversary of former PM Chaudhary Charan Singh."
  },
  {
    id: "rh-31",
    date: "2026-12-24",
    day: "Thursday",
    title: "Christmas Eve",
    category: "RH",
    categoryName: "Restricted Holiday",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200/80",
    dotColor: "bg-purple-500",
    month: "December",
    year: "2026",
    isMoonSighted: false,
    description: "Christmas Eve observance."
  },

  // --- 3. EXECUTIVE ORDER HOLIDAY (1 Day) ---
  {
    id: "eo-1",
    date: "2026-11-24",
    day: "Tuesday",
    title: "Guru Tegh Bahadur Martyrdom Day",
    category: "EO",
    categoryName: "Executive Order",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200/80",
    dotColor: "bg-blue-500",
    month: "November",
    year: "2026",
    isMoonSighted: false,
    description: "Martyrdom day of the Ninth Sikh Guru, Guru Tegh Bahadur Ji."
  },

  // --- 4. LOCAL DM HOLIDAYS (3 Days) ---
  {
    id: "lh-1",
    date: "2026-03-03",
    day: "Tuesday",
    title: "Holi (Local Holiday)",
    category: "LH",
    categoryName: "Local DM Holiday",
    badgeColor: "bg-amber-50 text-amber-800 border-amber-200/80",
    dotColor: "bg-amber-500",
    month: "March",
    year: "2026",
    isMoonSighted: false,
    description: "Approved by District Magistrate, Gautam Buddha Nagar."
  },
  {
    id: "lh-2",
    date: "2026-08-11",
    day: "Tuesday",
    title: "Shravan Maas Shivratri (Jalabhisheka)",
    category: "LH",
    categoryName: "Local DM Holiday",
    badgeColor: "bg-amber-50 text-amber-800 border-amber-200/80",
    dotColor: "bg-amber-500",
    month: "August",
    year: "2026",
    isMoonSighted: false,
    description: "Approved by DM Gautam Buddha Nagar for Shravan Shivratri."
  },
  {
    id: "lh-3",
    date: "2026-09-09",
    day: "Wednesday",
    title: "Guru Dronacharya Fair (Dankaur Mela)",
    category: "LH",
    categoryName: "Local DM Holiday",
    badgeColor: "bg-amber-50 text-amber-800 border-amber-200/80",
    dotColor: "bg-amber-500",
    month: "September",
    year: "2026",
    isMoonSighted: false,
    description: "Approved by DM Gautam Buddha Nagar for Dankaur Fair."
  }
];

const MONTHS = [
  "All Months",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const ListOfHolidays = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("ALL"); // ALL, GH, RH, EO, LH
  const [selectedMonth, setSelectedMonth] = useState("All Months");
  const [viewMode, setViewMode] = useState("table"); // table (default), card

  // Stats computation
  const stats = useMemo(() => {
    const totalGH = HOLIDAYS_DATA.filter((h) => h.category === "GH").length;
    const totalRH = HOLIDAYS_DATA.filter((h) => h.category === "RH").length;
    const totalEO = HOLIDAYS_DATA.filter((h) => h.category === "EO").length;
    const totalLH = HOLIDAYS_DATA.filter((h) => h.category === "LH").length;
    const totalCount = HOLIDAYS_DATA.length;
    return { totalGH, totalRH, totalEO, totalLH, totalCount };
  }, []);

  // Filter logic
  const filteredHolidays = useMemo(() => {
    return HOLIDAYS_DATA.filter((item) => {
      if (activeTab !== "ALL" && item.category !== activeTab) {
        return false;
      }
      if (selectedMonth !== "All Months" && item.month !== selectedMonth) {
        return false;
      }
      if (searchTerm.trim() !== "") {
        const query = searchTerm.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesMonth = item.month.toLowerCase().includes(query);
        const matchesDay = item.day.toLowerCase().includes(query);
        const matchesCat = item.categoryName.toLowerCase().includes(query);
        return (
          matchesTitle ||
          matchesDesc ||
          matchesMonth ||
          matchesDay ||
          matchesCat
        );
      }
      return true;
    });
  }, [activeTab, selectedMonth, searchTerm]);

  // Date formatting
  const formatDateDisplay = (dateStr) => {
    const d = new Date(dateStr);
    const options = { month: "short", day: "numeric", year: "numeric" };
    return d.toLocaleDateString("en-US", options);
  };

  return (
    <SearchableWrapper>
      <div className="min-h-screen bg-slate-50/70 font-sans text-slate-800 pb-16">
        {/* Banner */}
        <BannerSection
          title="List of Holidays 2026"
          subtitle="Official Gautam Buddha University Holiday Calendar & Gazetted Schedules"
          bgTheme={6}
        />

        <div className="container mx-auto px-3.5 sm:px-6 max-w-7xl pt-6 sm:pt-10 relative z-10">
          {/* Light Theme Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-4 mb-4 sm:mb-8">
            {/* Total Holidays (Card #1) */}
            <div className="bg-white rounded-2xl p-3.5 sm:p-5 border border-slate-200/80 shadow-xs flex items-center justify-between col-span-2 sm:col-span-1">
              <div>
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Total Holidays
                </span>
                <span className="text-xl sm:text-3xl font-extrabold text-slate-900 mt-0.5 block">
                  {stats.totalCount}
                </span>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                <CalendarDays className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>

            {/* Public (Card #2) */}
            <div className="bg-white rounded-2xl p-3 sm:p-5 border border-emerald-200/80 shadow-xs flex items-center justify-between col-span-1">
              <div>
                <span className="text-[10px] sm:text-[11px] font-extrabold text-emerald-700 uppercase tracking-wider block truncate">
                  Public
                </span>
                <span className="text-lg sm:text-3xl font-black text-slate-900 mt-0.5 block">
                  {stats.totalGH} <span className="text-[10px] sm:text-xs font-semibold text-emerald-600">Days</span>
                </span>
              </div>
              <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
              </div>
            </div>

            {/* Restricted (Card #3) */}
            <div className="bg-white rounded-2xl p-3 sm:p-5 border border-purple-200/80 shadow-xs flex items-center justify-between col-span-1">
              <div>
                <span className="text-[10px] sm:text-[11px] font-extrabold text-purple-700 uppercase tracking-wider block truncate">
                  Restricted
                </span>
                <span className="text-lg sm:text-3xl font-black text-slate-900 mt-0.5 block">
                  {stats.totalRH} <span className="text-[9px] sm:text-xs font-semibold text-purple-600">(Opt 2)</span>
                </span>
              </div>
              <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <Sparkles className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
              </div>
            </div>

            {/* Executive (Card #4) */}
            <div className="bg-white rounded-2xl p-3 sm:p-5 border border-blue-200/80 shadow-xs flex items-center justify-between col-span-1">
              <div>
                <span className="text-[10px] sm:text-[11px] font-extrabold text-blue-700 uppercase tracking-wider block truncate">
                  Executive
                </span>
                <span className="text-lg sm:text-3xl font-black text-slate-900 mt-0.5 block">
                  {stats.totalEO} <span className="text-[10px] sm:text-xs font-semibold text-blue-600">Day</span>
                </span>
              </div>
              <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
              </div>
            </div>

            {/* Local DM (Card #5) */}
            <div className="bg-white rounded-2xl p-3 sm:p-5 border border-amber-200/80 shadow-xs flex items-center justify-between col-span-1">
              <div>
                <span className="text-[10px] sm:text-[11px] font-extrabold text-amber-700 uppercase tracking-wider block truncate">
                  Local DM
                </span>
                <span className="text-lg sm:text-3xl font-black text-slate-900 mt-0.5 block">
                  {stats.totalLH} <span className="text-[10px] sm:text-xs font-semibold text-amber-600">Days</span>
                </span>
              </div>
              <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <MapPin className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
              </div>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="bg-white rounded-2xl p-3 sm:p-5 border border-slate-200/80 shadow-xs mb-5 sm:mb-6 space-y-3 sm:space-y-4">
            {/* Scrollable Category Filter Pills for Mobile */}
            <div className="overflow-x-auto pb-0.5 max-w-full flex items-center gap-1.5 scrollbar-none sm:scrollbar-thin">
              <button
                onClick={() => setActiveTab("ALL")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeTab === "ALL"
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                All ({stats.totalCount})
              </button>
              <button
                onClick={() => setActiveTab("GH")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeTab === "GH"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-emerald-50/70 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/60"
                }`}
              >
                Public ({stats.totalGH})
              </button>
              <button
                onClick={() => setActiveTab("RH")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeTab === "RH"
                    ? "bg-purple-600 text-white shadow-sm"
                    : "bg-purple-50/70 hover:bg-purple-100 text-purple-800 border border-purple-200/60"
                }`}
              >
                Restricted ({stats.totalRH})
              </button>
              <button
                onClick={() => setActiveTab("EO")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeTab === "EO"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-blue-50/70 hover:bg-blue-100 text-blue-800 border border-blue-200/60"
                }`}
              >
                Executive ({stats.totalEO})
              </button>
              <button
                onClick={() => setActiveTab("LH")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeTab === "LH"
                    ? "bg-amber-600 text-white shadow-sm"
                    : "bg-amber-50/70 hover:bg-amber-100 text-amber-800 border border-amber-200/60"
                }`}
              >
                Local DM ({stats.totalLH})
              </button>
            </div>

            {/* Inputs & View Switcher */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search holiday name, date, month..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-300/80 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-500 transition-all"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Month Dropdown & View Switcher */}
              <div className="flex items-center gap-2 justify-between sm:justify-start">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="flex-1 sm:flex-none px-3 py-2 bg-slate-50 border border-slate-300/80 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  {MONTHS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>

                {/* View Switcher */}
                <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/60 shrink-0">
                  <button
                    onClick={() => setViewMode("table")}
                    className={`p-1.5 rounded-lg transition-all ${
                      viewMode === "table"
                        ? "bg-white text-blue-600 shadow-xs font-bold"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                    title="Table View"
                  >
                    <ListIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("card")}
                    className={`p-1.5 rounded-lg transition-all ${
                      viewMode === "card"
                        ? "bg-white text-blue-600 shadow-xs font-bold"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                    title="Card View"
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs sm:text-sm font-semibold text-slate-600">
              Showing <strong className="text-slate-900">{filteredHolidays.length}</strong> holiday entries
              {selectedMonth !== "All Months" ? ` (${selectedMonth})` : ""}
              {activeTab !== "ALL" ? ` [${activeTab}]` : ""}
            </span>
            {(searchTerm || selectedMonth !== "All Months" || activeTab !== "ALL") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedMonth("All Months");
                  setActiveTab("ALL");
                }}
                className="text-xs text-blue-600 hover:text-blue-800 font-bold underline"
              >
                Reset Filters
              </button>
            )}
          </div>

          {/* MAIN CONTENT AREA */}
          {filteredHolidays.length === 0 ? (
            <div className="text-center py-12 sm:py-16 bg-white rounded-2xl border border-slate-200">
              <CalendarIcon className="w-10 h-10 sm:w-12 sm:h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-sm sm:text-base font-bold text-slate-800 mb-1">No Holidays Found</h3>
              <p className="text-slate-500 text-xs">Try adjusting your search terms or filter selections.</p>
            </div>
          ) : viewMode === "table" ? (
            <div className="mb-8 sm:mb-10">
              {/* MOBILE ZERO-SCROLL COMPACT LIST VIEW (< 640px) */}
              <div className="block sm:hidden space-y-2.5">
                {filteredHolidays.map((item, idx) => {
                  const d = new Date(item.date);
                  const monthName = d.toLocaleString("en-US", { month: "short" });
                  const dayNum = d.getDate();
                  const dayName = item.day.slice(0, 3);

                  return (
                    <div
                      key={item.id}
                      className="bg-white p-3 rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between gap-3 hover:border-blue-300 transition-all"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Date Badge Stack */}
                        <div className="w-12 text-center shrink-0 bg-blue-50/80 border border-blue-100/90 p-1.5 rounded-xl">
                          <span className="text-[10px] font-extrabold text-blue-600 uppercase block tracking-wider leading-none">
                            {monthName}
                          </span>
                          <span className="text-base font-black text-slate-900 leading-none mt-1 block">
                            {dayNum}
                          </span>
                          <span className="text-[9px] font-bold text-slate-500 block leading-none mt-0.5">
                            {dayName}
                          </span>
                        </div>

                        {/* Title & Badges */}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 flex-wrap mb-1">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${item.badgeColor}`}>
                              {item.categoryName}
                            </span>
                            {item.isMoonSighted && (
                              <span className="text-[9px] font-bold bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded border border-indigo-200 inline-flex items-center gap-0.5">
                                <Moon className="w-2.5 h-2.5 text-indigo-600" />
                                <span>*Moon</span>
                              </span>
                            )}
                          </div>
                          <h4 className="text-xs font-bold text-slate-900 leading-snug break-words">
                            {item.title}
                          </h4>
                        </div>
                      </div>

                      {/* Serial Number */}
                      <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-md shrink-0">
                        #{idx + 1}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* DESKTOP TABLE VIEW (≥ 640px) */}
              <div className="hidden sm:block bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-900 text-white text-xs font-bold tracking-wider">
                        <th className="py-3.5 px-4 text-center w-12 border-b border-slate-800">S.No.</th>
                        <th className="py-3.5 px-5 border-b border-slate-800 whitespace-nowrap">Date</th>
                        <th className="py-3.5 px-4 border-b border-slate-800 whitespace-nowrap">Day of Week</th>
                        <th className="py-3.5 px-6 border-b border-slate-800">Holiday / Event Name</th>
                        <th className="py-3.5 px-5 border-b border-slate-800 whitespace-nowrap">Category</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs sm:text-sm text-slate-700 font-medium">
                      {filteredHolidays.map((item, idx) => (
                        <tr
                          key={item.id}
                          className="hover:bg-blue-50/40 transition-colors"
                        >
                          <td className="py-3.5 px-4 text-center font-bold text-slate-400 text-xs">
                            {idx + 1}
                          </td>
                          <td className="py-3.5 px-5 font-bold text-blue-700 whitespace-nowrap text-xs sm:text-sm">
                            {formatDateDisplay(item.date)}
                          </td>
                          <td className="py-3.5 px-4 font-bold text-slate-800 whitespace-nowrap text-xs sm:text-sm">
                            {item.day}
                          </td>
                          <td className="py-3.5 px-6 font-bold text-slate-900 text-xs sm:text-sm">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span>{item.title}</span>
                              {item.isMoonSighted && (
                                <span
                                  className="text-[10px] font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-200 inline-flex items-center gap-1"
                                  title="Subject to local moon sighting"
                                >
                                  <Moon className="w-3 h-3 text-indigo-600" />
                                  <span>*Moon Sight</span>
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-3.5 px-5 whitespace-nowrap">
                            <span
                              className={`text-xs font-bold px-3 py-1 rounded-full border inline-flex items-center gap-1.5 ${item.badgeColor}`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${item.dotColor}`}></span>
                              {item.categoryName}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            /* CARD VIEW */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-8 sm:mb-10">
              {filteredHolidays.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 hover:border-blue-400 hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 sm:py-1 rounded-full border inline-flex items-center gap-1.5 ${item.badgeColor}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${item.dotColor}`}></span>
                        {item.categoryName}
                      </span>
                      {item.isMoonSighted && (
                        <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-200 inline-flex items-center gap-1">
                          <Moon className="w-3 h-3 text-indigo-600" />
                          <span>*Moon Sight</span>
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1.5">
                      {item.title}
                    </h3>

                    <p className="text-slate-600 text-xs leading-relaxed mb-3">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                    <div className="text-blue-700 flex items-center gap-1.5">
                      <CalendarIcon className="w-3.5 h-3.5 text-blue-600" />
                      <span>{formatDateDisplay(item.date)}</span>
                    </div>
                    <span className="text-slate-700 bg-slate-100 px-2.5 py-0.5 sm:py-1 rounded-lg font-semibold">
                      {item.day}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* DOWNLOAD HOLIDAY LIST BUTTON */}
          <div className="flex justify-center sm:justify-start mb-6">
            <a
              href="https://drive.google.com/file/d/1HybU2q30VtmToiYTP1UGkXeJJtwYrYWl/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm sm:text-base rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <Download className="w-5 h-5" />
              <span>Download Official Holiday List PDF</span>
            </a>
          </div>
        </div>
      </div>
    </SearchableWrapper>
  );
};

export default ListOfHolidays;
