import { Fragment } from "react";

export const parseLinks = (text: string) => {
  const parts = text.split(/\[([^\]]+)\]\(([^)]+)\)/g);
  return parts.map((part, index) => {
    if (index % 3 === 1) {
      const url = parts[index + 1];
      return (
        <a key={index} href={url} target="_blank" rel="noopener noreferrer"
          className="text-sky-700 hover:underline">
          {part}
        </a>
      );
    }
    if (index % 3 === 2) return null;
    return <Fragment key={index}>{part}</Fragment>;
  }).filter(Boolean);
};
