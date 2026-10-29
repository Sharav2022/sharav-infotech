// Contact form rules, shared by the browser form and the API route so both
// enforce exactly the same constraints.

export const CONTACT_FIELDS = {
  name: { label: "Full name", maxLength: 80, required: true },
  email: { label: "Work email", maxLength: 120, required: true },
  phone: { label: "Phone", maxLength: 24, required: false },
  company: { label: "Organization", maxLength: 120, required: false },
  interest: { label: "Area of interest", maxLength: 60, required: false },
  message: { label: "Project details", maxLength: 3000, required: true },
};

export const INTEREST_OPTIONS = [
  "Product design",
  "Web & application development",
  "Cloud services",
  "Software testing",
  "Launch & support",
  "IT consulting",
  "Digital marketing",
  "Not sure yet",
];

// Honeypot field: hidden from people, filled in by most bots.
export const HONEYPOT_FIELD = "website";

const EMAIL_PATTERN = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[a-z]{2,}$/i;
const PHONE_PATTERN = /^\+?[0-9 ().-]{7,24}$/;

export const EMPTY_CONTACT = Object.fromEntries(
  Object.keys(CONTACT_FIELDS).map((key) => [key, ""])
);

export function normalizeContact(input = {}) {
  return Object.fromEntries(
    Object.keys(CONTACT_FIELDS).map((key) => {
      const value = typeof input[key] === "string" ? input[key] : "";
      return [key, value.trim()];
    })
  );
}

export function validateContactField(key, value) {
  const field = CONTACT_FIELDS[key];
  if (!field) return null;
  if (!value) return field.required ? `${field.label} is required.` : null;
  if (value.length > field.maxLength) {
    return `${field.label} must be ${field.maxLength} characters or fewer.`;
  }
  if (key === "name" && value.length < 2) return "Please enter your name.";
  if (key === "email" && !EMAIL_PATTERN.test(value)) {
    return "Please enter a valid email address.";
  }
  if (key === "phone" && !PHONE_PATTERN.test(value)) {
    return "Please enter a valid phone number.";
  }
  if (key === "message" && value.length < 20) {
    return "Please share a little more detail (at least 20 characters).";
  }
  if (key === "interest" && !INTEREST_OPTIONS.includes(value)) {
    return "Please choose an option from the list.";
  }
  return null;
}

export function validateContact(values) {
  const errors = {};
  for (const key of Object.keys(CONTACT_FIELDS)) {
    const error = validateContactField(key, values[key]);
    if (error) errors[key] = error;
  }
  return errors;
}
