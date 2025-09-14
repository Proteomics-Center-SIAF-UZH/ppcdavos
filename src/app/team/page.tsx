"use client";

import { useEffect, useState } from "react";
import { Member, Title } from "../content/types";
import { MemberTable } from "./MemberTable";
import { AlumniList } from "./AlumniList";

export default function Team() {
  const [teamMembers, setTeamMembers] = useState<Member[]>([]);

  useEffect(() => {
    fetch("/data/team.json")
      .then((res) => res.json())
      .then(setTeamMembers)
      .catch(console.error);
  }, []);

  if (!teamMembers) return <div>Loading...</div>;

  const activeMembers = teamMembers.filter((v) => !v.isAlumni)

  const professors = activeMembers.filter((v) => v.title === Title.PROFESSOR);
  const labManagers = activeMembers.filter((v) => v.title === Title.LAB_MAMAGER);
  const doctoralCandidates = activeMembers.filter(
    (v) => v.title === Title.DOCTORAL_CANDIDATE,
  );
  const postDocs = activeMembers.filter((v) => v.title === Title.POST_DOC);
  const labTechnicians = activeMembers.filter(
    (v) => v.title === Title.LAB_TECHNICIAN,
  );
  const alumni = teamMembers.filter((v) => v.isAlumni === true);

  return (
    <div className="space-y-16">
      <div className="mb-16 space-y-6">
        <h3 className="text-2xl">Group lead{professors.length > 1 ? "s" : ""}</h3>
        <MemberTable members={professors} />
      </div>
      <div className="mb-16 space-y-4">
        <h3 className="text-2xl">Lab manager{labManagers.length > 1 ? "s" : ""}</h3>
        <MemberTable members={labManagers} />
      </div>
      <div className="mb-16 space-y-4">
        <h3 className="text-2xl">Lab technician{labTechnicians.length > 1 ? "s" : ""}</h3>
        <MemberTable members={labTechnicians} />
      </div>
      <div className="mb-16 space-y-4">
        <h3 className="text-2xl">Post doctoral researcher{postDocs.length > 1 ? "s" : ""}</h3>
        <MemberTable members={postDocs} />
      </div>
      <div className="mb-16 space-y-4">
        <h3 className="text-2xl">Doctoral candidate{doctoralCandidates.length > 1 ? "s" : ""}</h3>
        <MemberTable members={doctoralCandidates} />
      </div>
      {alumni.length > 0 && (
        <div className="mb-16 space-y-4">
          <h3 className="text-2xl">{alumni.length === 1 ? "Alumnus/Alumna" : "Alumni"}
</h3>
          <AlumniList members={alumni} />
        </div>
      )}
    </div>
  );
}
