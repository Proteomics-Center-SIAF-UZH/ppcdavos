import { fetchQuery } from "convex/nextjs";
import { api } from "../../../convex/_generated/api";
import type { Publication as PublicationType } from "../content";

const Publication = ({
  title, journal, link, authors, year, teamMemberNames,
}: {
  title: string; journal: string; link: string; abstract?: string;
  authors: string[]; year: number; teamMemberNames: string[];
}) => (
  <div className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 space-y-2">
    <div className="flex flex-wrap justify-between">
      <a href={link} target="_blank" className="hover:text-blue-900 text-lg font-bold">
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

const PublicationInYear = ({
  year, publications, teamMemberNames,
}: {
  year: number; publications: PublicationType[]; teamMemberNames: string[];
}) => (
  <div className="space-y-4">
    <h3 className="text-xl font-semibold pl-3 border-l-4 border-sky-950">{year}</h3>
    {publications.map((pub, i) => (
      <Publication {...pub} year={year} key={`${year}-${i}`} teamMemberNames={teamMemberNames} />
    ))}
  </div>
);

export const PublicationCards = async () => {
  const [publications, teamMembers] = await Promise.all([
    fetchQuery(api.publications.list),
    fetchQuery(api.team.list),
  ]);

  const teamMemberNames = teamMembers.flatMap((m) => [m.name, ...(m.otherNames ?? [])]);
  const sorted = [...publications].sort((a, b) => b.year - a.year);

  const byYear = sorted.reduce((map, pub) => {
    map.set(pub.year, [...(map.get(pub.year) ?? []), pub]);
    return map;
  }, new Map<number, PublicationType[]>());

  return (
    <div className="space-y-16">
      {[...byYear.keys()].map((year) => (
        <PublicationInYear
          year={year}
          publications={byYear.get(year)!}
          key={`year-${year}`}
          teamMemberNames={teamMemberNames}
        />
      ))}
    </div>
  );
};
