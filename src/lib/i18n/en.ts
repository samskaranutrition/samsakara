/* eslint-disable */
import { legalEn } from "./legal-en";
import type { LegalTranslations } from "./legal-types";

type Pillar = { title: string; body: string };
type ProgItem = { name: string; tag: string; body: string };
type ProgFull = { name: string; tag: string; intro: string; includes: string[] };
type Step = { n: string; t: string; b: string };
type StoryChapter = {
  num: string;
  title: string;
  body: string;
  pull?: boolean;
};

export type Translations = {
  nav: { home: string; about: string; programmes: string; work: string; contact: string; email: string; cta: string; menu: string; close: string; language: string };
  footer: {
    tagline: string;
    serving: string;
    explore: string;
    contactLabel: string;
    onlineNote: string;
    copyright: string;
    clinicHeading: string;
    clinicHint: string;
    clinicDirections: string;
  };
  closing: { eyebrow: string; title: string; body: string; cta: string };
  home: {
    eyebrow: string; title: string; body: string; explore: string; quote: string;
    approachEyebrow: string; approachTitle: string; pillars: Pillar[];
    fnEyebrow: string; fnTitle: string; fnBody: string;
    waysEyebrow: string; waysTitle: string; seeAll: string; learnMore: string;
    programmes: ProgItem[]; portraitAlt: string;
  };
  about: {
    eyebrow: string; title: string; location: string; intro: string;
    storyEyebrow: string; storyTitle: string; scrollHint: string;
    imageCaptions: Record<"portrait", string>;
    chapters: StoryChapter[];
  };
  programmes: { eyebrow: string; title: string; intro: string; cta: string; items: ProgFull[] };
  work: {
    eyebrow: string; title: string; intro: string; steps: Step[];
    bookingEyebrow: string; bookingTitle: string; bookingNote: string;
    bookingUnavailable: string; bookingUnavailableBody: string; emailSamantha: string;
    altLink: string; altLinkText: string;
    calendlyConsentTitle: string; calendlyConsentBody: string; calendlyEnable: string;
  };
  contact: {
    eyebrow: string; title: string; intro: string;
    bookingEyebrow: string; bookingTitle: string; bookingNote: string;
    directEyebrow: string; directTitle: string; or: string; bookLink: string;
    emailLabel: string; join: string; joining: string; doneTitle: string; doneBody: string;
    privacyConsentPrefix: string;
    privacyConsentLink: string;
    privacyConsentSuffix: string;
  };
  legal: LegalTranslations;
  clinic: { mapTitle: string; directions: string; visitHeading: string };
  payments: {
    eyebrow: string;
    title: string;
    body: string;
    calendlyNote: string;
    bookCta: string;
    payCta: string;
    secureNote: string;
  };
};

export const en: Translations = {
  nav: {
    home: "Home",
    about: "About Me",
    programmes: "Programmes",
    work: "Work With Me",
    contact: "Contact",
    email: "Email",
    cta: "Book a Free Discovery Call",
    menu: "Menu",
    close: "Close",
    language: "Language",
  },
  footer: {
    tagline: "Functional nutrition rooted in food wisdom — for gut health and lasting wellbeing.",
    serving: "Working with clients across the UK and Europe, online and in London.",
    explore: "Explore",
    contactLabel: "Contact",
    onlineNote: "Online across the UK & Europe · London clinic",
    copyright: "© 2026 Samskara Nutrition · Made with care",
    clinicHeading: "Our London clinic",
    clinicHint: "In-person consultations by appointment",
    clinicDirections: "Open in Google Maps",
  },
  closing: {
    eyebrow: "A first conversation",
    title: "Struggling to make decisions or trust yourself?",
    body: "Your gut may have lost its voice. I help restore the connection between gut and mind, so clarity returns, energy steadies, and you feel aligned again.",
    cta: "Book a Free Discovery Call",
  },
  home: {
    eyebrow: "Where traditional food wisdom meets modern science",
    title: "Functional nutrition focussing on gut health and wellbeing",
    body: "Supporting gut healing, digestive balance, and lasting vitality through nourishment rather than restriction.",
    explore: "Choose Your Journey",
    quote: "Healing doesn't have to begin with restriction. It can begin with nourishment.",
    approachEyebrow: "Approach",
    approachTitle: "Choose food that loves you back",
    pillars: [
      { title: "Rooted in real food", body: "No restrictive plans or supplements. Just deeply nourishing food rooted in Indian and Mediterranean traditions." },
      { title: "Gut Focussed", body: "We begin with the gut — gently rebuilding the foundations of digestion, so energy, clarity and balance can follow." },
      { title: "Science-backed", body: "Traditional wisdom has its place, but every recommendation is considered through the lens of modern nutritional science and your individual needs." },
    ],
    fnEyebrow: "Understanding the work",
    fnTitle: "What is Functional Nutrition?",
    fnBody: "Functional nutrition looks at food as medicine — not through restriction, but through understanding what your body needs to heal. It combines traditional food wisdom with modern science to address the root causes of digestive imbalance, low energy, and hormonal stress — personalised to you.",
    waysEyebrow: "Work with me",
    waysTitle: "Choose Your Journey",
    seeAll: "See all programmes",
    learnMore: "Learn more",
    programmes: [
      { name: "Samskara — My Signature Journey", tag: "Signature · 10 weeks", body: "A deeper, more personal path to lasting change. Comprehensive support over ten weeks for those ready to truly transform how they feel." },
      { name: "Clarity — Lasting Impressions", tag: "Your first step", body: "A focused first step for those seeking clarity, guidance, and a deeper understanding of what their body needs — without committing to a longer journey just yet." },
      { name: "Setu — The Bridge", tag: "The bridge", body: "Structured, hands-on support to help you build on your initial plan, restore balance, and bridge the gap between insight and lasting progress." },
    ],
    portraitAlt: "Portrait of Samantha, founder of Samskara Nutrition",
  },
  about: {
    eyebrow: "About me",
    title: "Hello, I'm Samantha",
    location: "Kerala · London",
    intro: "My journey into nutrition began long before Samskara — in Mediterranean kitchens, medical school, a decade in luxury, and the quiet wisdom of Kerala.",
    storyEyebrow: "The story",
    storyTitle: "From Sunday lunches to slow Kerala afternoons",
    scrollHint: "Scroll to walk through the journey →",
    imageCaptions: {
      portrait: "Samantha — founder of Samskara Nutrition",
    },
    chapters: [
      {
        num: "01",
        title: "Food was never just food",
        body: "I grew up in a Mediterranean French family where long Sunday lunches stretched into the afternoon — laughter around a table, something slow-cooked, the feeling that being fed meant being loved. Food, for us, was a language.",
      },
      {
        num: "02",
        title: "Understanding the body",
        body: "Drawn to what the body carries and remembers, I studied medicine. A few years later I moved to London and stepped into luxury — a decade at Louis Vuitton, inside a world of extraordinary beauty and relentless pace.",
      },
      {
        num: "",
        title: "Until I wasn't.",
        body: "",
        pull: true,
      },
      {
        num: "03",
        title: "Running on empty",
        body: "Somewhere between the sparkle and the pace, I began to notice how much people gave to their work — and how little they gave to themselves. People looking for purpose, feeling everything but well. That gap stayed with me.",
      },
      {
        num: "04",
        title: "Kerala changed everything",
        body: "Slow afternoons, birdsong, sunlight through the trees. Through the cooking and quiet wisdom of my mother-in-law, I began to understand an ancient way of living and eating that the modern world had largely forgotten.",
      },
      {
        num: "",
        title: "Food is not fuel. It is not the enemy.",
        body: "",
        pull: true,
      },
      {
        num: "05",
        title: "An unspoken language",
        body: "It is a conversation between you and your body — and when you learn to listen, everything changes. That knowledge, woven with medicine and functional nutrition, became the foundation of Samskara.",
      },
      {
        num: "06",
        title: "Today",
        body: "I work with people ready to stop overriding their body and start truly nourishing it. If that sounds like you, you're in the right place.",
      },
    ],
  },
  programmes: {
    eyebrow: "Ways to work together",
    title: "Choose your journey",
    intro: "Three thoughtfully designed ways to begin — whether you're seeking gentle direction or a complete transformation. Not sure which fits? That's exactly what a discovery call is for.",
    cta: "Book a Free Discovery Call",
    items: [
      {
        name: "Samskara — My Signature Journey", tag: "Signature · 10 weeks",
        intro: "A deeper, more personal path to lasting change. Comprehensive support over ten weeks for those ready to truly transform how they feel.",
        includes: ["Full functional assessment", "A bespoke 10-week roadmap", "Regular 1:1 sessions", "Personalised meal & lifestyle guidance", "Continuous support between sessions"],
      },
      {
        name: "Clarity — Lasting Impressions", tag: "Clarity",
        intro: "A focused first step for those seeking clarity, guidance, and a deeper understanding of what their body needs — without committing to a longer journey just yet.",
        includes: ["In-depth initial consultation", "Personalised first steps", "A clear, calm sense of direction"],
      },
      {
        name: "Setu — The Bridge", tag: "The bridge",
        intro: "Setu means bridge — structured, hands-on support to build on your initial plan, restore balance, and move from insight to lasting progress.",
        includes: ["Comprehensive assessment", "Tailored nutrition guidance", "Ongoing check-ins & adjustments", "Recipes drawn from real food traditions"],
      },
    ],
  },
  work: {
    eyebrow: "The first step",
    title: "Book your free discovery call",
    intro: "A relaxed, 20-minute conversation to explore where you are, what you're hoping for, and whether we're the right fit. Choose a date and time below — you'll receive an instant confirmation by email.",
    steps: [
      { n: "01", t: "Pick a time", b: "Select an available slot from the calendar — times shown are in your local timezone." },
      { n: "02", t: "We talk", b: "You share what's been going on and what you'd love to change." },
      { n: "03", t: "You decide", b: "If it feels right, we talk next steps. If not, you leave with clarity." },
    ],
    bookingEyebrow: "Choose your time",
    bookingTitle: "Book a discovery call",
    bookingNote: "Available slots are kept up to date. You'll get a confirmation email with calendar invite and reminders before your call.",
    bookingUnavailable: "Online booking is being set up",
    bookingUnavailableBody: "Email Samantha with a few times that work for you and she'll confirm your discovery call by reply.",
    emailSamantha: "Email Samantha",
    altLink: "Want to explore programmes first?",
    altLinkText: "See all programmes",
    calendlyConsentTitle: "Cookies needed for online booking",
    calendlyConsentBody: "Calendly uses functional cookies to show available times and confirm your appointment. Choose “Accept all” to load the booking calendar, or email Samantha to arrange a call.",
    calendlyEnable: "Accept cookies & show calendar",
  },
  contact: {
    eyebrow: "Get in touch",
    title: "Book a conversation",
    intro: "The simplest way to connect is to choose a time below. You'll receive an instant confirmation email with your discovery call details.",
    bookingEyebrow: "Choose your time",
    bookingTitle: "Book a free discovery call",
    bookingNote: "Pick a slot that suits you — Calendly handles scheduling and email confirmations automatically.",
    directEyebrow: "Prefer email?",
    directTitle: "Write to Samantha directly",
    or: "Or",
    bookLink: "explore the programmes",
    emailLabel: "Your email",
    join: "Join the waitlist",
    joining: "Adding you…",
    doneTitle: "You're on the list.",
    doneBody: "I'll be in touch when the next journey opens.",
    privacyConsentPrefix: "I agree to the ",
    privacyConsentLink: "Privacy Policy",
    privacyConsentSuffix: " and consent to Samskara Nutrition storing my email.",
  },
  legal: legalEn,
  clinic: {
    mapTitle: "Map showing Samskara Nutrition at 34a Thomas Rd, London",
    directions: "Open in Google Maps",
    visitHeading: "Visit us in London",
  },
  payments: {
    eyebrow: "Booking & payment",
    title: "Reserve your place securely",
    body: "Discovery calls are free. When you're ready to begin a programme, payment is collected securely at booking — no separate invoices or manual transfers.",
    calendlyNote: "Timings and availability always come from Calendly, so the site stays up to date automatically.",
    bookCta: "Book a free discovery call",
    payCta: "Pay for a programme",
    secureNote: "Payments processed securely via Stripe through Calendly or your payment link.",
  },
} as const;
