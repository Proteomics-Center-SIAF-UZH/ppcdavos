import { fetchQuery } from "convex/nextjs";
import { api } from "../../../convex/_generated/api";
import { PageHeader } from "../components/PageHeader";
import { parseLinks } from "../utils/parseLinks";

export const revalidate = 60;

const DEFAULT_PARAGRAPHS = [
  "**Verantwortliche Stelle / Data Controller**\n\nPrecision Proteomics Center Davos\nSwiss Institute of Allergy and Asthma Research (SIAF)\nHerman Burchard Strasse 9, 7265 Davos, Switzerland\n\nContact: [christoph.messner@siaf.uzh.ch](mailto:christoph.messner@siaf.uzh.ch)",
  "**Hosting**\n\nThis website is hosted by Vercel Inc., 340 Pine Street, Suite 900, San Francisco, CA 94104, USA. When you visit this website, Vercel may collect server log data including your IP address, browser type, pages visited, and timestamps. This data is processed to ensure technical operation of the website and is not used to identify individual users. For more information, see [Vercel's Privacy Policy](https://vercel.com/legal/privacy-policy).",
  "**Data we collect**\n\nThis website does not use cookies for tracking or analytics purposes. We do not collect personal data through contact forms or user accounts. The only personal data displayed on this site (team member names, email addresses, and photos) is published with the consent of the individuals concerned.",
  "**External links**\n\nThis website contains links to external websites. We have no control over the content or privacy practices of those sites and accept no responsibility for them.",
  "**Your rights**\n\nUnder the Swiss Federal Act on Data Protection (nDSG) and, where applicable, the EU General Data Protection Regulation (GDPR), you have the right to access, rectify, or request deletion of any personal data we hold about you. To exercise these rights, please contact us at the address above.",
  "**Changes to this policy**\n\nThis privacy policy may be updated from time to time. The current version is always available at this page.",
];

const renderContent = (text: string) => {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    if (line.startsWith("**") && line.endsWith("**")) {
      return <h2 key={i} className="text-lg font-semibold mt-6 mb-2">{line.slice(2, -2)}</h2>;
    }
    if (!line.trim()) return <br key={i} />;
    return <p key={i}>{parseLinks(line)}</p>;
  });
};

export default async function Datenschutz() {
  const content = await fetchQuery(api.siteContent.getByKey, { key: "datenschutz" }).catch(() => null);
  const paragraphs = content?.paragraphs?.length ? content.paragraphs : DEFAULT_PARAGRAPHS;

  return (
    <div className="max-w-[65ch] space-y-4">
      <PageHeader title="Datenschutzerklärung" />
      <p className="text-sm text-gray-400 italic">
        Privacy Policy — last reviewed by UZH legal before publication.
      </p>
      <div className="space-y-3 text-slate-700 leading-relaxed">
        {paragraphs.map((p, i) => (
          <div key={i}>{renderContent(p)}</div>
        ))}
      </div>
    </div>
  );
}
