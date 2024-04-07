import { TextWithImageSection } from "../components/section/TextWithImageSection";
import { TEAM_MEMBERS } from "../content";
import { Title } from "../content/types";
import { MemberTable } from "./MemberTable";

export default function Team() {
  const professors = TEAM_MEMBERS.filter((v) => v.title === Title.PROFESSOR);
  const labManagers = TEAM_MEMBERS.filter((v) => v.title === Title.LAB_MAMAGER);
  const doctoralCandidates = TEAM_MEMBERS.filter(
    (v) => v.title === Title.DOCTORAL_CANDIDATE,
  );

  return (
    <div className="p-24 space-y-16">
      <div className="mb-16 space-y-4">
        <h3 className="text-2xl">Group lead</h3>
        <MemberTable members={professors} />
      </div>
      <div className="mb-16 space-y-4">
        <h3 className="text-2xl">Lab manager</h3>
        <MemberTable members={labManagers} />
      </div>
      <div className="mb-16 space-y-4">
        <h3 className="text-2xl">Doctoral candidates</h3>
        <MemberTable members={doctoralCandidates} />
      </div>
    </div>
  );
}
