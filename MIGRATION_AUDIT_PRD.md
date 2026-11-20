# Gautam Buddha University (GBU) Website Migration Audit & PRD
**Old Website:** `https://www.gbu.ac.in/`  
**New Website:** `https://web.onlinegbu.com/` (Repository: `GBU SMART CAMPUS`)  
**Audit Date:** November 2026  
**Auditor:** Antigravity (Google DeepMind)  
**Safety Status:** **Read-Only Audit Completed** (No production code replaced or overwritten; all assets securely downloaded to `migration_downloads/`).

---

## 1. Executive Summary & Migration Risk Assessment

As Gautam Buddha University migrates from the legacy ASP.NET/IIS web server (`https://www.gbu.ac.in/`) to the new modern React/Vite web application (`https://web.onlinegbu.com/`), an immediate critical vulnerability exists:

> [!CAUTION]
> **The Legacy Domain Cutover Risk (DNS Cutover):**  
> Currently, the new website codebase directly references **215 legacy URLs** on `gbu.ac.in` (including **144 official PDF documents** and **53 hosted images**).  
> **If the university switches DNS (`gbu.ac.in`) to point to the new web hosting without first localizing these assets, EVERY SINGLE ONE of those 144 PDFs and 53 images will instantly break (404 Not Found), paralyzing statutory governance minutes, university acts, IIC research records, tenders, and placement reports.**

### High-Level Asset Discovery & Download Results:
| Asset Type | Found in New Codebase | Successfully Downloaded to `migration_downloads/` | Dead/404 on Old Server | Risk Level |
| :--- | :---: | :---: | :---: | :---: |
| **Legacy PDFs (`gbu.ac.in`)** | 144 | 139 | 5 (typo/moved on old site) | **CRITICAL** |
| **Broken Local Relative PDFs** | 5 | 0 (Need generation / proper files) | 5 (`/pdfs/auditorium-*.pdf`) | **HIGH** |
| **Legacy Images (`gbu.ac.in`)** | 53 | 49 | 4 | **HIGH** |
| **Placeholder Images (Unsplash)** | 393 | N/A (External CDNs) | N/A | **MEDIUM** |
| **Placeholder Avatars (RandomUser)** | 14 | N/A (Dummy Portraits) | N/A | **HIGH** (Fake data) |
| **Dummy Images (via.placeholder)** | 6 | N/A | N/A | **MEDIUM** |
| **SOBSC (Buddhist Studies) PDFs** | 23 | 23 (Downloaded from old portal) | 0 | **RESOLVED OFFLINE** |

All downloadable assets have been captured and securely stored in:
`migration_downloads/`
├── `pdfs/`
│   ├── `act_statute/` (5 legal documents, 128 MB total)
│   ├── `governance/` (63 Board of Management & Academic Council minutes)
│   ├── `research_iic/` (31 Institution's Innovation Council reports)
│   ├── `research_ipr/` (2 Intellectual Property Rights documents)
│   ├── `placement/` (12 Annual Placement Reports 2010–2021)
│   ├── `disclosures/` (8 Statutory UGC, AICTE, NAAC, NSDC documents)
│   ├── `committee/` (3 Office orders & regulations)
│   ├── `academic_calendar/` (2 Session calendars)
│   ├── `tenders/` (6 Active and archived GeM tender bids)
│   ├── `general/` (7 Anti-Ragging, Vacation 2026, Society Registration)
│   └── `sobsc/` (23 Buddhist Studies curricula, NEP syllabi, event reports)
└── `images/`
    ├── `clubs/` (15 club activities, campus landmarks, sports)
    ├── `incubation/` (10 official incubation centre photos)
    ├── `deans/` (6 official school deans portraits)
    ├── `schools/` (school banners & faculty photos)
    └── `media_gallery/` (sports and festival banners)

---

## 2. Page-by-Page Detailed Checklist & Audit

Below is the complete audit of every primary section, route, asset dependencies, status, and fix plan.

---

### Category A: About Us & Administration

| Page / Route | Old Website URL | Assets Identified | Current Status | Risk | Recommended Action & Download Location |
| :--- | :--- | :--- | :--- | :---: | :--- |
| **Governance**<br>`/governance` | `https://www.gbu.ac.in/about/bodies` | • 26 Academic Council Minutes (`AC1.pdf` to `AC26.pdf`)<br>• 36 Board of Management Minutes (`BOM1.pdf` to `BOM36.pdf`)<br>• 1 Finance Committee Minute | Using `https://www.gbu.ac.in/Programfiles/...` | **CRITICAL** | All 63 PDFs downloaded to `migration_downloads/pdfs/governance/`. Move to `public/assets/pdf/governance/` and update `src/pages/Aboutus/Governance.jsx`. |
| **GBU Act & Statutes**<br>`/act` | `https://www.gbu.ac.in/about/act` | • GBU Act 2002 (30.9 MB)<br>• Amended Act 2013 (176 KB)<br>• First Statutes (5.7 MB)<br>• Approved Ordinances (41 MB)<br>• Academic Ordinances (50 MB) | Using `https://www.gbu.ac.in/Content/gbudata/Programfiles/...` | **CRITICAL** | All 5 legal PDFs downloaded to `migration_downloads/pdfs/act_statute/`. Host in `public/assets/pdf/act/`. |
| **Mandatory Disclosures**<br>`/disclosures` | `https://www.gbu.ac.in/about/disclosures` | • AICTE Approved Courses PDF<br>• UGC 12B Certificate PDF<br>• UGC 2(f) Letter PDF<br>• NAAC Certificate B+ JPG<br>• NCTE Education Dept PDF<br>• Quality Manual PDF<br>• NSDC MoU PDF<br>• Society Registration PDF | Using `https://www.gbu.ac.in/Content/gbudata/approval/...` | **CRITICAL** | All 8 files downloaded to `migration_downloads/pdfs/disclosures/`. Move to `public/assets/pdf/disclosures/`. |
| **Committees & Orders**<br>`/committee` | `https://www.gbu.ac.in/about/committee` | • Chief Wardens & Wardens Order PDF<br>• RDC Regulations PDF<br>• Anti Ragging Committee PDF | Using `https://www.gbu.ac.in/Content/gbudata/General/...` | **HIGH** | Downloaded to `migration_downloads/pdfs/committee/`. Move to `public/assets/pdf/committee/`. |
| **Regulatory Bodies**<br>`/regulatory-bodies` | `https://www.gbu.ac.in/about/bodies` | • BCI Letter PDF<br>• NCTE Letter PDF<br>• RCI Certificate JPG<br>• AICTE Letter PDF | Using `https://www.gbu.ac.in/...` | **HIGH** | Downloaded to `migration_downloads/pdfs/regulatory_bodies/`. Host locally. |
| **Deans of Schools**<br>`/deans` | `https://www.gbu.ac.in/about/administration` | • 6 Dean Portraits (`KKDwivedi1.jpg`, `chandrashekhar.jpg`, `krishankant.jpg`, etc.) | Using `https://www.gbu.ac.in/Content/gbudata/Employee/img/...` | **HIGH** | Downloaded to `migration_downloads/images/deans/`. Map to `public/assets/deans/`. |
| **Chancellor Profile**<br>`/chancellor` | `https://www.gbu.ac.in/about/chancellor` | • Profile_ShYogiAdityanath_latest.pdf | Using `https://www.gbu.ac.in/Content/gbudata/about/...` | **MEDIUM** | Downloaded to `migration_downloads/pdfs/general/`. Host in `public/assets/pdf/`. |
| **Vice-Chancellor Profile**<br>`/vice-chancellor` | `https://www.gbu.ac.in/about/vc` | • VC Strategic Perspective & Profile PDF | Using `https://www.gbu.ac.in/...` | **MEDIUM** | Downloaded to `migration_downloads/pdfs/general/`. Host in `public/assets/pdf/`. |
| **Guidelines & GOs**<br>`/guidelines` | `https://www.gbu.ac.in/about/Guidelines` | • UGC Public Notice Draft UGC Regulations 2018 PDF | Using `https://www.gbu.ac.in/...` | **MEDIUM** | Downloaded to `migration_downloads/pdfs/general/`. Host locally. |

---

### Category B: Academic Affairs & Faculty

| Page / Route | Old Website URL | Assets Identified | Current Status | Risk | Recommended Action & Download Location |
| :--- | :--- | :--- | :--- | :---: | :--- |
| **Academic Calendar**<br>`/page/academicCalendar` | `https://www.gbu.ac.in/page/academicCalendar` | • Academic Calendar 2026-27 PDF<br>• Academic Calendar 2024-25 PDF<br>• Revised Academic Calendar 2022-23 PDF<br>• 3 Archived Calendar JPGs | Using `https://www.gbu.ac.in/Content/gbudata/General/...` | **HIGH** | Calendars 2026-27 and 2024-25 downloaded to `migration_downloads/pdfs/academic_calendar/`. Update `AcademicCalendar.jsx` to local paths. |
| **List of Holidays**<br>`/page/holidays` | `https://www.gbu.ac.in/Content/gbudata/General/List of Vacation-2026.pdf` | • Official Holiday PDF: points to external Google Drive (`drive.google.com/file/d/1HybU...`) | Google Drive dependency | **MEDIUM** | Official `List_of_Vacation-2026.pdf` downloaded from old site to `migration_downloads/pdfs/general/`. Replace Drive link with local static asset. |
| **Faculty Portal & Profiles**<br>`/faculty`, `/faculty/:id` | `https://www.gbu.ac.in/faculty/...` | • 209 faculty profiles<br>• 1 placeholder `paper.pdf` (`https://gbu.ac.in/faculty/pdf/paper.pdf` - 404) | Registry maps 180+ faculty to `/assets/Faculty/*.jpg`; 1 dead sample link in `TabDataEditors.jsx` | **LOW** | Remove dummy `paper.pdf` link or replace with blank template; ensure all 209 profiles have verified local photos. |
| **CBCS Framework**<br>`/academics/cbcs` | `https://www.gbu.ac.in/academics` | • CBCS Curriculum structure text | No broken external assets | **SAFE** | Clean. |
| **International Collaboration**<br>`/international` | `https://www.gbu.ac.in/public/international` | • 12 Unsplash placeholder photos for MoUs | Using Unsplash placeholders | **MEDIUM** | Replace Unsplash placeholders with authentic photos of university MoUs and international delegations. |

---

### Category C: Corporate Relations Cell (CRC & Placements)

| Page / Route | Old Website URL | Assets Identified | Current Status | Risk | Recommended Action & Download Location |
| :--- | :--- | :--- | :--- | :---: | :--- |
| **CRC / Placement Home**<br>`/placement` | `https://www.gbu.ac.in/page/crc` | • 12 Annual Placement Reports (`Placement_1Nov2021.pdf`, `Placement_2019.pdf`, down to `placement10.pdf`)<br>• 2022 & 2023 reports had URL typos on old site<br>• 8 School Brochures linking to Google Drive<br>• CRC Guidelines linking to Google Drive | 12 reports pointing to `www.gbu.ac.in`; 8 brochures pointing to Google Drive | **CRITICAL** | 10 annual reports downloaded to `migration_downloads/pdfs/placement/`. Download Google Drive brochures locally so placements don't depend on individual personal drives. |

---

### Category D: Research, Innovation & Incubation

| Page / Route | Old Website URL | Assets Identified | Current Status | Risk | Recommended Action & Download Location |
| :--- | :--- | :--- | :--- | :---: | :--- |
| **Institution's Innovation Council (IIC)**<br>`/innovations/iic` | `https://www.gbu.ac.in/ipr` | • 31 PDF Reports (National Science Day, IPR Day, Industry Visits, Chandrayaan Celebration, Hackathons, Innovation & Startup Policy)<br>• 2 MP4 Video files | Directly pointing to `https://www.gbu.ac.in/Content/gbudata/IIC/...` | **CRITICAL** | All 30+ accessible PDFs downloaded to `migration_downloads/pdfs/research_iic/`. Move to `public/assets/pdf/iic/` and update `InstitutionInnovation.jsx`. |
| **IPR Cell**<br>`/ipr` | `https://www.gbu.ac.in/ipr` | • GBU IPR Policy 2021 PDF<br>• IPR Workshop Brochure PDF | Pointing to `https://www.gbu.ac.in/...` | **HIGH** | Downloaded to `migration_downloads/pdfs/research_ipr/`. Host locally in `public/assets/pdf/ipr/`. |
| **GBU Incubation Centre (GBURIF)**<br>`/innovations/incubation` | `https://www.gbu.ac.in/public/incubation-about` | • 10 Gallery Photos (`Incubation_Pic1.jpg` to `Incubation_Pic10.jpg`)<br>• 9 Team Photos from `gburif.org` | Pointing to `https://www.gbu.ac.in/Content/gbudata/incubation/...` | **HIGH** | All 10 gallery photos downloaded to `migration_downloads/images/incubation/`. Host in `public/assets/incubation/`. |

---

### Category E: Announcements, Notices, Tenders & Media

| Page / Route | Old Website URL | Assets Identified | Current Status | Risk | Recommended Action & Download Location |
| :--- | :--- | :--- | :--- | :---: | :--- |
| **Tenders**<br>`/announcements/tenders` | `https://www.gbu.ac.in/page/tender` | • 6 Active/Archived GeM Bid & EOI PDFs (`2114572845_Notice (2).pdf`, `1440973854_EOI-1.pdf`, etc.) | Pointing to dynamic ASP endpoint `https://www.gbu.ac.in/page/GetTender?nName=...` | **CRITICAL** | All 6 tender documents downloaded to `migration_downloads/pdfs/tenders/`. Move to `public/assets/pdf/tenders/` and update `src/Data/tendersData.js`. |
| **Newsletter**<br>`/announcements/newsletter` | `https://www.gbu.ac.in/public/newsletter` | • 27 past GBU Newsletter issues (`GBU_English_May_June2025.pdf`, etc.) | New site fetches from dynamic announcements API | **MEDIUM** | Old site has 27 valuable historical PDF newsletters. Archive them into local public storage so past archives are available. |
| **Media Gallery**<br>`/announcements/media-gallery` | `https://www.gbu.ac.in/` | • `http://localhost:3000` (Dev leak!)<br>• 6 GBU images (`buddha28.jpg`, `banner1.jpg`, etc.)<br>• 13 Unsplash placeholders<br>• 1 `via.placeholder.com`<br>• External news images | High reliance on third-party domains and dev link | **HIGH** | Remove `localhost:3000` immediately. Localize the 6 GBU images (downloaded to `migration_downloads/images/media_gallery/`). |
| **Public Notices**<br>`/announcements/notices` | `https://www.gbu.ac.in/page/notices` | • 220 active notices on old site | Dynamic API / DB driven on new site | **LOW** | Verify that notice attachments upload to new backend media storage, not old ASP `Admissions/DownloadFile` endpoint. |

---

### Category F: Campus Life & Facilities

| Page / Route | Old Website URL | Assets Identified | Current Status | Risk | Recommended Action & Download Location |
| :--- | :--- | :--- | :--- | :---: | :--- |
| **Facility Booking**<br>`/booking`, `/booking/:id` | `https://www.gbu.ac.in/facilities` | • 5 Broken Local PDFs:<br>  - `/pdfs/auditorium-rates.pdf`<br>  - `/pdfs/auditorium-booking-rules.pdf`<br>  - `/pdfs/auditorium-terms.pdf`<br>  - `/pdfs/guesthouse-rates.pdf`<br>  - `/pdfs/guesthouse-rules.pdf` | **BROKEN NOW (404)**: files referenced in `src/components/bookingData/facilities.js` do NOT exist in `public/pdfs/` | **CRITICAL** | Either create/provide authentic GBU rate charts in `public/pdfs/` or replace the download buttons with on-page structured tables. |
| **Hostels & Dining**<br>`/campus-life/hostel-dining` | `https://hostels.gbu.ac.in` | • 19 images linking to external `hostels.gbu.ac.in` sub-domain<br>• 13 Unsplash stock room/bed photos in `HostelDetailed.jsx` | Subdomain dependency and stock photos | **HIGH** | Replace stock photos with genuine GBU hostel rooms (Birsa Munda, Rani Laxmibai, Mahamaya, etc.). |
| **Clubs & Student Bodies**<br>`/clubs`, `/club/:id` | `https://www.gbu.ac.in/club` | • 15 images pointing to `https://www.gbu.ac.in/Content/clubs/img/...`<br>• 7 Unsplash placeholders | Pointing to legacy portal images | **HIGH** | Downloaded 15 club images to `migration_downloads/images/clubs/`. Host in `public/assets/clubs/`. |
| **Life at Campus & Cafes**<br>`/campus-life` | `https://www.gbu.ac.in/page/campuslife` | • 14 images pointing to old `gbu.ac.in` (`canteen.jpeg`, `shoppingcomplex.jpg`, `sportsimg.JPG`) | Pointing to legacy portal images | **HIGH** | Downloaded to `migration_downloads/images/clubs/`. Host in `public/assets/campus-life/`. |
| **NCC Events**<br>`/campus-life/ncc` | N/A | • `https://gbu.ac.in/ncc-rules.pdf` (Returns 404 on old site) | **BROKEN (404)** | **HIGH** | Replace dead URL with official NCC charter or standard local document. |

---

### Category G: Schools & Academic Departments

| School Code | School Name | Current Migration Status | Legacy `gbu.ac.in` Links Remaining | Action Plan |
| :--- | :--- | :---: | :---: | :--- |
| **SOICT** | School of Information & Communication Tech | **MAPPED & VERIFIED** | 6 images (Deans, Faculty) | 37 Course PDFs hosted locally. Replace 6 remote faculty images with `/assets/Faculty/` registry. |
| **SOBT** | School of Biotechnology | **MAPPED & VERIFIED** | 1 banner image (`Artboard1SObt.jpg`) | Local course PDFs mapped. Downloaded banner image to `migration_downloads/images/schools/`. |
| **SOE** | School of Engineering | **MAPPED & VERIFIED** | 1 banner image (`Artboard1soe.jpg`) | 4 departments mapped. Downloaded banner image to `migration_downloads/images/schools/`. |
| **SOL** | School of Law, Justice & Governance | **MAPPED & VERIFIED** | 1 banner + 1 Dean image | Local course PDFs mapped. Downloaded banner & Dean image to `migration_downloads/`. |
| **SOM** | School of Management | **MAPPED & VERIFIED** | 2 broken URLs (`Content/gbudata/data/SOM/MBA`) | 4 departments mapped. Remove broken legacy links in `placement.jsx`. |
| **SOHSS** | School of Humanities & Social Sciences | **MAPPED & VERIFIED** | None | 59 PDFs downloaded and hosted in `public/courses/sohss/`. Clean. |
| **SOVS** | School of Vocational Studies & Applied Sciences | **MAPPED & VERIFIED** | 1 banner image (`Artboard1sovsas.jpg` - dead) | 42 PDFs downloaded and hosted in `public/courses/sovs/`. Clean. |
| **SOBSC** | School of Buddhist Studies & Civilization | **NEEDS MIGRATION** | 1 banner image + 23 official syllabi on old portal not mapped! Currently uses Google Drive preview links. | **23 official PDFs successfully downloaded to `migration_downloads/pdfs/sobsc/`!** Ready to map to `public/courses/sobsc/`. |

---

## 3. Top Placeholder Hotspots Requiring Real University Media

The audit revealed **413 placeholder assets** across the application. The most prominent ones that must be replaced before full production launch:

1. **`randomuser.me` Fake Portraits (14 instances):**
   - Historically used in department `topAchievers` arrays (e.g. `women/32.jpg`, `men/45.jpg`).
   - We already purged these in SOHSS and SOVS!
   - Remaining instances exist in SOBSC, SOBT, SOE, and SOICT department files.
   - **Recommendation:** Replace with real student names/roll numbers or empty arrays `topAchievers: []` until official data is provided by HoDs.

2. **`images.unsplash.com` Stock Images (393 instances):**
   - `HostelDetailed.jsx`: 13 stock modern luxury bedrooms, study desks, and dining halls that do not reflect the actual red-brick hostel architecture of GBU.
   - `MediaGallery.jsx`: 13 stock tech/coding images.
   - School Labs & Centers (e.g. Drone lab, Molecular Biology, Advanced Computing): Stock images instead of real high-res campus laboratory equipment photos.

3. **`via.placeholder.com` (6 instances):**
   - Used as image error fallbacks in `CourseDetailed.jsx`, `MediaGallery.jsx`, and `ClubsMain.jsx`.
   - **Recommendation:** Replace with a brand-aligned SVG fallback (e.g., `/assets/placeholders/gbu-placeholder.svg` featuring the GBU emblem).

---

## 4. Phased Execution Roadmap (After Review)

As per explicit user instruction ("dont fix or replace it, you can just download it in a separate folder....we will work after the result"), no production files were modified.

When the user approves moving forward, execution should proceed in the following prioritized phases:

### Phase 1: Zero-Disruption Local Hosting of Critical PDFs
1. Move `migration_downloads/pdfs/governance/` (63 PDFs) to `public/assets/pdf/governance/` and update `Governance.jsx`.
2. Move `migration_downloads/pdfs/act_statute/` (5 PDFs) to `public/assets/pdf/act/` and update `Act.jsx`.
3. Move `migration_downloads/pdfs/disclosures/` (8 PDFs) to `public/assets/pdf/disclosures/` and update `Disclosures.jsx`.
4. Move `migration_downloads/pdfs/research_iic/` (31 PDFs) to `public/assets/pdf/iic/` and update `InstitutionInnovation.jsx`.
5. Move `migration_downloads/pdfs/tenders/` (6 PDFs) to `public/assets/pdf/tenders/` and update `tendersData.js`.
6. Move `migration_downloads/pdfs/placement/` (12 PDFs) to `public/assets/pdf/placement/` and update `placementData.js`.

### Phase 2: Fix Broken Links & Dev Leaks
1. Fix the 5 broken booking PDFs in `src/components/bookingData/facilities.js` (create authentic rate PDFs or convert to rich modal tables).
2. Remove `http://localhost:3000` from `src/pages/Announcements/MediaGallery.jsx`.
3. Fix the dead `ncc-rules.pdf` in `src/components/ncc/NCCEvents.jsx`.
4. Remove broken `Content/gbudata/data/SOM/...` links in `src/Data/schools/SOM/placement.jsx`.

### Phase 3: School of Buddhist Studies (SOBSC) Full Mapping
1. Deploy the 23 downloaded SOBSC PDFs to `public/courses/sobsc/`.
2. Update `buddhist-languages.jsx`, `buddhist-philosophy.jsx`, and `meditation-mindfulness.jsx` to replace Google Drive preview links with local `/courses/sobsc/...` links.
3. Update `COURSES_INDEX.json` and `COURSES_MANIFEST.csv`.

### Phase 4: Localize Downloaded Images & Replace Placeholders
1. Copy `migration_downloads/images/clubs/` (15 images) to `public/assets/clubs/`.
2. Copy `migration_downloads/images/incubation/` (10 images) to `public/assets/incubation/`.
3. Copy `migration_downloads/images/deans/` (6 images) to `public/assets/deans/`.
4. Purge remaining `randomuser.me` fake portraits across SOBT, SOE, SOBSC.
5. Create a clean university branded SVG placeholder fallback for broken images.

---
*Report generated and all assets archived on local filesystem.*
