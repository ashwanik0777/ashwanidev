# 📋 Developer Action Plan: Google Drive Links Migration & Local Hosting

> **Purpose:** This file is a ready-to-use, step-by-step migration guide for any developer/coder working on this repository. It provides exact file locations, line numbers, local asset paths, before/after code snippets, and ready-made AI prompts to replace all Google Drive links with zero broken paths.

---

## 🚀 Executive Summary for Developers

- **Total Drive References in Code:** 503 occurrences
- **Actual Unique Files to Download:** **Only 48 unique files** (450 references in `researchPublicationsData.js` point to just **5 unique Research Bulletins**!)
- **Target Storage Directory:** `public/assets/pdf/...`
- **Estimated Time to Fix:** ~15–20 minutes with the prompts below.

---

## 📑 Quick Task Checklist

- [ ] **Task 1:** Localize 5 GBU Research Bulletins (`researchPublicationsData.js` & `Publications.jsx` - 455 occurrences)
- [ ] **Task 2:** Localize University Annual Reports & NIRF (`ReportsPublications.jsx` - 6 occurrences)
- [ ] **Task 3:** Localize SOICT & SOL Placement Brochures (`SOICT/placement.jsx` & `SOL/placement.jsx` - 21 occurrences)
- [ ] **Task 4:** Localize Centers of Excellence (RAEM, Labs, PhD Lists) (15 occurrences)
- [ ] **Task 5:** Purge Dummy/Test Sample Links (`NCCEvents.jsx` - 1 occurrence)

---

## 🔹 Task 1: Research Bulletins (455 References -> 5 Unique PDFs)

**Files Affected:**
1. `src/Data/researchPublicationsData.js` (450 references)
2. `src/pages/Reasearch/researchhighlights/Publications.jsx` (5 references: lines 36, 45, 54, 63, 72)

**Target Folder:** `public/assets/pdf/research/`

### The 5 Unique Bulletin Files:

| # | Occurrences | Current Google Drive URL | Recommended Local Path | Document Title |
| :---: | :---: | :--- | :--- | :--- |
| 1 | **149x** | `https://drive.google.com/file/d/1_6xHxKEKOXyzuCjkFltoixxgS_zh8uxt/view?usp=drive_web` | `/assets/pdf/research/gbu-research-bulletin-2026-vol1.pdf` | GBU Research Bulletin 2026 (Vol 1) |
| 2 | **45x** | `https://drive.google.com/file/d/1Jp80O2TjVckwozZyGKs9S4LTgjCWqKVs/view?usp=drive_web` | `/assets/pdf/research/gbu-research-bulletin-2026-vol2.pdf` | GBU Research Bulletin 2026 (Vol 2) |
| 3 | **84x** | `https://drive.google.com/file/d/1aIwv4M5dqNkesn-EdGKGZvRuK83lWSa5/view?usp=drive_web` | `/assets/pdf/research/gbu-research-bulletin-2025-vol1.pdf` | GBU Research Bulletin 2025 (Vol 1) |
| 4 | **74x** | `https://drive.google.com/file/d/1f6j9Q_s-QWaxVkXVgcNjb7ibMtj0rgbk/view?usp=drive_web` | `/assets/pdf/research/gbu-research-bulletin-2025-vol2.pdf` | GBU Research Bulletin 2025 (Vol 2) |
| 5 | **103x** | `https://drive.google.com/file/d/1vQSD1qBa3dSWYObyrgW-VK32cAmY1tI0/view?usp=drive_web` | `/assets/pdf/research/gbu-research-bulletin-2025-vol3.pdf` | GBU Research Bulletin 2025 (Vol 3) |

### 🤖 Copy-Paste AI Prompt for Task 1:

```text
Please update `src/Data/researchPublicationsData.js` and `src/pages/Reasearch/researchhighlights/Publications.jsx` to replace the 5 repeated Google Drive links with local paths inside `/assets/pdf/research/`:

1. Replace `https://drive.google.com/file/d/1_6xHxKEKOXyzuCjkFltoixxgS_zh8uxt/view?usp=drive_web` with `/assets/pdf/research/gbu-research-bulletin-2026-vol1.pdf`
2. Replace `https://drive.google.com/file/d/1Jp80O2TjVckwozZyGKs9S4LTgjCWqKVs/view?usp=drive_web` with `/assets/pdf/research/gbu-research-bulletin-2026-vol2.pdf`
3. Replace `https://drive.google.com/file/d/1aIwv4M5dqNkesn-EdGKGZvRuK83lWSa5/view?usp=drive_web` with `/assets/pdf/research/gbu-research-bulletin-2025-vol1.pdf`
4. Replace `https://drive.google.com/file/d/1f6j9Q_s-QWaxVkXVgcNjb7ibMtj0rgbk/view?usp=drive_web` with `/assets/pdf/research/gbu-research-bulletin-2025-vol2.pdf`
5. Replace `https://drive.google.com/file/d/1vQSD1qBa3dSWYObyrgW-VK32cAmY1tI0/view?usp=drive_web` with `/assets/pdf/research/gbu-research-bulletin-2025-vol3.pdf`

Ensure all 455 occurrences are replaced cleanly.
```

---

## 🔹 Task 2: University Annual Reports & NIRF (6 Files)

**File Affected:** `src/pages/Academic/ReportsPublications.jsx`
**Target Folder:** `public/assets/pdf/annual_reports/`

| Line | Document Title | Current Google Drive Link | Recommended Local Path |
| :---: | :--- | :--- | :--- |
| L11 | Annual Report 2023-24 | `https://drive.google.com/file/d/16uXdaavWgULLBuvUdcZMPLWwESSXXONK/view?usp=drive_web` | `/assets/pdf/annual_reports/gbu-annual-report-2023-24.pdf` |
| L17 | Annual Report 2022-23 | `https://drive.google.com/file/d/1IO2ALO-HtOxyWZAfXz9bIIgBKvp8uyqm/view?usp=drive_web` | `/assets/pdf/annual_reports/gbu-annual-report-2022-23.pdf` |
| L23 | Annual Report 2021-22 | `https://drive.google.com/file/d/1duZnaf4iPnicJR4dQ97RwL4YsiNiJFeh/view?usp=drive_web` | `/assets/pdf/annual_reports/gbu-annual-report-2021-22.pdf` |
| L29 | Annual Report 2018-21 | `https://drive.google.com/file/d/1H-GVoAW3kQU92Oc16rKyDz6bR-enOK1y/view?usp=drive_web` | `/assets/pdf/annual_reports/gbu-annual-report-2018-21.pdf` |
| L35 | Annual Report 2016-18 | `https://drive.google.com/file/d/1TP5uibI1VuCOZ3B7o08VJcLeTI02ueMc/view?usp=drive_web` | `/assets/pdf/annual_reports/gbu-annual-report-2016-18.pdf` |
| L41 | Annual Report 2014-15 | `https://drive.google.com/file/d/1-NMA0VLsslJt-wyKb6xZumNWcOXBEf6x/view?usp=drive_web` | `/assets/pdf/annual_reports/gbu-annual-report-2014-15.pdf` |

### 🤖 Copy-Paste AI Prompt for Task 2:

```text
In `src/pages/Academic/ReportsPublications.jsx`, replace the 6 Google Drive annual report links with local assets:
- Line 11: Replace Drive URL with `/assets/pdf/annual_reports/gbu-annual-report-2023-24.pdf`
- Line 17: Replace Drive URL with `/assets/pdf/annual_reports/gbu-annual-report-2022-23.pdf`
- Line 23: Replace Drive URL with `/assets/pdf/annual_reports/gbu-annual-report-2021-22.pdf`
- Line 29: Replace Drive URL with `/assets/pdf/annual_reports/gbu-annual-report-2018-21.pdf`
- Line 35: Replace Drive URL with `/assets/pdf/annual_reports/gbu-annual-report-2016-18.pdf`
- Line 41: Replace Drive URL with `/assets/pdf/annual_reports/gbu-annual-report-2014-15.pdf`
```

---

## 🔹 Task 3: School Placements & Recruitment Records (23 Links)

**Target Folder:** `public/assets/pdf/placement/`

### A. File: `src/Data/schools/SOICT/placement.jsx` (18 Links)

| Line | Year / Title | Current Drive Link | Recommended Local File |
| :---: | :--- | :--- | :--- |
| L69 | Document / Drive Attachment | `https://docs.google.com/forms/d/e/1FAIpQLSduUv1ABymG823prkIupnd5pMkos0jO4dFQGhJS7KUIFuMd1Q/viewform?embedded=true` | Keep or replace with official university form endpoint |
| L129 | 2023 | `https://drive.google.com/file/d/156d2XF5nG6thHaDehx3AltmGfJtHal8J/view?usp=drive_web` | `/assets/pdf/placement/soict-placement-2023.pdf` |
| L130 | 2022 | `https://drive.google.com/file/d/19N__CX8SM4HaEc5Sh76rXxSPei1VLowG/view?usp=drive_web` | `/assets/pdf/placement/soict-placement-2022.pdf` |
| L131 | 2021 | `https://drive.google.com/file/d/1n9lxVCkgG_Tmfrv-tbRehxz9Qkzscrsc/view?usp=drive_web` | `/assets/pdf/placement/soict-placement-2021.pdf` |
| L132 | 2020 | `https://drive.google.com/file/d/1R0ATMcSjhIHiFcw-AvpuPT_Gs_IHkm1l/view?usp=drive_web` | `/assets/pdf/placement/soict-placement-2020.pdf` |
| L133 | 2019 | `https://drive.google.com/file/d/1mts0taMfFwMpW7CIzkO-H4bFt4nRq56X/view?usp=drive_web` | `/assets/pdf/placement/soict-placement-2019.pdf` |
| L134 | 2018 | `https://drive.google.com/file/d/1ah_expsky4-XYxKspaaCmj9GhtwKa3o7/view?usp=drive_web` | `/assets/pdf/placement/soict-placement-2018.pdf` |
| L135 | 2016-17 | `https://drive.google.com/file/d/1ymwPOtQe2A1PhDjWB_kpfPwrs4VpbMDr/view?usp=drive_web` | `/assets/pdf/placement/soict-placement-2016-17.pdf` |
| L136 | 2016 | `https://drive.google.com/file/d/1RonER2E-NuaCZY3oCq8eEqWKLtL1vbLn/view?usp=drive_web` | `/assets/pdf/placement/soict-placement-2016.pdf` |
| L137 | 2015 | `https://drive.google.com/file/d/1s-Qg5sFA-_BfNqTw9ixlsD_XNcmePDRc/view?usp=drive_web` | `/assets/pdf/placement/soict-placement-2015.pdf` |
| L138 | 2014 | `https://drive.google.com/file/d/10Wa8DgRf4gSQ-DtLPI9RsPn50sGpru3F/view?usp=drive_web` | `/assets/pdf/placement/soict-placement-2014.pdf` |
| L139 | 2013 | `https://drive.google.com/file/d/17k7PjKx_vV0VlkNjPXR7l_hax-Cuo0gz/view?usp=drive_web` | `/assets/pdf/placement/soict-placement-2013.pdf` |
| L140 | 2012 | `https://drive.google.com/file/d/1CBU5GPl2FzqFulrIoBwXAllZzlircZq2/view?usp=drive_web` | `/assets/pdf/placement/soict-placement-2012.pdf` |
| L141 | 2011 | `https://drive.google.com/file/d/1_RZ5ZKAMwdz9brzk1HsmzSCGifM33tYE/view?usp=drive_web` | `/assets/pdf/placement/soict-placement-2011.pdf` |
| L142 | 2010 | `https://drive.google.com/file/d/1c-Zcr0qThUdTi34coOppXb3HR1BsNeqV/view?usp=drive_web` | `/assets/pdf/placement/soict-placement-2010.pdf` |
| L144 | 2010 | `https://drive.google.com/drive/folders/1zIGWziwEoGtc4xlplhXx0PQOrsqfc46w` | `/assets/pdf/placement/soict-placement-2010.pdf` |
| L176 | 2025-26 | `https://drive.google.com/file/d/1U4bV1CahJZ4NCY-9IE5h6OowawP-8hpb/view?usp=sharing` | `/assets/pdf/placement/soict-placement-2025-26.pdf` |
| L181 | 2024-25 | `https://drive.google.com/file/d/1U4bV1CahJZ4NCY-9IE5h6OowawP-8hpb/view?usp=sharing` | `/assets/pdf/placement/soict-placement-2024-25.pdf` |

### B. File: `src/Data/schools/SOL/placement.jsx` (3 Links)

| Line | Document Name | Current Drive Link | Recommended Local File |
| :---: | :--- | :--- | :--- |
| L38 | PLACEMENT-LAW-2026.pdf | `https://drive.google.com/open?id=1atH1b5MEmNQW56hypImemBHzjeV-kIJS` | `/assets/pdf/placement/sol-placement-brochure-2026.pdf` |
| L39 | SoLaw_PlacementBrochure_May2025.pdf | `https://drive.google.com/open?id=1u8ZQZzOUiWkhtTywaG51o5rURsm7eGcm` | `/assets/pdf/placement/sol-placement-brochure-2025.pdf` |
| L40 | SoLaw_PlacementBrochure_May2023.pdf | `https://drive.google.com/open?id=1ZpJuGiqaAXRK7zzQFBYWZpgSbYyOATl6` | `/assets/pdf/placement/sol-placement-brochure-2023.pdf` |

### C. File: `src/Data/placementData.js` (2 Google Forms)

- Line 20: Central CRC Registration Google Form (`docs.google.com/forms/...`)
- Line 21: Company Recruiter Registration Google Form (`docs.google.com/forms/...`)
> *Note: Active Google Forms for live data collection can remain live or be integrated with the new university backend submission API.*

### 🤖 Copy-Paste AI Prompt for Task 3:

```text
In `src/Data/schools/SOL/placement.jsx`:
- Line 38: Replace Drive link with `/assets/pdf/placement/sol-placement-brochure-2026.pdf`
- Line 39: Replace Drive link with `/assets/pdf/placement/sol-placement-brochure-2025.pdf`
- Line 40: Replace Drive link with `/assets/pdf/placement/sol-placement-brochure-2023.pdf`

In `src/Data/schools/SOICT/placement.jsx`:
- Replace all brochure and past offers Google Drive links from lines 129 to 181 with clean local files under `/assets/pdf/placement/soict-placement-<year>.pdf`
```

---

## 🔹 Task 4: Centers of Excellence, Labs & Department Records (14 Links)

**Target Folder:** `public/assets/pdf/academic/`

| File Path | Line | Context / Document | Current Drive Link | Recommended Local File |
| :--- | :---: | :--- | :--- | :--- |
| `src/Data/schools/SOICT/about/coeiraem.jsx` | L97 | Maintenance Fundamental | `https://drive.google.com/file/d/1g9g9Vfpg-mFCcqvVz_up48KN9yThTKAp/view?usp=drive_web` | `/assets/pdf/academic/maintenance-fundamental.pdf` |
| `src/Data/schools/SOICT/about/coeiraem.jsx` | L98 | RAEM Brochure | `https://drive.google.com/file/d/1ddggOgPemgdsUirUIKNCS7N3JV8OIfJF/view?usp=drive_web` | `/assets/pdf/academic/raem-brochure.pdf` |
| `src/Data/schools/SOICT/about/coeiraem.jsx` | L120 | PHM Basic | `https://drive.google.com/file/d/1NR_KYgVojPetRq0ArkT5f5JEpdaucGcN/view?usp=drive_web` | `/assets/pdf/academic/phm-basic.pdf` |
| `src/Data/schools/SOICT/about/coeiraem.jsx` | L121 | RAEM Brochure | `https://drive.google.com/file/d/1ddggOgPemgdsUirUIKNCS7N3JV8OIfJF/view?usp=drive_web` | `/assets/pdf/academic/raem-brochure.pdf` |
| `src/Data/schools/SOICT/about/coeiraem.jsx` | L143 | RAMS Advanced | `https://drive.google.com/file/d/1TivVp4qHz1M574ccZKlfAlK-YdZCWbwx/view?usp=drive_web` | `/assets/pdf/academic/rams-advanced.pdf` |
| `src/Data/schools/SOICT/about/coeiraem.jsx` | L144 | RAMS Fundamental | `https://drive.google.com/file/d/1U6Nnze6J1lJs4phPoqwbeV731XZoBpqx/view?usp=drive_web` | `/assets/pdf/academic/rams-fundamental.pdf` |
| `src/Data/schools/SOICT/about/coeiraem.jsx` | L145 | RAEM Brochure | `https://drive.google.com/file/d/1ddggOgPemgdsUirUIKNCS7N3JV8OIfJF/view?usp=drive_web` | `/assets/pdf/academic/raem-brochure.pdf` |
| `src/Data/schools/SOM/about/research-development.jsx` | L20 | List of Research Scholars Awarded PhD | `https://drive.google.com/file/d/1pJoy3lSp3MJswefzVqFTKOV-3SB2TQlY/view?usp=sharing` | `/assets/pdf/academic/list-of-research-scholars-awarded-phd.pdf` |
| `src/Data/schools/SOM/about/research-development.jsx` | L28 | List of Research Scholars Pursuing PhD | `https://drive.google.com/file/d/1tL4wSOOSWc4oynA2_KSBFcSc39digAVZ/view?usp=sharing` | `/assets/pdf/academic/list-of-research-scholars-pursuing-phd.pdf` |
| `src/components/departments/Navbar.jsx` | L259 | MDP Calendar | `https://drive.google.com/file/d/1L9GL0Yw9WRi6eYIuDp_zBN4Fp3lJh-fF/view?usp=sharing` | `/assets/pdf/academic/mdp-calendar.pdf` |
| `src/Data/schools/SOBT/about/laboratories.jsx` | L10 | State-of-the-art research laboratories, teaching labs, and specialized infrastructure. | `https://drive.google.com/file/d/1HdfoljdTapAfg3aDfPJceC7IASwb30pI/view?usp=sharing` | `/assets/pdf/academic/state-of-the-art-research-laboratories,-teaching-labs,-and-specialized-infrastructure..pdf` |
| `src/Data/schools/SOE/about/laboratories.jsx` | L10 | Comprehensive departmental labs equipped with state-of-the-art instruments, simulation toolkits, and heavy testing machinery. | `https://drive.google.com/file/d/1WEgVjOiNcWzwhk63uGaFOKg7euCdvXX_/view?usp=sharing` | `/assets/pdf/academic/comprehensive-departmental-labs-equipped-with-state-of-the-art-instruments,-simulation-toolkits,-and-heavy-testing-machinery..pdf` |
| `src/Data/schools/SOBSC/research/training-consultancy.jsx` | L4 | School of Buddhist Studies & Civilization | `https://drive.google.com/file/d/1btagzeWT8gwQrws-4mgx875tkEN-5Wr4/view?usp=sharing` | `/assets/pdf/academic/school-of-buddhist-studies-&-civilization.pdf` |
| `src/Data/schools/SOHSS/research/research-area-profile.jsx` | L116 | Patents | `https://drive.google.com/file/d/1H8BAACetPCdtyqN9woixpD6bSAgx09vx/preview` | `/assets/pdf/academic/patents.pdf` |
| `src/Data/schools/SOM/research/research-area-profile.jsx` | L128 | Patents | `https://drive.google.com/file/d/1H8BAACetPCdtyqN9woixpD6bSAgx09vx/preview` | `/assets/pdf/academic/patents.pdf` |
| `src/Data/schools/SOL/about/legal-aid-clinic.jsx` | L11 | Equal Justice & Free Legal Aid under Article 39A of the Constitution of India in collaboration with District Legal Services Authority (DLSA). | `https://docs.google.com/presentation/d/1OISAsYccvhiKYRtL133q2Dc536-WBl3a/edit?usp=sharing&ouid=104470967123455199658&rtpof=true&sd=true` | `/assets/pdf/academic/equal-justice-&-free-legal-aid-under-article-39a-of-the-constitution-of-india-in-collaboration-with-district-legal-services-authority-(dlsa)..pdf` |

### 🤖 Copy-Paste AI Prompt for Task 4:

```text
Please localize the following department documents to `/assets/pdf/academic/`:
1. `src/Data/schools/SOICT/about/coeiraem.jsx`: Lines 97, 98, 120, 121, 143, 144, 145 -> replace Drive URLs with `/assets/pdf/academic/raem-<course-code>.pdf`
2. `src/Data/schools/SOM/about/research-development.jsx`: Line 20 (PhD Awarded List) & Line 28 (PhD Pursuing List) -> replace Drive URLs with `/assets/pdf/academic/som-phd-scholars-list.pdf`
3. `src/components/departments/Navbar.jsx`: Line 259 (MDP Calendar) -> replace Drive URL with `/assets/pdf/academic/mdp-calendar.pdf`
4. `src/Data/schools/SOBT/about/laboratories.jsx`: Line 10 -> replace with `/assets/pdf/academic/sobt-labs.pdf`
5. `src/Data/schools/SOE/about/laboratories.jsx`: Line 10 -> replace with `/assets/pdf/academic/soe-labs.pdf`
```

---

## 🔹 Task 5: Clean Up Dummy / Test Sample Links (Immediate)

| File Path | Line | Dummy Value | Action Required |
| :--- | :---: | :--- | :--- |
| `src/components/ncc/NCCEvents.jsx` | L24 | `https://drive.google.com/drive/folders/sampleNCC` | Remove or replace with `#` / local event document |
| `src/Data/facultyList.json` | L54 | `...123NFAnJG3_-KeEch6KlnlUt4TwLhKWaO...` | Remove dummy test attachment ID |
| `src/Data/soictFacultyImagePaths.json` | L6 | `...123NFAnJG3_-KeEch6KlnlUt4TwLhKWaO...` | Remove dummy test attachment ID |

### 🤖 Copy-Paste AI Prompt for Task 5:

```text
In `src/components/ncc/NCCEvents.jsx` at line 24, remove the dummy link `https://drive.google.com/drive/folders/sampleNCC` and replace it with `#` or standard university youth activity guidelines `/assets/pdf/general/anti-ragging-regulations-2025.pdf`.
```

---

## 🏁 Post-Migration Verification Command

After applying the replacements, run this command in terminal to confirm 0 remaining Google Drive links:

```bash
git grep -n "drive.google.com" src/
npm run build
```
