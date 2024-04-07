import { TextWithImageSection } from "./components/section/TextWithImageSection";

export default function Home() {
  return (
    <div className="grow">
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
    </div>
  );
}
