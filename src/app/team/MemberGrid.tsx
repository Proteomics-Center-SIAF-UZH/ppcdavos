"use client";

import { useEffect, useRef, useState } from "react";

const useFadeIn = (delay: number) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, visible, delay };
};

const MemberCard = ({ member, index }: { member: any; index: number }) => {
  const { ref, visible } = useFadeIn(index * 60);
  const slug = member.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  const initials = member.name.split(" ").slice(0, 2).map((w: string) => w[0]).join("");

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 60}ms` }}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
    >
      <a href={`/team/${slug}`} className="group">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm group-hover:shadow-md group-hover:scale-[1.02] transition-all duration-200 p-5 flex flex-col items-center text-center space-y-3 h-full">
          <div className="relative w-24 h-24 flex-shrink-0">
            <div className="w-24 h-24 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center text-2xl font-semibold">
              {initials}
            </div>
            {member.imageUrl && (
              <div
                className="absolute inset-0 rounded-full bg-cover bg-center"
                style={{ backgroundImage: `url(${member.imageUrl})` }}
              />
            )}
          </div>
          <div className="space-y-1 flex-1">
            <p className="font-semibold text-gray-900 text-sm leading-tight group-hover:text-sky-700 transition-colors">
              {member.prefix ? `${member.prefix.trim()} ` : ""}
              {member.name}
              {member.isVisiting ? " (visiting)" : ""}
            </p>
            <p className="text-xs text-gray-400">{member.title}</p>
          </div>
          <a
            href={`mailto:${member.email}`}
            className="text-xs text-sky-700 hover:underline w-full truncate"
            onClick={(e) => e.stopPropagation()}
          >
            {member.email}
          </a>
        </div>
      </a>
    </div>
  );
};

export const MemberGrid = ({ members }: { members: any[] }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
    {members.map((m, i) => (
      <MemberCard key={i} member={m} index={i} />
    ))}
  </div>
);
