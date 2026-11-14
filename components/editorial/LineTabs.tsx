"use client"

import { useLayoutEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface LineTabsProps<T extends string> {
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string; count?: number }[];
  ariaLabel?: string;
  className?: string;
}

/** Separadores só com texto; um traço lima desliza para o escolhido. */
export function LineTabs<T extends string>({ value, onChange, options, ariaLabel, className }: LineTabsProps<T>) {
  const list = useRef<HTMLDivElement>(null);
  const [bar, setBar] = useState<{ left: number; width: number } | null>(null);

  useLayoutEffect(() => {
    const measure = () => {
      const el = list.current?.querySelector<HTMLElement>('[aria-selected="true"]');
      if (el) setBar({ left: el.offsetLeft, width: el.offsetWidth });
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [value, options]);

  return (
    <div ref={list} role="tablist" aria-label={ariaLabel} className={cn("relative flex gap-7 overflow-x-auto border-b hair", className)}>
      {options.map((o) => {
        const selected = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(o.value)}
            className={cn(
              "shrink-0 whitespace-nowrap pb-3 pt-1 text-[15px] font-medium transition-colors duration-200",
              selected ? "text-[hsl(var(--ink))]" : "text-muted-foreground hover:text-[hsl(var(--ink))]",
            )}
          >
            {o.label}
            {o.count !== undefined && <sup className="t-num ml-1 text-[12px]">{o.count}</sup>}
          </button>
        );
      })}
      {bar && (
        <span
          aria-hidden
          className="absolute bottom-0 h-[3px] bg-azul rounded-full transition-[left,width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
          style={{ left: bar.left, width: bar.width }}
        />
      )}
    </div>
  );
}
