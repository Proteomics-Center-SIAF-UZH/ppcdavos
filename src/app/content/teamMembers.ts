import { Member, Title } from "./types";

const CHRISTOPH = {
  name: "Prof. Dr. Christoph Messner",
  title: Title.PROFESSOR,
  image: "christoph.jpeg",
  email: "christoph.messner@siaf.uzh.ch",
  telephone: "+41(0)81 420 07 30",
};

const PATRICK = {
  name: "Patrick Westermann",
  title: Title.LAB_MAMAGER,
  image: "patrick.jpeg",
  email: "patrick.westermann@siaf.uzh.ch",
  telephone: "+41(0)81 410 08 50",
};

const PHILIPP = {
  name: "Philipp Gessner",
  title: Title.DOCTORAL_CANDIDATE,
  image: "philipp.jpeg",
  email: "philipp.gessner@siaf.uzh.ch",
  telephone: undefined,
};

const XINDONG = {
  name: "Xindong Sun",
  title: Title.DOCTORAL_CANDIDATE,
  image: "xindong.jpeg",
  email: "xindong.sun@siaf.uzh.ch",
  telephone: undefined,
};

const LOPAMUDRA = {
  name: "Lopamudra Chatterjee",
  title: Title.DOCTORAL_CANDIDATE,
  image: "lopamudra.jpeg",
  email: "lopamudra.chatterjee@siaf.uzh.ch",
  telephone: undefined,
};

const ANNA_SOPHIA = {
  name: "Anna-Sophia Egger-Hörschinger",
  title: Title.POST_DOC,
  image: "anna-sophia.jpeg",
  email: "anna-sophia.egger@siaf.uzh.ch",
  telephone: undefined,
};

const TERESA = {
  name: "Teresa Betz",
  title: Title.LAB_TECHNICIAN,
  image: "teresa.jpeg",
  email: "teresa.betz@siaf.uzh.ch",
  telephone: undefined,
};

const ERIKA = {
  name: "Erika Esposito",
  title: Title.DOCTORAL_CANDIDATE,
  image: "erika.jpeg",
  email: "erika.esposito@siaf.uzh.ch",
  telephone: undefined,
  isVisiting: true,
};

export const TEAM_MEMBERS: Member[] = [
  CHRISTOPH,
  PATRICK,
  PHILIPP,
  XINDONG,
  LOPAMUDRA,
  ANNA_SOPHIA,
  TERESA,
  ERIKA,
];
