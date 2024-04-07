import { ReactNode } from "react";

export const TextWithImageSection = ({
  title,
  text,
  imgSrc,
  imgAlt,
}: {
  title?: string;
  text: ReactNode;
  imgSrc: string;
  imgAlt: string;
}) => (
  <div>
    {!!title && (<h2 className="text-2xl mb-6">{title}</h2>)}
    <div className="flex flex-col md:flex-row items-center">
      <div className="md:w-1/2 pr-4">
        <p className="text-slate-700">{text}</p>
      </div>
      <div className="md:w-1/2 px-0 py-4 md:px-4 md:py-0">
        <img className="max-w-full h-auto mx-0" src={imgSrc} alt={imgAlt} style={{ maxWidth: "100%", height: "auto" }} />
      </div>

    </div>
  </div >
);
