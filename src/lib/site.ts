/** Site-wide constants (update phone/email as needed for production) */
export const SITE = {
  name: "DMZ Care",
  tagline: "Non-emergency medical transportation in Louisville and surrounding communities.",
  phoneDisplay: "331-269-8740",
  phoneTel: "+13312698740",
  email: "hello@dmzcare.com",
  city: "Louisville",
  state: "KY",
  fullAddress: "Louisville, Kentucky",
  hours: "Scheduling: Mon-Sat, 7:00 a.m.-7:00 p.m.",
  social: {
    instagram: "https://www.instagram.com/dmzcare/",
    facebook: "https://www.facebook.com/dmzcare",
    linkedin: "https://www.linkedin.com/company/dmzcare/",
  },
} as const;

/** Header/footer horizontal lockup; file lives in /public (`unoptimized` in Image). */
export const SITE_LOGO = {
  src: "/DMZ%20Care%20Dark%20Logo.webp",
  width: 3777,
  height: 705,
} as const;

/** Square mark / favicon artwork for hero spots and icon-sized UI (original colors). */
export const SITE_LOGO_ICON = {
  src: "/DMZ%20Care%20Favicon.webp",
  width: 1151,
  height: 1160,
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/faqs", label: "FAQs" },
  { href: "/contact", label: "Contact" },
  { href: "/booking", label: "Book a ride" },
] as const;

/** Matches `/services` “What we offer” tiles; used for footer links and `#` anchors on that page. */
export const SERVICE_OFFERINGS = [
  { slug: "doctor-visits", label: "Doctor Visits" },
  { slug: "dialysis-treatments", label: "Dialysis Treatments" },
  { slug: "physical-therapy-sessions", label: "Physical Therapy Sessions" },
  { slug: "hospital-outpatient-services", label: "Hospital Outpatient Services" },
  { slug: "behavioral-mental-health-appointments", label: "Behavioral & Mental Health Appointments" },
  { slug: "dental-appointments", label: "Dental Appointments" },
] as const;

export const SERVICE_AREAS = [
  "Louisville Metro",
  "Jefferson County",
  "Oldham County",
  "Bullitt County",
  "Shelby County",
  "Southern Indiana (select routes)",
] as const;
