import { fetchQuery } from "convex/nextjs";
import { api } from "../../../convex/_generated/api";
import { OpenPositionCard } from "./OpenPositionCard";
import { PageHeader } from "../components/PageHeader";

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

  if (active.length === 0) return (
    <div>
      <PageHeader title="Open Positions" />
      <NoOpenPosition />
    </div>
  );

  return (
    <div className="space-y-6">
      <PageHeader title="Open Positions" subtitle="Join our team and contribute to cutting-edge proteomics research." />
      <div className="mb-8">
        <p className="text-slate-700">
          We offer exciting opportunities for researchers at all career stages.
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
