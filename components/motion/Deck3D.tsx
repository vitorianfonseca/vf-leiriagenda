"use client"

import { useEffect, useRef, type KeyboardEvent, type ReactNode } from "react";

import { cn } from "@/lib/utils";

interface Deck3DProps {
  items: { id: string; label: string; face: ReactNode }[];
  active: number;
  onActiveChange: (index: number) => void;
  /** Chamado ao carregar no cartão que já está à frente. */
  onOpen?: (id: string) => void;
  cardWidth?: number;
  cardHeight?: number;
  className?: string;
  ariaLabel: string;
}

/**
 * Um baralho em perspetiva: o cartão ativo de frente, os vizinhos rodados e recuados.
 * Só transformações CSS: o browser anima tudo no compositor.
 */
export function Deck3D({ items, active, onActiveChange, onOpen, cardWidth = 300, cardHeight = 380, className, ariaLabel }: Deck3DProps) {
  const stage = useRef<HTMLDivElement>(null);
  const wheelLock = useRef(0);

  const go = (index: number) => onActiveChange(Math.max(0, Math.min(items.length - 1, index)));

  // O palco inclina uns graus com o rato.
  useEffect(() => {
    const el = stage.current;
    if (!el || !window.matchMedia('(pointer: fine)').matches) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--sx', `${(((e.clientX - r.left) / r.width - 0.5) * 8).toFixed(2)}deg`);
      el.style.setProperty('--sy', `${(((e.clientY - r.top) / r.height - 0.5) * -6).toFixed(2)}deg`);
    };
    const onLeave = () => { el.style.setProperty('--sx', '0deg'); el.style.setProperty('--sy', '0deg'); };
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => { el.removeEventListener('pointermove', onMove); el.removeEventListener('pointerleave', onLeave); };
  }, []);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(active + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(active - 1); }
    if (e.key === 'Enter' && items[active]) onOpen?.(items[active].id);
  };

  return (
    <div
      ref={stage}
      role="listbox"
      aria-label={ariaLabel}
      aria-activedescendant={items[active] ? `deck-${items[active].id}` : undefined}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onWheel={(e) => {
        // Deslizar na horizontal (trackpad) muda de cartão, com um intervalo para não disparar.
        if (Math.abs(e.deltaX) < 18 || Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;
        const now = Date.now();
        if (now - wheelLock.current < 380) return;
        wheelLock.current = now;
        go(active + (e.deltaX > 0 ? 1 : -1));
      }}
      className={cn("relative flex items-center justify-center outline-none [perspective:1400px]", className)}
      style={{ height: cardHeight + 60 }}
    >
      <div
        className="relative [transform-style:preserve-3d]"
        style={{ width: cardWidth, height: cardHeight, transform: 'rotateY(var(--sx, 0deg)) rotateX(var(--sy, 0deg))', transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        {items.map((item, i) => {
          const d = i - active;
          const abs = Math.abs(d);
          const isActive = d === 0;
          return (
            <button
              key={item.id}
              id={`deck-${item.id}`}
              type="button"
              role="option"
              aria-selected={isActive}
              aria-label={item.label}
              tabIndex={-1}
              onClick={() => (isActive ? onOpen?.(item.id) : go(i))}
              className="absolute inset-0 text-left [backface-visibility:hidden]"
              style={{
                transform: `translate3d(${d * cardWidth * 0.72}px, 0, ${-abs * 170}px) rotateY(${d * -34}deg)`,
                opacity: abs > 3 ? 0 : 1 - abs * 0.16,
                pointerEvents: abs > 3 ? 'none' : 'auto',
                zIndex: 20 - abs,
                transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease',
              }}
            >
              {item.face}
              {isActive && <span className="brackets"><i /></span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
