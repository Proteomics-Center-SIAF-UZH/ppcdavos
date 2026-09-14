"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/aboutUs", name: "About us" },
  { href: "/research", name: "Research" },
  { href: "/team", name: "Team" },
  { href: "/publications", name: "Publications" },
  { href: "/services", name: "Services" },
  { href: "/openPositions", name: "Open Positions" },
];

const LinkItem = ({ name, href, onClick }: { name: string; href: string; onClick?: () => void }) => {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
  return (
    <a
      href={href}
      onClick={onClick}
      className={`transition-all px-3 py-1 inline-flex items-center border-b-2 rounded-sm ${
        isActive ? "border-white font-semibold" : "border-transparent hover:bg-white/10"
      }`}
    >
      {name}
    </a>
  );
};

const Navigation = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-sky-950 text-white shadow-md">
      <div className="flex justify-between items-center px-6 sm:px-16 py-5">
        <a href="/" className="flex flex-col">
          <h1 className="text-xl font-bold tracking-tight leading-tight" style={{ fontFamily: "var(--font-inter, sans-serif)" }}>
            Precision Proteomics Center Davos
          </h1>
          <span className="text-xs text-gray-400 tracking-wide mt-0.5">
            University of Zurich · SIAF
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden sm:flex flex-row items-center gap-1">
          {NAV_LINKS.map((l) => <LinkItem key={l.href} {...l} />)}
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden p-2 rounded hover:bg-white/10 transition-colors"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="sm:hidden border-t border-white/10 px-6 py-3 flex flex-col gap-1">
          {NAV_LINKS.map((l) => (
            <LinkItem key={l.href} {...l} onClick={() => setOpen(false)} />
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navigation;
