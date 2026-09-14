import React from "react";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../convex/_generated/api";
import { TextWithoutImageSection } from "../components/section/TextWithoutImageSection";
import { PageHeader } from "../components/PageHeader";
import { parseLinks } from "../utils/parseLinks";

export const revalidate = 60;

const DEFAULT_PARAGRAPHS = [
  "We offer comprehensive proteomics expertise as a service, covering a wide range of sample types, including plasma, serum, fresh-frozen and FFPE tissues, and cells. Equipped with state-of-the-art mass spectrometry technology, we provide high-throughput protein analysis tailored to diverse research needs, with specific expertise in large cohort studies.",
  "With knowledge in immunological disorders and protein function, our team supports you throughout the entire workflow — from sample processing and proteomic analysis to functional insights and data interpretation.",
  "We have a particular focus on skin disease research and offer specialized expertise in non-invasive sampling techniques, such as adhesive tape strips.",
  "To collaborate with us, please contact Christoph Messner at [christoph.messner@siaf.uzh.ch](mailto:christoph.messner@siaf.uzh.ch).",
];

const Services = async () => {
  const content = await fetchQuery(api.siteContent.getByKey, { key: "services" }).catch(() => null);
  const paragraphs = content?.paragraphs?.length ? content.paragraphs : DEFAULT_PARAGRAPHS;

  return (
    <div>
      <PageHeader title="Services" />
      <TextWithoutImageSection
        text={
          <>
            {paragraphs.map((p, i) => <p key={i}>{parseLinks(p)}</p>)}
          </>
        }
      />
    </div>
  );
};

export default Services;
