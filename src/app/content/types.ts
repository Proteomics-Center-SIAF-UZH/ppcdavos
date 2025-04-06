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
  title: Title;
  image: string;
  email: string;
  telephone?: string;
  isVisiting?: boolean;
};

export type Publication = {
  title: string;
  journal: string;
  link: string;
  year: number;
  Authors: JSX.Element;
  abstract?: string;
};

export type OpenPositions = {
  title: string;
  isActive: boolean;
};
