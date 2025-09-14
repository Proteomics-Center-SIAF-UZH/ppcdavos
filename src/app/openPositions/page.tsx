"use client";

import { useEffect, useState } from "react";
import { OpenPosition } from "../content/types";
import { OpenPositionCard } from "./OpenPositionCard";

const NoOpenPosition = () =>
  <div className="space-y-6 text-slate-700">
    <div className="text-2xl">
      No open positions
    </div>
    <div>
      Unfortunately, we do not have any open positions at the moment. To learn more about the Precision Proteomics Center, please check out our other pages.
    </div>
  </div>

export default function OpenPositions() {
  const [openPositions, setOpenPositions] = useState<OpenPosition[]>([]);

  useEffect(() => {
    fetch("/data/openPositions.json")
      .then((res) => res.json())
      .then(setOpenPositions)
      .catch(console.error);
  }, []);

  if (!openPositions) return <div>Loading...</div>;

  const activeOpenPositions = openPositions.filter((v) => v.isActive);
  const hasNoOpenPositions = activeOpenPositions.length === 0;

  if (hasNoOpenPositions) return <NoOpenPosition />;

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl mb-4">Open Positions</h2>
        <p className="text-slate-700">
          Join our team and contribute to cutting-edge proteomics research. We offer exciting opportunities for researchers at all career stages.
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
