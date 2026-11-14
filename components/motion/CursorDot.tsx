"use client"

import { useEffect, useRef } from "react";

/** Um ponto azul que segue o rato com um ligeiro atraso e cresce sobre o que é clicável. */
export function CursorDot() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia('(pointer: fine)').matches) return;
    let x = -100, y = -100, tx = -100, ty = -100, frame = 0, running = false;

    const step = () => {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (Math.abs(tx - x) + Math.abs(ty - y) > 0.3) frame = requestAnimationFrame(step);
      else running = false;
    };
    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      const target = e.target as Element | null;
      el.dataset.active = String(!!target?.closest?.('a, button, [role="button"], [data-cursor]'));
      if (!running) { running = true; frame = requestAnimationFrame(step); }
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => { window.removeEventListener('pointermove', onMove); cancelAnimationFrame(frame); };
  }, []);

  return <div ref={ref} className="cursor-dot mix-blend-multiply dark:mix-blend-normal" aria-hidden />;
}
