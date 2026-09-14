import { fetchQuery } from "convex/nextjs";
import { api } from "../../../convex/_generated/api";
import { OpenPositionCard } from "./OpenPositionCard";
import { PageHeader } from "../components/PageHeader";

export const revalidate = 60;

export default async function OpenPositions() {
  const positions = await fetchQuery(api.openPositions.list);
  const active = positions.filter((p) => p.isActive);

  return (
    <div className="space-y-6">
      <PageHeader title="Open Positions" />
      {active.length === 0 ? (
        <p className="text-slate-500 italic">
          There are no open positions at the moment. Please check back later.
        </p>
      ) : (
        <div className="space-y-6">
          {active.map((position, index) => (
            <OpenPositionCard key={index} {...position} />
          ))}
        </div>
      )}
    </div>
  );
}
