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

export const TEAM_MEMBERS: Member[] = [
    CHRISTOPH,
    PATRICK,
    PHILIPP,
    XINDONG,
    LOPAMUDRA,
];
