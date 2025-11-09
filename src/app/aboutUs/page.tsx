import React from "react";
import { TextWithImageSection } from "../components/section/TextWithImageSection";

const AboutUs = async () => {
    return ( 
        <div className="grow">
          <TextWithImageSection
            title={"About us"}
            imgSrc={"/images/about_us.jpg"}
            imgAlt="about us"
            text={
              <>
                <p>
                    With the decision of the Government of the Canton of Graubünden in 2020, the Swiss Institute of Allergy and Asthma Research (SIAF) was commissioned to establish and operate the Proteomics Center Davos as a Leading House, recognizing proteomics as a key technology in life sciences. The center aims to develop a nationally and internationally recognized research platform for cutting-edge proteome research. Fully integrated into SIAF’s infrastructure, the Precision Proteomics Center fosters collaboration and scientific excellence within SIAF and its partner institutes.
                </p>
                <p>
                    Since 2022, Christoph Messner has led the Proteomics Center Davos while holding a professorship at the University of Zurich. The center is dedicated to integrating proteomics with precision medicine, driving technological innovation, and advancing translational research. Strategically aligned with SIAF, other research institutes in the canton, and the University of Zurich, it plays a key role in strengthening proteomics research in Switzerland.
                </p>
              </>
            }
          />
        </div>
    )
};

export default AboutUs;
