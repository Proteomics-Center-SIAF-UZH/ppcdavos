import { fetchQuery } from "convex/nextjs";
import { api } from "../../../convex/_generated/api";
import { MemberGrid } from "./MemberGrid";
import { AlumniList } from "./AlumniList";
import { PageHeader } from "../components/PageHeader";

export const revalidate = 60;

export default async function Team() {
  const teamMembers = await fetchQuery(api.team.list);

  const active = teamMembers.filter((m) => !m.isAlumni);
  const alumni = teamMembers.filter((m) => m.isAlumni);

  return (
    <div className="space-y-20">
      <PageHeader title="Team" />
      <MemberGrid members={active} />
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
