import { fetchQuery } from "convex/nextjs";
import { api } from "../../../convex/_generated/api";
import { TextWithImageSection } from "../components/section/TextWithImageSection";
import { TextWithoutImageSection } from "../components/section/TextWithoutImageSection";
import { PageHeader } from "../components/PageHeader";
import { FadeIn } from "../components/FadeIn";
import { parseLinks } from "../utils/parseLinks";

export const revalidate = 60;

export default async function Research() {
  const research = await fetchQuery(api.research.list);

  let sectionCount = 0;

  return (
    <div className="space-y-0">
      <PageHeader title="Research" />
      <div className="space-y-20">
        {research.map(({ title, textBlocks, imageSrc, imageAlt }, index) => {
          if (title) sectionCount++;
          const num = sectionCount;

          const textContent = (
            <>
              {(textBlocks as string[]).map((text, i) => (
                <p key={i}>{parseLinks(text)}</p>
              ))}
            </>
          );

          const titleEl = title ? (
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-8 rounded-full bg-sky-950 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                {String(num).padStart(2, "0")}
              </span>
              <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
            </div>
          ) : null;

          return imageSrc && imageAlt ? (
            <FadeIn key={index}>
              {titleEl}
              <TextWithImageSection text={textContent} imgSrc={imageSrc} imgAlt={imageAlt} />
            </FadeIn>
          ) : (
            <FadeIn key={index}>
              {titleEl}
              <TextWithoutImageSection text={textContent} />
            </FadeIn>
          );
        })}
      </div>
    </div>
  );
}
