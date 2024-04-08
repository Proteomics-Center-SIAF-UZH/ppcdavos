import { Publication, publications } from "../content";

const Publication = ({
  title,
  journal,
  link,
  abstract,
  Authors,
}: {
  title: string;
  journal: string;
  link: string;
  abstract: string;
  Authors: JSX.Element;
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
      <p className="scale-80">{Authors}</p>
      <p className="text-gray-500 flex flex-wrap justify-between pr-2">
        <div>
          {journal}
        </div>
      </p>
    </div>
  );
};

const PublicationInYear = ({
  year,
  publications,
}: {
  year: number;
  publications: Publication[];
}) => {
  return (
    <div className="space-y-10">
      <h3 className="text-xl">{year}</h3>
      {publications.map((publication, i) => (
        <Publication {...publication} key={`${year}-${i}`} />
      ))}
    </div>
  );
};

export const PublicationCards = () => {
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
  }, new Map<number, Publication[]>());

  const years = [...publicationsByYear.keys()];

  return (
    <div className="space-y-16">
      {years.map((v) => (
        <PublicationInYear
          year={v}
          publications={publicationsByYear.get(v) || []}
          key={`year-${v}`}
        />
      ))}
    </div>
  );
};
