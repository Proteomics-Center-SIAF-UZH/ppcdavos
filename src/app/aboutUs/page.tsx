import React from "react";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../convex/_generated/api";
import { TextWithImageSection } from "../components/section/TextWithImageSection";
import { PageHeader } from "../components/PageHeader";
import { parseLinks } from "../utils/parseLinks";

export const revalidate = 60;

const DEFAULT_PARAGRAPHS = [
  "With the decision of the Government of the Canton of Graubünden in 2020, the Swiss Institute of Allergy and Asthma Research (SIAF) was commissioned to establish and operate the Proteomics Center Davos as a Leading House, recognizing proteomics as a key technology in life sciences. The center aims to develop a nationally and internationally recognized research platform for cutting-edge proteome research. Fully integrated into SIAF's infrastructure, the Precision Proteomics Center fosters collaboration and scientific excellence within SIAF and its partner institutes.",
  "Since 2022, Christoph Messner has led the Proteomics Center Davos while holding a professorship at the University of Zurich. The center is dedicated to integrating proteomics with precision medicine, driving technological innovation, and advancing translational research. Strategically aligned with SIAF, other research institutes in the canton, and the University of Zurich, it plays a key role in strengthening proteomics research in Switzerland.",
];

const AboutUs = async () => {
  const content = await fetchQuery(api.siteContent.getByKey, { key: "aboutUs" }).catch(() => null);
  const paragraphs = content?.paragraphs?.length ? content.paragraphs : DEFAULT_PARAGRAPHS;
  const imageUrl = (content as any)?.imageUrl ?? "/images/about_us.jpg";
  const imageAlt = content?.imageAlt ?? "About us";

  return (
    <div className="grow">
      <PageHeader title="About Us" />
      <TextWithImageSection
        imgSrc={imageUrl}
        imgAlt={imageAlt}
        text={
          <>
            {paragraphs.map((p, i) => <p key={i}>{parseLinks(p)}</p>)}
          </>
        }
      />
    </div>
  );
};

export default AboutUs;
