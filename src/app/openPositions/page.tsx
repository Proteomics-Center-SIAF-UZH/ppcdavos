import { fetchQuery } from "convex/nextjs";
import { api } from "../../../convex/_generated/api";
import { OpenPositionCard } from "./OpenPositionCard";

export const revalidate = 60;

const NoOpenPosition = () => (
  <div className="space-y-6 text-slate-700">
    <div className="text-2xl">No open positions</div>
    <div>
      Unfortunately, we do not have any open positions at the moment. To learn
      more about the Precision Proteomics Center, please check out our other pages.
    </div>
  </div>
);

export default async function OpenPositions() {
  const positions = await fetchQuery(api.openPositions.list);
  const active = positions.filter((p) => p.isActive);

  if (active.length === 0) return <NoOpenPosition />;

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl mb-4">Open Positions</h2>
        <p className="text-slate-700">
          Join our team and contribute to cutting-edge proteomics research. We offer
          exciting opportunities for researchers at all career stages.
        </p>
      </div>
      <div className="space-y-6">
        {active.map((position, index) => (
          <OpenPositionCard key={index} {...position} />
        ))}
      </div>
    </div>
  );
}
