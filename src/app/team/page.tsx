"use client";

import { useEffect, useState } from "react";
import { Member, Title } from "../content/types";
import { MemberTable } from "./MemberTable";

export default function Team() {
  const [teamMembers, setTeamMembers] = useState<Member[]>([]);

  useEffect(() => {
    fetch("/data/team.json")
      .then((res) => res.json())
      .then(setTeamMembers)
      .catch(console.error);
  }, []);

  if (!teamMembers) return <div>Loading...</div>;

  const professors = teamMembers.filter((v) => v.title === Title.PROFESSOR);
  const labManagers = teamMembers.filter((v) => v.title === Title.LAB_MAMAGER);
  const doctoralCandidates = teamMembers.filter(
    (v) => v.title === Title.DOCTORAL_CANDIDATE,
  );
  const postDocs = teamMembers.filter((v) => v.title === Title.POST_DOC);
  const labTechnicians = teamMembers.filter(
    (v) => v.title === Title.LAB_TECHNICIAN,
  );

  return (
    <div className="space-y-16">
      <div className="mb-16 space-y-6">
        <h3 className="text-2xl">Group lead</h3>
        <MemberTable members={professors} />
      </div>
      <div className="mb-16 space-y-4">
        <h3 className="text-2xl">Lab manager</h3>
        <MemberTable members={labManagers} />
      </div>
      <div className="mb-16 space-y-4">
        <h3 className="text-2xl">Lab technician</h3>
        <MemberTable members={labTechnicians} />
      </div>
      <div className="mb-16 space-y-4">
        <h3 className="text-2xl">Post doctoral researchers</h3>
        <MemberTable members={postDocs} />
      </div>
      <div className="mb-16 space-y-4">
        <h3 className="text-2xl">Doctoral candidates</h3>
        <MemberTable members={doctoralCandidates} />
      </div>
    </div>
  );
}
