/*
 * University forms (Leave, Medical Claim, General), taken from https://www.gbu.ac.in/page/forms.
 *
 * The PDFs are kept on our own server like the site's other PDFs: the files live in
 * gbu-storage/static/assets/pdf/forms/ (not in git) and public/static-files.php serves them
 * at /assets/pdf/forms/<file>. Keep a local copy in public/assets/pdf/forms/ for npm run dev.
 * Adding a form: put the PDF in both places and add a row below.
 *
 * Not carried over: the "Declaration Form" in the Medical section, whose link on the old site
 * is broken (it points to a file named ".pdf" and returns 404).
 */

const pdf = (file) => `/assets/pdf/forms/${file}`;

export const FORM_SECTIONS = [
  {
    id: "leave",
    title: "Leave Forms",
    description: "Leave applications for faculty and staff, with the office order on leave sanctioning authority.",
    forms: [
      { title: "Leave Order", note: "Office order on leave sanctioning authority, 15 March 2014 (Hindi)", file: pdf("leave-order.pdf"), pages: 1, sizeKb: 679 },
      { title: "Casual Leave, Restricted Holiday & Station Leave Form (Faculty)", file: pdf("cl-rh-station-leave-faculty.pdf"), pages: 1, sizeKb: 347 },
      { title: "Casual Leave, Restricted Holiday & Station Leave Form (Staff)", file: pdf("cl-rh-station-leave-staff.pdf"), pages: 1, sizeKb: 296 },
      { title: "Academic / Duty Leave Form", file: pdf("academic-duty-leave.pdf"), pages: 1, sizeKb: 270 },
      { title: "Earned Leave (EL) Form", file: pdf("earned-leave.pdf"), pages: 1, sizeKb: 429 },
      { title: "Child Care, Maternity, Paternity & Commuted Leave Form", file: pdf("child-care-maternity-paternity-commuted-leave.pdf"), pages: 1, sizeKb: 448 },
      { title: "Summer / Winter Vacation Leave Form (Faculty)", file: pdf("summer-winter-vacation-leave-faculty.pdf"), pages: 1, sizeKb: 199 },
    ],
  },
  {
    id: "medical",
    title: "Medical Claim Forms",
    description: "Forms for claiming reimbursement of medical expenses.",
    forms: [
      { title: "General Medical Claim Form", note: "Application for medical reimbursement", file: pdf("general-medical-claim-form.pdf"), pages: 2, sizeKb: 162 },
      { title: "Medical Claim Form (A)", file: pdf("medical-claim-form-a.pdf"), pages: 2, sizeKb: 110 },
      { title: "Medical Claim Form (B)", file: pdf("medical-claim-form-b.pdf"), pages: 2, sizeKb: 106 },
      { title: "Medical Claim Form (Hindi)", file: pdf("medical-form-hindi.pdf"), pages: 3, sizeKb: 244 },
    ],
  },
  {
    id: "general",
    title: "General Forms",
    description: "Other forms for students.",
    forms: [
      { title: "Student Medical Declaration Form", note: "Student medical insurance declaration", file: pdf("student-medical-declaration-form.pdf"), pages: 1, sizeKb: 66 },
    ],
  },
];

// Online forms and systems run outside this website
export const MAINTENANCE_COMPLAINT_FORM_URL = "https://forms.gle/wbB7tH2ajaadmcpo8";
// The old site's Timetables page links here ("Access from outside campus")
export const TIMETABLE_URL = "https://mygbu.in/";
