import { EmptyPage } from "../components/EmptyPage";
import { OPEN_POSITIONS } from "../content/openPositions";

const NoOpenPosition = () =>
  <div className="space-y-6 max-w-3xl mx-auto text-slate-700">
    <div className="text-2xl">
      No open positions
    </div>
    <div>
      Unfortunately, we do not have any open positions at the moment. To learn more about the Precision Proteomics Center, please check out our other pages.
    </div>
  </div>

export default function OpenPositions() {

  const activeOpenPositions = OPEN_POSITIONS.filter((v) => v.isActive)
  const hasNoOpenPositions = activeOpenPositions.length === 0

  if (hasNoOpenPositions) return <NoOpenPosition />

  return <EmptyPage />;
}
