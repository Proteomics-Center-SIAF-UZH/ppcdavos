import Papa from "papaparse";
import { ResearchItem } from "../content/types";
import { TextWithImageSection } from "../components/section/TextWithImageSection";
import { TextWithoutImageSection } from "../components/section/TextWithoutImageSection";

const RESEARCH_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQWunO92NxSnFVWEb7e4dV4a8saxxdr8VKfR4rKmKb0s4JCxA6UOEdM0N1zx1tX6VodaGG9COZQ5ngq/pub?gid=2033372340&single=true&output=csv";

async function getResearch(): Promise<ResearchItem[]> {
  const res = await fetch(RESEARCH_CSV_URL, { next: { revalidate: 300 } });
  const csv = await res.text();
  const { data } = Papa.parse<Record<string, string>>(csv, {
    header: true,
    skipEmptyLines: true,
  });
  return data.map((row) => ({
    title: row.title || undefined,
    textBlocks: row.textBlocks.split("|||").map((s) => s.trim()),
    imageSrc: row.imageSrc || undefined,
    imageAlt: row.imageAlt || undefined,
  }));
}

const parseTextWithLinks = (text: string) => {
  const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = text.split(markdownLinkRegex);
  return parts
    .map((part, index) => {
      if (index % 3 === 1) {
        const url = parts[index + 1];
        return (
          <a
            key={index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            {part}
          </a>
        );
      }
      if (index % 3 === 2) return null;
      return part;
    })
    .filter((part) => part !== null);
};

export default async function Research() {
  const research = await getResearch();

  return (
    <div className="gap-y-8">
      <h2 className="text-2xl mb-6">Research</h2>
      <div className="space-y-12">
        {research.map(({ title, textBlocks, imageSrc, imageAlt }, index) => {
          const textContent = (
            <>
              {textBlocks.map((text, textIndex) => (
                <p key={textIndex}>{parseTextWithLinks(text)}</p>
              ))}
            </>
          );
          if (imageSrc && imageAlt) {
            return (
              <div key={index}>
                <TextWithImageSection
                  title={title}
                  text={textContent}
                  imgSrc={imageSrc}
                  imgAlt={imageAlt}
                />
              </div>
            );
          } else {
            return (
              <div key={index}>
                <TextWithoutImageSection title={title} text={textContent} />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
