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
  return { ref, visible };
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
      <a href={`/team/${slug}`} className="group block">
        <div
          className="bg-white rounded-xl overflow-hidden transition-all duration-300 group-hover:-translate-y-1"
          style={{ boxShadow: "0 2px 12px -2px rgba(15,23,42,0.08), 0 1px 3px -1px rgba(15,23,42,0.06)" }}
        >
          {/* Photo area */}
          <div className="relative aspect-square bg-sky-950 overflow-hidden">
            {/* Initials backdrop */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white/20 font-bold select-none" style={{ fontSize: "5rem" }}>
                {initials}
              </span>
            </div>

            {/* Photo */}
            {member.imageUrl && (
              <div
                className="absolute inset-0 bg-cover bg-center bg-top transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${member.imageUrl})` }}
              />
            )}

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-sky-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <span className="text-white text-sm font-medium tracking-wide">
                View profile →
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="p-4 space-y-1">
            <p className="font-semibold text-gray-900 text-sm leading-snug group-hover:text-sky-700 transition-colors">
              {member.prefix ? `${member.prefix.trim()} ` : ""}
              {member.name}
              {member.isVisiting ? " (visiting)" : ""}
            </p>
            <p className="text-xs uppercase tracking-wider text-gray-400 font-medium">
              {member.title}
            </p>
          </div>
        </div>
      </a>
    </div>
  );
};

export const MemberGrid = ({ members }: { members: any[] }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
    {members.map((m, i) => (
      <MemberCard key={i} member={m} index={i} />
    ))}
  </div>
);
