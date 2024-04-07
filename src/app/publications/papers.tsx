export type Publication = {
  title: string;
  journal: string;
  link: string;
  year: number;
  Authors: JSX.Element;
  abstract: string;
};

export const publications: Publication[] = [
  {
    title:
      "Persistent complement dysregulation with signs of thromboinflammation in active Long Covid",
    journal: "Science",
    Authors: (
      <div>
        Cervia-Hasler, C., Brüningk, S. C., Hoch, T., Fan, B., Muzio, G.,
        Thompson, R. C., Ceglarek, L., Meledin R., <b>Westermann P.</b>, ...{" "}
        <b>Messner, C. B.</b>, Beckmann, N. D., Borgwardt, K. & Boyman, O.{" "}
      </div>
    ),
    link: "https://www.science.org/doi/10.1126/science.adg7942",
    year: 2024,
    abstract:
      "Some individuals can endure persistent, debilitating symptoms for many months after an initial severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2) infection. However, the factors underpinning these health issues, called Long Covid, are poorly understood. Comparing the blood of patients with confirmed SARS-CoV-2 infection with that of uninfected controls, Cervia-Hasler et al. found that patients experiencing Long COVID exhibited changes to blood serum proteins indicating activation of the immune system’s complement cascade, altered coagulation, and tissue injury (see the Perspective by Ruf). At the cellular level, Long Covid was linked to aggregates comprising monocytes and platelets. These findings provide a resource of potential biomarkers for diagnosis and may inform directions for treatments. —Sarah H. Ross",
  },
  {
    title: "Cellular control of protein levels: A systems biology perspective",
    journal: "Proteomics",
    Authors: (
      <div>
        Victoria Munro, Van Kelly, <b>Christoph B. Messner</b>, Georg
        Kustatscher
      </div>
    ),
    link: "https://analyticalsciencejournals.onlinelibrary.wiley.com/doi/full/10.1002/pmic.202200220",
    year: 2023,
    abstract:
      "How cells regulate protein levels is a central question of biology. Over the past decades, molecular biology research has provided profound insights into the mechanisms and the molecular machinery governing each step of the gene expression process, from transcription to protein degradation. Recent advances in transcriptomics and proteomics have complemented our understanding of these fundamental cellular processes with a quantitative, systems-level perspective. Multi-omic studies revealed significant quantitative, kinetic and functional differences between the genome, transcriptome and proteome. While protein levels often correlate with mRNA levels, quantitative investigations have demonstrated a substantial impact of translation and protein degradation on protein expression control. In addition, protein-level regulation appears to play a crucial role in buffering protein abundances against undesirable mRNA expression variation. These findings have practical implications for many fields, including gene function prediction and precision medicine.",
  },
  {
    title:
      "Oxonium ion scanning mass spectrometry for large-scale plasma glycoproteomics",
    journal: "Nature biomedical engineering",
    Authors: (
      <div>
        White, M. E. H., Sinn, L. R., Jones, M. D., de Folter, J., Aulakh, S.
        K., Wang, Z., Flynn, H. R., … <b>Messner, C.B.</b>* & Ralser M*
      </div>
    ),
    link: "https://analyticalsciencejournals.onlinelibrary.wiley.com/doi/full/10.1002/pmic.202200220",
    year: 2023,
    abstract:
      "How cells regulate protein levels is a central question of biology. Over the past decades, molecular biology research has provided profound insights into the mechanisms and the molecular machinery governing each step of the gene expression process, from transcription to protein degradation. Recent advances in transcriptomics and proteomics have complemented our understanding of these fundamental cellular processes with a quantitative, systems-level perspective. Multi-omic studies revealed significant quantitative, kinetic and functional differences between the genome, transcriptome and proteome. While protein levels often correlate with mRNA levels, quantitative investigations have demonstrated a substantial impact of translation and protein degradation on protein expression control. In addition, protein-level regulation appears to play a crucial role in buffering protein abundances against undesirable mRNA expression variation. These findings have practical implications for many fields, including gene function prediction and precision medicine.",
  },
];
