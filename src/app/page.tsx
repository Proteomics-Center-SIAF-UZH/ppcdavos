export default function Home() {
  return (
    <div className="space-y-10">
      <img
        src="/images/siaf_birdview.png"
        alt="SIAF campus in Davos"
        className="w-full h-72 object-cover rounded-2xl shadow-md"
      />

      <div className="space-y-3">
        <h1 className="text-4xl font-bold text-sky-950 leading-tight tracking-tight">
          Precision Proteomics<br />Center Davos
        </h1>
        <p className="text-base font-medium text-sky-700 uppercase tracking-widest">
          University of Zurich · SIAF
        </p>
        <div className="w-12 h-1 bg-sky-950 rounded-full" />
      </div>

      <div className="text-slate-700 space-y-4 max-w-3xl leading-relaxed">
        <p>
          The Precision Proteomics Center is part of{" "}
          <a href="https://www.siaf.uzh.ch/" target="_blank" className="text-sky-700 hover:underline">
            the Swiss Institute of Allergy and Asthma Research (SIAF)
          </a>{" "}
          and associated with the University of Zurich. Based on the medicine campus in Davos and equipped with high-end instrumentation (Thermo Orbitrap Eclipse), we develop and apply cutting-edge mass spectrometry technologies for the proteome analysis of clinical samples — body fluids, tissues, and cells.
        </p>
        <p>
          With the decision of the Government of the Canton of Graubünden in 2020, SIAF was commissioned to establish and operate the Proteomics Center Davos as a Leading House, recognizing proteomics as a key technology in life sciences. Since 2022, Prof. Christoph Messner has led the center while holding a professorship at the University of Zurich.
        </p>
        <p>
          We aim to identify new biomarkers and disease mechanisms that contribute to the next generation of personalized treatments, with a particular focus on allergies, skin diseases, and oncology.
        </p>
      </div>
    </div>
  );
}
