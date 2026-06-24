/* eslint-disable */
type Pillar = { title: string; body: string };
type ProgItem = { name: string; tag: string; body: string };
type ProgFull = { name: string; tag: string; intro: string; includes: string[] };
type Step = { n: string; t: string; b: string };

export type Translations = {
  nav: { home: string; about: string; programmes: string; work: string; contact: string; cta: string; menu: string; close: string; language: string };
  footer: { tagline: string; serving: string; explore: string; copyright: string };
  closing: { eyebrow: string; title: string; body: string; cta: string };
  home: {
    eyebrow: string; title: string; body: string; explore: string; quote: string;
    approachEyebrow: string; approachTitle: string; pillars: Pillar[];
    glimpseEyebrow: string; glimpseTitle: string; captionKerala: string; captionSpices: string;
    waysEyebrow: string; waysTitle: string; seeAll: string; learnMore: string;
    programmes: ProgItem[]; portraitAlt: string;
  };
  about: {
    eyebrow: string; title: string; location: string; paragraphs: string[];
    galleryEyebrow: string; galleryTitle: string; captionKerala: string; captionFrance: string;
  };
  programmes: { eyebrow: string; title: string; intro: string; cta: string; items: ProgFull[] };
  work: {
    eyebrow: string; title: string; intro: string; steps: Step[];
    formEyebrow: string; formTitle: string;
    name: string; namePh: string; email: string; emailPh: string;
    message: string; optional: string; messagePh: string;
    send: string; sending: string; thanksTitle: string; thanksBody: string;
    altLink: string; altLinkText: string;
  };
  contact: {
    eyebrow: string; title: string; intro: string;
    directEyebrow: string; directTitle: string; or: string; bookLink: string;
    emailLabel: string; join: string; joining: string; doneTitle: string; doneBody: string;
  };
};

export const en: Translations = {
  nav: {
    home: "Home",
    about: "About Me",
    programmes: "Programmes",
    work: "Work With Me",
    contact: "Contact",
    cta: "Book a Free Discovery Call",
    menu: "Menu",
    close: "Close",
    language: "Language",
  },
  footer: {
    tagline: "Functional nutrition rooted in food wisdom — for gut health and women's wellbeing.",
    serving: "Working with women across the UK and Europe, online.",
    explore: "Explore",
    copyright: "© 2026 Samskara Nutrition · Made with care",
  },
  closing: {
    eyebrow: "A first conversation",
    title: "Your body has been asking for change",
    body: "Begin with a warm, unhurried conversation. No pressure, no jargon — just space to be heard and a sense of what's possible.",
    cta: "Book a Free Discovery Call",
  },
  home: {
    eyebrow: "Where traditional food wisdom meets modern science",
    title: "Functional nutrition for women's gut health and wellbeing",
    body: "I help women rebuild their gut health and feel like themselves again — through nourishing food, not restriction.",
    explore: "Explore Programmes",
    quote: "Healing doesn't have to feel clinical. It can taste like home and move at your pace.",
    approachEyebrow: "The approach",
    approachTitle: "A quieter, more lasting way to feel well",
    pillars: [
      { title: "Rooted in real food", body: "No restrictive plans or powders. We work with nourishing, beautiful food drawn from Indian and Mediterranean traditions." },
      { title: "Centred on your gut", body: "Digestion is where wellbeing begins. We rebuild it gently, so energy, clarity and balance can follow." },
      { title: "Made for women", body: "Hormones, stress, life stages — your body is always speaking. Together we learn to listen and respond." },
    ],
    glimpseEyebrow: "A glimpse",
    glimpseTitle: "The world behind the practice",
    captionKerala: "Kerala — where it all began",
    captionSpices: "Spices, the original medicine",
    waysEyebrow: "Ways to work together",
    waysTitle: "Three journeys",
    seeAll: "See all programmes",
    learnMore: "Learn more",
    programmes: [
      { name: "Artha", tag: "Clarity", body: "A focused starting point for women who want direction without committing to a long journey just yet." },
      { name: "Setu", tag: "The bridge", body: "Structured, hands-on support to rebuild gut health and restore balance — a bridge to where you want to be." },
      { name: "Samskara Signature Journey", tag: "10-week transformation", body: "Deep, personal and lasting. Comprehensive support for women ready to truly transform how they feel." },
    ],
    portraitAlt: "Portrait of Samantha, founder of Samskara Nutrition",
  },
  about: {
    eyebrow: "About me",
    title: "Hello, I'm Samantha",
    location: "Kerala · London",
    paragraphs: [
      "My journey into nutrition began long before Samskara.",
      "I grew up in a Mediterranean French family where food was never just food. It was long Sunday lunches that stretched into the afternoon. Laughter around a table, the smell of something slow-cooked, the feeling that being fed meant being loved. Food, for us, was a language. Drawn to understanding the human body, I began studying medicine, fascinated by what it carries, what it remembers, what it tries to tell us. A few years later, I set sail for London and stepped into the world of luxury. A decade at Louis Vuitton, inside a world of extraordinary beauty and relentless pace. For a while, I was completely captivated by it.",
      "Until I wasn't.",
      "Because somewhere between the sparkle and the pace of it all, I began to notice something I couldn't unsee. How much people were willing to give to their work, and how little they were giving to themselves. People running on empty, looking for purpose, feeling everything but well.",
      "That gap stayed with me.",
      "It was during my time in Kerala, South India … slow afternoons, birdsong, sunlight through the trees, that something shifted. Through the cooking and quiet wisdom of my mother-in-law, I began to understand an ancient way of living and eating that the modern world had largely forgotten. Something that is passed from generation to generation.",
      "That food is not fuel. It is not the enemy.",
      "It is an unspoken language between you and your body, and when you learn to listen to it, everything changes. That knowledge, woven together with my background in medicine and my training in functional nutrition, became the foundation of everything Samskara is built on.",
      "Today, I work with people who are ready to stop overriding their body and start truly nourishing it. People who sense that something is off and deserve more than generic advice. If that sounds like you, you're in the right place.",
    ],
    galleryEyebrow: "A photo essay",
    galleryTitle: "The places that made me",
    captionKerala: "Kerala — home of the kitchen",
    captionFrance: "The South of France — where it began",
  },
  programmes: {
    eyebrow: "Ways to work together",
    title: "Choose your journey",
    intro: "Three thoughtfully designed ways to begin — whether you're seeking gentle direction or a complete transformation. Not sure which fits? That's exactly what a discovery call is for.",
    cta: "Book a Free Discovery Call",
    items: [
      {
        name: "Artha", tag: "Clarity",
        intro: "A focused starting point for women who want direction and a sense of what their body needs — without committing to a long journey just yet.",
        includes: ["In-depth initial consultation", "Personalised first steps", "A clear, calm sense of direction"],
      },
      {
        name: "Samskara Signature Journey", tag: "Most loved · 10-week transformation",
        intro: "The full Gut Transformation Journey — deep, personal and lasting. Comprehensive support across ten weeks for women ready to truly transform how they feel.",
        includes: ["Full functional assessment", "A bespoke 10-week roadmap", "Regular 1:1 sessions", "Personalised meal & lifestyle guidance", "Continuous support between sessions"],
      },
      {
        name: "Setu", tag: "The bridge",
        intro: "Structured, hands-on support to rebuild gut health and restore balance. A bridge from where you are to where you want to be.",
        includes: ["Comprehensive assessment", "Tailored nutrition guidance", "Ongoing check-ins & adjustments", "Recipes drawn from real food traditions"],
      },
    ],
  },
  work: {
    eyebrow: "The first step",
    title: "Book your free discovery call",
    intro: "A relaxed, 20-minute conversation to explore where you are, what you're hoping for, and whether we're the right fit. No pressure — just a warm space to be heard.",
    steps: [
      { n: "01", t: "We talk", b: "You share what's been going on and what you'd love to change." },
      { n: "02", t: "I listen", b: "I offer initial thoughts and a sense of how I could help." },
      { n: "03", t: "You decide", b: "If it feels right, we talk next steps. If not, you leave with clarity." },
    ],
    formEyebrow: "Request your call",
    formTitle: "I'll personally reply to arrange a time",
    name: "Your name",
    namePh: "Jane Doe",
    email: "Email",
    emailPh: "you@email.com",
    message: "A little about you",
    optional: "(optional)",
    messagePh: "What's been on your mind lately?",
    send: "Send my request",
    sending: "Sending…",
    thanksTitle: "Thank you — your note is on its way.",
    thanksBody: "I'll be in touch within a day or two to find a time that suits you.",
    altLink: "Prefer to join the waitlist instead?",
    altLinkText: "Stay close here",
  },
  contact: {
    eyebrow: "Stay close",
    title: "Join the waitlist",
    intro: "Spaces for one-to-one work are intentionally limited. Join the list to be the first to hear when the next Gut Transformation Journey opens — plus the occasional note on nourishing, seasonal living.",
    directEyebrow: "Direct contact",
    directTitle: "Prefer to reach out directly?",
    or: "Or",
    bookLink: "book a free discovery call",
    emailLabel: "Your email",
    join: "Join the waitlist",
    joining: "Adding you…",
    doneTitle: "You're on the list.",
    doneBody: "I'll be in touch when the next journey opens.",
  },
} as const;
