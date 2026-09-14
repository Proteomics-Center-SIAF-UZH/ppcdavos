import { fetchQuery } from "convex/nextjs";
import { api } from "../../../convex/_generated/api";
import { Title } from "../content/types";
import { MemberTable } from "./MemberTable";
import { AlumniList } from "./AlumniList";
import { PageHeader } from "../components/PageHeader";

export const revalidate = 60;

export default async function Team() {
  const teamMembers = await fetchQuery(api.team.list);

  const active = teamMembers.filter((m) => !m.isAlumni);
  const alumni = teamMembers.filter((m) => m.isAlumni);

  const professors = active.filter((m) => m.title === Title.PROFESSOR);
  const labManagers = active.filter((m) => m.title === Title.LAB_MAMAGER);
  const labTechnicians = active.filter((m) => m.title === Title.LAB_TECHNICIAN);
  const postDocs = active.filter((m) => m.title === Title.POST_DOC);
  const doctoralCandidates = active.filter((m) => m.title === Title.DOCTORAL_CANDIDATE);

  return (
    <div className="space-y-16">
      <PageHeader title="Team" />
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
          <h3 className="text-2xl">{alumni.length === 1 ? "Alumnus/Alumna" : "Alumni"}</h3>
          <AlumniList members={alumni} />
        </div>
      )}
    </div>
  );
}
