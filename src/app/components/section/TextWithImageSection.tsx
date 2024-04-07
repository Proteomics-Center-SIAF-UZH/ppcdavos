import { ReactNode } from "react";

export const TextWithImageSection = ({
  title,
  text,
  imgSrc,
  imgAlt,
}: {
  title: string;
  text: ReactNode;
  imgSrc: string;
  imgAlt: string;
}) => (
  <div>
    <h2 className="text-2xl mb-6">{title}</h2>
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col justify-center">
        <span className="text-slate-700">{text}</span>
      </div>
      <img className="h-auto w-auto rounded-lg" src={imgSrc} alt={imgAlt} />
    </div>
  </div>
);
