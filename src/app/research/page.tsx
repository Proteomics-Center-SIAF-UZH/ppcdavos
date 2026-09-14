import { fetchQuery } from "convex/nextjs";
import { api } from "../../../convex/_generated/api";
import { TextWithImageSection } from "../components/section/TextWithImageSection";
import { TextWithoutImageSection } from "../components/section/TextWithoutImageSection";

export const revalidate = 60;

const parseTextWithLinks = (text: string) => {
  const parts = text.split(/\[([^\]]+)\]\(([^)]+)\)/g);
  return parts.map((part, index) => {
    if (index % 3 === 1) {
      const url = parts[index + 1];
      return (
        <a key={index} href={url} target="_blank" rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline">
          {part}
        </a>
      );
    }
    if (index % 3 === 2) return null;
    return part;
  }).filter(Boolean);
};

export default async function Research() {
  const research = await fetchQuery(api.research.list);

  return (
    <div className="gap-y-8">
      <h2 className="text-2xl mb-6">Research</h2>
      <div className="space-y-12">
        {research.map(({ title, textBlocks, imageSrc, imageAlt }, index) => {
          const textContent = (
            <>
              {textBlocks.map((text, i) => (
                <p key={i}>{parseTextWithLinks(text)}</p>
              ))}
            </>
          );
          return imageSrc && imageAlt ? (
            <div key={index}>
              <TextWithImageSection title={title} text={textContent} imgSrc={imageSrc} imgAlt={imageAlt} />
            </div>
          ) : (
            <div key={index}>
              <TextWithoutImageSection title={title} text={textContent} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
