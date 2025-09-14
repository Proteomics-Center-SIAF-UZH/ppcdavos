"use client";

import { useEffect, useState } from "react";
import type { Member, Publication as PublicationType } from "../content";

const Publication = ({
  title,
  journal,
  link,
  authors,
  abstract,
  year,
  teamMemberNames,
}: {
  title: string;
  journal: string;
  link: string;
  abstract?: string;
  authors: string[];
  year: number;
  teamMemberNames: string[];
}) => {
  return (
    <div className="border-b p-6 my-8 space-y-2">
      <div className="flex flex-wrap justify-between">
        <a
          href={link}
          target="_blank"
          className="hover:text-blue-900 text-lg font-bold"
        >
          {title}
        </a>
      </div>
      <p className="scale-80">
        {authors.map((author, index) => {
          const isTeamMember = teamMemberNames.includes(author);
          const isLast = index === authors.length - 1;
          const isSecondLast = index === authors.length - 2;

          return (
            <span key={author}>
              {isTeamMember ? <b>{author}</b> : author}
              {!isLast && (isSecondLast ? " & " : ", ")}
            </span>
          );
        })}
      </p>
      <p className="text-gray-500 flex flex-wrap justify-between pr-2">
        <div>{journal}</div>
      </p>
    </div>
  );
};

const PublicationInYear = ({
  year,
  publications,
  teamMemberNames,
}: {
  year: number;
  publications: PublicationType[];
  teamMemberNames: string[];
}) => {
  return (
    <div className="space-y-10">
      <h3 className="text-xl">{year}</h3>
      {publications.map((publication, i) => (
        <Publication
          {...publication}
          year={year}
          key={`${year}-${i}`}
          teamMemberNames={teamMemberNames}
        />
      ))}
    </div>
  );
};

export const PublicationCards = () => {
  const [publications, setPublications] = useState<PublicationType[]>([]);
  const [teamMemberNames, setTeamMemberNames] = useState<string[]>([]);

  useEffect(() => {
    fetch("/data/publications.json")
      .then((res) => res.json())
      .then(setPublications)
      .catch(console.error);

    fetch("/data/team.json")
      .then((res) => res.json())
      .then((res: Member[]) => {
        const allNames = res.flatMap((member) => [
          member.name,
          ...(member.otherNames || []),
        ]);
        setTeamMemberNames(allNames);
      })
      .catch(console.error);
  }, []);

  console.log({ teamMemberNames });

  const sortedPublications = publications.sort((a, b) => b.year - a.year);

  const publicationsByYear = sortedPublications.reduce((res, publication) => {
    const publicationYear = publication.year;
    const publicationsInSameYear = res.get(publicationYear);
    if (publicationsInSameYear) {
      res.set(publicationYear, [...publicationsInSameYear, publication]);
      return res;
    }
    res.set(publicationYear, [publication]);
    return res;
  }, new Map<number, PublicationType[]>());

  const years = [...publicationsByYear.keys()];

  return (
    <div className="space-y-16">
      {years.map((v) => (
        <PublicationInYear
          year={v}
          publications={publicationsByYear.get(v) || []}
          key={`year-${v}`}
          teamMemberNames={teamMemberNames}
        />
      ))}
    </div>
  );
};
