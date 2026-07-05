export type PageMetaKey =
  | "home"
  | "about"
  | "approach"
  | "programmes"
  | "contact"
  | "faq"
  | "intake"
  | "privacy"
  | "terms"
  | "cookies";

export type PageMetaMap = Record<
  PageMetaKey,
  {
    title: string;
    description: string;
  }
>;
