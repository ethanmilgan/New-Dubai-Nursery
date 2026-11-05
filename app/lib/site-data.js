import parentTestimonials from '@/content/testimonials.json';

export const contact = {
  phone: "+971 4 398 4900",
  phoneHref: "tel:+97143984900",
  whatsapp: "+971 56 699 0985",
  whatsappHref: "https://wa.me/971566990985",
  email: "ndn@eim.ae",
  emailHref: "mailto:ndn@eim.ae",
  instagram: "@newdubainursery",
  instagramHref: "https://instagram.com/newdubainursery",
  address: "Villa No. 164, Al Hudaiba, Al Satwa Road (Sheikh Sabah Al Ahmad Al Jaber Al Sabah Street), Dubai, United Arab Emirates.",
  addressShort: "Villa No. 164, Al Hudaiba, Al Satwa Road, Dubai",
  mapsHref: "https://www.google.com/maps?cid=14530258343334115403",
  mapsEmbedHref: "https://www.google.com/maps?q=25.24098942%2C55.28106079&z=16&output=embed"
};

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/curriculum", label: "Curriculum" },
  { href: "/admissions", label: "Admissions" },
  { href: "/contact", label: "Contact" }
];

export const testimonials = parentTestimonials;

export const learningAreas = [
  "Communication & language",
  "Physical development",
  "Personal, social & emotional development",
  "Literacy",
  "Mathematics",
  "Understanding the world",
  "Expressive arts & design"
];

export const forms = [
  { name: "General Information", file: "GENERAL-INFORMATION.pdf" },
  { name: "Admission Form", file: "NDNELC-Admission-Form.pdf" },
  { name: "Health Declaration", file: "HEALTH-DECLARATION-FORM.pdf" },
  { name: "Transport Form", file: "TRANSPORT-FORM.pdf" },
  { name: "Authorised Pick Up", file: "AUTHORISED-PICK-UP-FORM.pdf" }
];
