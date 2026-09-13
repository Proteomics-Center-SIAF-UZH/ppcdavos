"use client";

import { usePathname } from "next/navigation";

const LinkItem = ({ name, href }: { name: string; href: string }) => {
  const pathname = usePathname();
  const isActive =
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <a
      href={href}
      className={`transition-all px-3 py-1 inline-flex items-center border-b-2 rounded-sm ${
        isActive
          ? "border-white font-semibold"
          : "border-transparent hover:bg-white/10"
      }`}
    >
      {name}
    </a>
  );
};

const Navigation = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:flex-nowrap justify-between items-center px-16 py-6 bg-sky-950 text-white shadow-md">
      <a href="/" className="flex items-center mb-4 sm:mb-0">
        <h1 className="text-xl font-bold tracking-tight">
          Precision Proteomics Center Davos
        </h1>
      </a>
      <div className="flex flex-row flex-wrap justify-center sm:justify-end items-center gap-1">
        <LinkItem href="/aboutUs" name="About us" />
        <LinkItem href="/research" name="Research" />
        <LinkItem href="/team" name="Team" />
        <LinkItem href="/publications" name="Publications" />
        <LinkItem href="/services" name="Services" />
        <LinkItem href="/openPositions" name="Open Positions" />
      </div>
    </div>
  );
};

export default Navigation;
