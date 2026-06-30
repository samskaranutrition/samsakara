export type FaqItem = { question: string; paragraphs: string[] };
export type FaqLegalSection = { heading: string; paragraphs: string[] };

export type FaqTranslations = {
  eyebrow: string;
  title: string;
  items: FaqItem[];
  ctaEyebrow: string;
  termsTitle: string;
  termsEffective: string;
  termsIntro: string;
  termsSections: FaqLegalSection[];
  termsContactHeading: string;
  termsContactIntro: string;
  termsContactName: string;
  termsAcknowledgement: string;
};
