import React from "react";
import { TextWithoutImageSection } from "../components/section/TextWithoutImageSection";
import { PageHeader } from "../components/PageHeader";

const Services = async () => {
  return (
    <div>
      <PageHeader title="Services" subtitle="Proteomics as a service — from sample processing to data interpretation." />
      <TextWithoutImageSection
        text={
          <>
            <p>
              We offer comprehensive proteomics expertise as a service, covering a wide range of sample types, including plasma, serum, fresh-frozen and FFPE tissues, and cells. Equipped with state-of-the-art mass spectrometry technology, we provide high-throughput protein analysis tailored to diverse research needs, with specific expertise in large cohort studies.
            </p>
            <p>
              With knowledge in immunological disorders and protein function, our team supports you throughout the entire workflow — from sample processing and proteomic analysis to functional insights and data interpretation.
            </p>
            <p>
              We have a particular focus on skin disease research and offer specialized expertise in non-invasive sampling techniques, such as adhesive tape strips.
            </p>
            <p>
              To collaborate with us, please contact Christoph Messner at{" "}
              <a href="mailto:christoph.messner@siaf.uzh.ch" className="text-sky-700 hover:underline">
                christoph.messner@siaf.uzh.ch
              </a>.
            </p>
          </>
        }
      />
    </div>
  );
};

export default Services;
