export enum Title {
  PROFESSOR = "Professor",
  LAB_MAMAGER = "Lab manager",
  LAB_TECHNICIAN = "Lab technician",
  DOCTORAL_CANDIDATE = "Doctoral candidate",
  VISITING_PHD_STUDENT = "Visiting PhD student",
  POST_DOC = "Post doctoral researcher",
}

export type Member = {
  name: string;
  otherNames?: string[];
  prefix?: string;
  title: Title;
  image: string;
  email: string;
  telephone?: string;
  isVisiting?: boolean;
  isAlumni?: boolean;
};

export type Publication = {
  title: string;
  journal: string;
  link: string;
  year: number;
  authors: string[];
  abstract?: string;
};

export type OpenPosition = {
  title: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  location: string;
  type: string; // e.g., "Full-time", "Part-time", "PhD", "Postdoc"
  duration?: string;
  isActive: boolean;
};
