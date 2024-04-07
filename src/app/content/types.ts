export enum Title {
  PROFESSOR = "Professor",
  LAB_MAMAGER = "Lab manager",
  DOCTORAL_CANDIDATE = "Doctoral candidate",
}

export type Member = {
  name: string;
  title: Title;
  image: string;
  email: string;
  telephone: string;
};
