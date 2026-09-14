"use client";

import { useState } from "react";

export const PublicationCard = ({
  title, journal, link, authors, abstract, teamMemberNames,
}: {
  title: string; journal: string; link: string;
  authors: string[]; abstract?: string; teamMemberNames: string[];
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-b p-6 my-6 space-y-2 hover:bg-gray-50 rounded-lg transition-colors">
      <a href={link} target="_blank" className="hover:text-blue-900 text-lg font-bold block">
        {title}
      </a>
      <p className="text-sm">
        {authors.map((author, index) => {
          const isTeamMember = teamMemberNames.includes(author);
          const isLast = index === authors.length - 1;
          const isSecondLast = index === authors.length - 2;
          return (
            <span key={author}>
              {isTeamMember ? <b>{author}</b> : author}
              {!isLast && (isSecondLast ? " & " : ", ")}
            </span>
          );
        })}
      </p>
      <p className="text-gray-400 text-sm">{journal}</p>
      {abstract && (
        <div>
          <button
            onClick={() => setExpanded((e) => !e)}
            className="text-xs text-sky-700 hover:underline mt-1"
          >
            {expanded ? "Hide abstract" : "Show abstract"}
          </button>
          {expanded && (
            <p className="mt-2 text-sm text-gray-500 leading-relaxed border-l-2 border-gray-200 pl-3">
              {abstract}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
