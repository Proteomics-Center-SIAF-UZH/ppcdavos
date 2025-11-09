import { ResearchItem } from "../content/types";
import researchData from "../../../public/data/research.json";
import { TextWithImageSection } from "../components/section/TextWithImageSection";
import { TextWithoutImageSection } from "../components/section/TextWithoutImageSection";

// Function to convert markdown-style links [text](url) to clickable links
const parseTextWithLinks = (text: string) => {
  const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = text.split(markdownLinkRegex);
  
  return parts.map((part, index) => {
    // Check if this part is a link text (odd indices after split)
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
    // Skip URL parts (they're handled above)
    if (index % 3 === 2) {
      return null;
    }
    // Return regular text
    return part;
  }).filter(part => part !== null);
};

export default function Research() {
  const research: ResearchItem[] = researchData as ResearchItem[];
  
  return (
    <div className="gap-y-8">
      <h2 className="text-2xl mb-6">Research</h2>
      <div className="space-y-12">
        {research.map(({title, textBlocks, imageSrc, imageAlt}, index) => {
          const textContent = (
            <>
              {textBlocks.map((text, textIndex) => (
                <p key={textIndex}>{parseTextWithLinks(text)}</p>
              ))}
            </>
          );

          // Use TextWithImageSection if image is provided, otherwise TextWithoutImageSection
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
                <TextWithoutImageSection
                  title={title}
                  text={textContent}
                />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
