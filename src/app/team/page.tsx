import { fetchQuery } from "convex/nextjs";
import { api } from "../../../convex/_generated/api";
import { Title } from "../content/types";
import { MemberGrid } from "./MemberGrid";
import { AlumniList } from "./AlumniList";
import { PageHeader } from "../components/PageHeader";

export const revalidate = 60;

const Section = ({ title, members }: { title: string; members: any[] }) => {
  if (!members.length) return null;
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold text-gray-500 uppercase tracking-widest">
        {title}
      </h2>
      <MemberGrid members={members} />
    </div>
  );
};

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
    <div className="space-y-14">
      <PageHeader title="Team" />
      <Section title={professors.length > 1 ? "Group leads" : "Group lead"} members={professors} />
      <Section title={labManagers.length > 1 ? "Lab managers" : "Lab manager"} members={labManagers} />
      <Section title={labTechnicians.length > 1 ? "Lab technicians" : "Lab technician"} members={labTechnicians} />
      <Section title="Postdoctoral researchers" members={postDocs} />
      <Section title="Doctoral candidates" members={doctoralCandidates} />
      {alumni.length > 0 && (
        <div className="space-y-5">
          <h2 className="text-lg font-semibold text-gray-500 uppercase tracking-widest">
            {alumni.length === 1 ? "Alumnus / Alumna" : "Alumni"}
          </h2>
          <AlumniList members={alumni} />
        </div>
      )}
    </div>
  );
}
