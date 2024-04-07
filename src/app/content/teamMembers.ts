import { Member, Title } from "./types";

const CHRISTOPH = {
    name: "Prof. Dr. Christoph Messner",
    title: Title.PROFESSOR,
    image: "christoph.jpeg",
    email: "dummy@email.com",
    telephone: "+410777777777",
};

const PATRICK = {
    name: "Patrick Westermann",
    title: Title.LAB_MAMAGER,
    image: "patrick.jpeg",
    email: "dummy@email.com",
    telephone: "+410777777777",
};

const PHILIPP = {
    name: "Philipp Gessner",
    title: Title.DOCTORAL_CANDIDATE,
    image: "philipp.jpeg",
    email: "dummy@email.com",
    telephone: "+410777777777",
};

const XINDONG = {
    name: "Xindong Sun",
    title: Title.DOCTORAL_CANDIDATE,
    image: "xindong.jpeg",
    email: "dummy@email.com",
    telephone: "+410777777777",
};

const LOPAMUDRA = {
    name: "Lopamudra Chatterjee",
    title: Title.DOCTORAL_CANDIDATE,
    image: "lopamudra.jpeg",
    email: "dummy@email.com",
    telephone: "+410777777777",
};

export const TEAM_MEMBERS: Member[] = [
    CHRISTOPH,
    PATRICK,
    PHILIPP,
    XINDONG,
    LOPAMUDRA,
];
