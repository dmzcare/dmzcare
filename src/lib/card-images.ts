/**
 * Full-bleed hover backgrounds for service cards and the About “What guides us” slider.
 * Files live in `/public`; indices rotate when there are more slots than assets.
 */
export const CARD_BACKGROUND_IMAGES = [
  "/17306.jpg",
  "/1675.jpg",
  "/55888-1024x574.jpg",
  "/full-shot-friends-taking-selfie-together-681x1024.jpg",
] as const;

/** Doctor Visits tile background (`/public/Physical Therapy.webp`). */
export const DOCTOR_VISITS_CARD_IMAGE = "/Physical%20Therapy.webp";

/** Dialysis Treatments tile background (`/public/relaxed_patient_in_modern_dialysis_clinic.webp`). */
export const DIALYSIS_TREATMENTS_CARD_IMAGE =
  "/relaxed_patient_in_modern_dialysis_clinic.webp";

/** Physical Therapy Sessions tile background (`/public/Doctors appointments.webp`). */
export const PHYSICAL_THERAPY_SESSIONS_CARD_IMAGE =
  "/Doctors%20appointments.webp";

/** Hospital Outpatient Services tile background (`/public/supportive_care_in_a_welcoming_hallway.webp`). */
export const HOSPITAL_OUTPATIENT_SERVICES_CARD_IMAGE =
  "/supportive_care_in_a_welcoming_hallway.webp";

/** Behavioral & Mental Health Appointments (`/public/therapy_session_in_a_calm_setting.webp`). */
export const BEHAVIORAL_MENTAL_HEALTH_CARD_IMAGE =
  "/therapy_session_in_a_calm_setting.webp";

/** Adults Day Care Facilities tile (`/public/Adults Day Care Facilities.webp`). */
export const ADULTS_DAY_CARE_FACILITIES_CARD_IMAGE =
  "/Adults%20Day%20Care%20Facilities.webp";

/** Dental Appointments tile (`/public/dental appointment.webp`). */
export const DENTAL_APPOINTMENTS_CARD_IMAGE = "/dental%20appointment.webp";

export function cardBackgroundAt(index: number): string {
  return CARD_BACKGROUND_IMAGES[index % CARD_BACKGROUND_IMAGES.length]!;
}

/** Services page hero full-bleed background (`/services`). */
export const SERVICES_HERO_IMAGE = "/friendly_transport_assistance_at_medical_facility.webp";

/** About / homepage “Built around dignity & punctuality” mission photo. */
export const ABOUT_MISSION_IMAGE = "/friendly_greeting_outside_a_suburban_home.webp";
