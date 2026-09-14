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
        <div className="space-y-4 text-slate-700">
          <p>
            Unfortunately, we do not have any open positions at the moment. To learn
            more about the Precision Proteomics Center, please check out our other pages.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <p className="text-slate-700">
            Join our team and contribute to cutting-edge proteomics research. We offer
            exciting opportunities for researchers at all career stages.
          </p>
          {active.map((position, index) => (
            <OpenPositionCard key={index} {...position} />
          ))}
        </div>
      )}
    </div>
  );
}
