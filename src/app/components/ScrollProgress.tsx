"use client";

import { useEffect, useState } from "react";

export const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      setProgress(scrollHeight === clientHeight ? 0 : scrollTop / (scrollHeight - clientHeight));
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 z-[60] h-[2px] bg-sky-400 transition-all duration-100"
      style={{ width: `${progress * 100}%` }}
    />
  );
};
