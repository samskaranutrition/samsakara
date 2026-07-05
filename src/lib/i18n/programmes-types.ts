export type ProgrammeDetail = {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  duration: string;
  hook: string;
  meaning?: string;
  paragraphs: string[];
  highlight?: string;
  blueprintHeading?: string;
  blueprintIntro?: string;
  blueprintItems?: string[];
  blueprintNote?: string;
  evolvesHeading?: string;
  evolvesIntro?: string;
  evolvesItems?: string[];
  journeyHeading: string;
  journeyItems: string[];
  idealHeading: string;
  idealIf: string;
  leaveHeading: string;
  leaveWith: string[];
  closing?: string;
};

export type ProgrammesPageContent = {
  eyebrow: string;
  title: string;
  intro: string;
  labels: {
    journeyIncludes: string;
    idealIf: string;
    leaveWith: string;
    blueprintIncludes: string;
    blueprintEvolves: string;
    plus: string;
    overviewTitle: string;
    bookProgramme: string;
    viewDetails: string;
    payNote: string;
    intakeLink: string;
    intakeHint: string;
  };
  items: ProgrammeDetail[];
  discovery: {
    eyebrow: string;
    title: string;
    subtitle: string;
    paragraphs: string[];
    note: string;
    cta: string;
    bookingTitle: string;
  };
};

export type ApproachPageContent = {
  gut: {
    eyebrow: string;
    title: string;
    subtitle: string;
    paragraphs: string[];
  };
  how: {
    title: string;
    paragraphs: string[];
  };
  areas: {
    title: string;
    items: { title: string; subtitle: string; points: string[] }[];
  };
  cta: string;
};
