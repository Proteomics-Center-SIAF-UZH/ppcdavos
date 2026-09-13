import Papa from "papaparse";
import type { Publication as PublicationType } from "../content";

const PUBLICATIONS_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQWunO92NxSnFVWEb7e4dV4a8saxxdr8VKfR4rKmKb0s4JCxA6UOEdM0N1zx1tX6VodaGG9COZQ5ngq/pub?gid=692909773&single=true&output=csv";

const TEAM_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQWunO92NxSnFVWEb7e4dV4a8saxxdr8VKfR4rKmKb0s4JCxA6UOEdM0N1zx1tX6VodaGG9COZQ5ngq/pub?gid=0&single=true&output=csv";

async function getPublications(): Promise<PublicationType[]> {
  const res = await fetch(PUBLICATIONS_CSV_URL, { next: { revalidate: 300 } });
  const csv = await res.text();
  const { data } = Papa.parse<Record<string, string>>(csv, {
    header: true,
    skipEmptyLines: true,
  });
  return data.map((row) => ({
    title: row.title,
    journal: row.journal,
    link: row.link,
    year: parseInt(row.year),
    authors: row.authors.split(";").map((a) => a.trim()),
    abstract: row.abstract || undefined,
  }));
}

async function getTeamMemberNames(): Promise<string[]> {
  const res = await fetch(TEAM_CSV_URL, { next: { revalidate: 300 } });
  const csv = await res.text();
  const { data } = Papa.parse<Record<string, string>>(csv, {
    header: true,
    skipEmptyLines: true,
  });
  return data.flatMap((row) => {
    const names = [row.name];
    if (row.otherNames) names.push(...row.otherNames.split(";").map((s) => s.trim()));
    return names;
  });
}

const Publication = ({
  title,
  journal,
  link,
  authors,
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
    <div className="border-b p-6 my-6 space-y-2 hover:bg-gray-50 rounded-lg transition-colors">
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
      <h3 className="text-xl font-semibold pl-3 border-l-4 border-sky-950">{year}</h3>
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

export const PublicationCards = async () => {
  const [publications, teamMemberNames] = await Promise.all([
    getPublications(),
    getTeamMemberNames(),
  ]);

  const sortedPublications = [...publications].sort((a, b) => b.year - a.year);

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
