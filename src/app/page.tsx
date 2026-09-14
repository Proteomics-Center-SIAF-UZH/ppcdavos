import { fetchQuery } from "convex/nextjs";
import { api } from "../../convex/_generated/api";
import { parseLinks } from "./utils/parseLinks";

export const revalidate = 60;

const DEFAULT_PARAGRAPHS = [
  "The Precision Proteomics Center is part of the [Swiss Institute of Allergy and Asthma Research (SIAF)](https://www.siaf.uzh.ch/) and associated with the University of Zurich. Based on the medicine campus in Davos and equipped with high-end instrumentation (Thermo Orbitrap Eclipse), we develop and apply cutting-edge mass spectrometry technologies for the proteome analysis of clinical samples — body fluids, tissues, and cells.",
  "With the decision of the Government of the Canton of Graubünden in 2020, SIAF was commissioned to establish and operate the Proteomics Center Davos as a Leading House, recognizing proteomics as a key technology in life sciences. Since 2022, Prof. Christoph Messner has led the center while holding a professorship at the University of Zurich.",
  "We aim to identify new biomarkers and disease mechanisms that contribute to the next generation of personalized treatments, with a particular focus on allergies, skin diseases, and oncology.",
];

export default async function Home() {
  const content = await fetchQuery(api.siteContent.getByKey, { key: "home" }).catch(() => null);
  const paragraphs = content?.paragraphs?.length ? content.paragraphs : DEFAULT_PARAGRAPHS;
  const imageUrl = (content as any)?.imageUrl ?? "/images/siaf_birdview.png";
  const imageAlt = content?.imageAlt ?? "SIAF campus in Davos";

  return (
    <div className="space-y-10">
      <img
        src={imageUrl}
        alt={imageAlt}
        className="w-full h-72 object-cover rounded-2xl shadow-md"
      />

      <div className="space-y-3">
        <h1 className="text-4xl font-bold text-sky-950 leading-tight tracking-tight">
          Precision Proteomics<br />Center Davos
        </h1>
        <p className="text-base font-medium text-sky-700 uppercase tracking-widest">
          University of Zurich · SIAF
        </p>
        <div className="w-12 h-1 bg-sky-950 rounded-full" />
      </div>

      <div className="text-slate-700 space-y-4 max-w-3xl leading-relaxed">
        {paragraphs.map((p, i) => <p key={i}>{parseLinks(p)}</p>)}
      </div>
    </div>
  );
}
