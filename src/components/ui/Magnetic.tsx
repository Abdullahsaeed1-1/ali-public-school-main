"use client";

import { useRef, useState } from "react";
import { m } from "framer-motion";

const MAX_OFFSET = 6;

export function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    setPos({
      x: Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, relX * 0.3)),
      y: Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, relY * 0.3)),
    });
  }

  function handleMouseLeave() {
    setPos({ x: 0, y: 0 });
  }

  return (
    <m.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={pos}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="inline-block"
    >
      {children}
    </m.div>
  );
}
