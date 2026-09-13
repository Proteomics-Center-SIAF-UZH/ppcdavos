import Papa from "papaparse";
import { Member, Title } from "../content/types";
import { MemberTable } from "./MemberTable";
import { AlumniList } from "./AlumniList";

const TEAM_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQWunO92NxSnFVWEb7e4dV4a8saxxdr8VKfR4rKmKb0s4JCxA6UOEdM0N1zx1tX6VodaGG9COZQ5ngq/pub?output=csv";

async function getTeamMembers(): Promise<Member[]> {
  const url = process.env.GOOGLE_SHEETS_TEAM_CSV_URL ?? TEAM_CSV_URL;

  const res = await fetch(url, { next: { revalidate: 3600 } });
  const csv = await res.text();

  const { data } = Papa.parse<Record<string, string>>(csv, {
    header: true,
    skipEmptyLines: true,
  });

  return data.map((row) => ({
    name: row.name,
    otherNames: row.otherNames
      ? row.otherNames.split(";").map((s) => s.trim())
      : undefined,
    prefix: row.prefix || undefined,
    title: row.title as Title,
    image: row.image,
    email: row.email,
    telephone: row.telephone || undefined,
    isAlumni: row.isAlumni === "TRUE" || row.isAlumni === "true",
    isVisiting: row.isVisiting === "TRUE" || row.isVisiting === "true",
  }));
}

export default async function Team() {
  const teamMembers = await getTeamMembers();

  const activeMembers = teamMembers.filter((v) => !v.isAlumni);

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
          <h3 className="text-2xl">{alumni.length === 1 ? "Alumnus/Alumna" : "Alumni"}</h3>
          <AlumniList members={alumni} />
        </div>
      )}
    </div>
  );
}
