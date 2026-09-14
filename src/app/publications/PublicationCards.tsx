import { fetchQuery } from "convex/nextjs";
import { api } from "../../../convex/_generated/api";
import type { Publication as PublicationType } from "../content";
import { FadeIn } from "../components/FadeIn";
import { PublicationCard } from "./PublicationCard";

const PublicationInYear = ({
  year, publications, teamMemberNames,
}: {
  year: number; publications: PublicationType[]; teamMemberNames: string[];
}) => (
  <div className="space-y-2">
    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">{year}</h3>
    {publications.map((pub, i) => (
      <PublicationCard
        key={`${year}-${i}`}
        {...pub}
        teamMemberNames={teamMemberNames}
      />
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
      {[...byYear.keys()].map((year, i) => (
        <FadeIn key={`year-${year}`} delay={i * 80}>
          <PublicationInYear
            year={year}
            publications={byYear.get(year)!}
            teamMemberNames={teamMemberNames}
          />
        </FadeIn>
      ))}
    </div>
  );
};
