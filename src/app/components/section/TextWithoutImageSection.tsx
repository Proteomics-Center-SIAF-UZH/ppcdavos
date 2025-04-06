import { ReactNode } from "react";

export const TextWithoutImageSection = ({
  title,
  text,
}: {
  title?: string;
  text: ReactNode;
}) => (
  <div className="max-w-3xl mx-auto px-6">
    {!!title && (<h2 className="text-2xl mb-6">{title}</h2>)}
    <div className="text-slate-700 space-y-4">{text}</div>
  </div >
);
