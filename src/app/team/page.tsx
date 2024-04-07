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
      <TextWithImageSection
        title={"About the lab"}
        imgSrc={"images/siaf_birdview.png"}
        imgAlt="Siaf Birdview"
        text={
          <>
            The Precision Proteomics Center is part of{" "}
            <a href="https://www.siaf.uzh.ch/" target="_blank">
              the Swiss Institute of Allergy and Asthma Research (SIAF)
            </a>{" "}
            and associated with the University of Zurich. It is based on the
            medicine campus in Davos and equipped with high-end instrumentation
            (Thermo Orbitrap Eclipse). At the Precision Proteomics Center, we
            develop and apply cutting edge MS based technologies for the
            proteome analyses of clinical samples (body fluids, tissues, cells).
            We aim to identify new biomarkers and disease mechanisms that
            contribute to the development of the next generation of personalized
            treatments.
          </>
        }
      />
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
