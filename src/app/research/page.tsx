import { ResearchItem } from "../content/types";
import researchData from "../../../public/data/research.json";

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
        {research.map(({title, textBlocks}, index)=>
        <div key={index} className="space-y-4">
          {!!title && (
            <h2 className="text-xl font-semibold text-slate-800 mb-6 pb-3">
              {title}
            </h2>
          )}
           {textBlocks.map((text, textIndex) =>
             <div key={textIndex} className="text-slate-700 space-y-4">
               {parseTextWithLinks(text)}
             </div>
           )}
          </div>)}
      </div>
  </div>
  );
}
