import Papa from "papaparse";
import { OpenPosition } from "../content/types";
import { OpenPositionCard } from "./OpenPositionCard";

const OPEN_POSITIONS_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQWunO92NxSnFVWEb7e4dV4a8saxxdr8VKfR4rKmKb0s4JCxA6UOEdM0N1zx1tX6VodaGG9COZQ5ngq/pub?gid=657860477&single=true&output=csv";

async function getOpenPositions(): Promise<OpenPosition[]> {
  const res = await fetch(OPEN_POSITIONS_CSV_URL, { next: { revalidate: 300 } });
  const csv = await res.text();
  const { data } = Papa.parse<Record<string, string>>(csv, {
    header: true,
    skipEmptyLines: true,
  });
  return data.map((row) => ({
    title: row.title,
    description: row.description,
    requirements: row.requirements.split(";").map((s) => s.trim()),
    responsibilities: row.responsibilities.split(";").map((s) => s.trim()),
    location: row.location,
    type: row.type,
    duration: row.duration || undefined,
    isActive: row.isActive === "TRUE" || row.isActive === "true",
  }));
}

const NoOpenPosition = () => (
  <div className="space-y-6 text-slate-700">
    <div className="text-2xl">No open positions</div>
    <div>
      Unfortunately, we do not have any open positions at the moment. To learn
      more about the Precision Proteomics Center, please check out our other
      pages.
    </div>
  </div>
);

export default async function OpenPositions() {
  const openPositions = await getOpenPositions();
  const activeOpenPositions = openPositions.filter((v) => v.isActive);

  if (activeOpenPositions.length === 0) return <NoOpenPosition />;

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl mb-4">Open Positions</h2>
        <p className="text-slate-700">
          Join our team and contribute to cutting-edge proteomics research. We
          offer exciting opportunities for researchers at all career stages.
        </p>
      </div>
      <div className="space-y-6">
        {activeOpenPositions.map((position, index) => (
          <OpenPositionCard key={index} {...position} />
        ))}
      </div>
    </div>
  );
}
