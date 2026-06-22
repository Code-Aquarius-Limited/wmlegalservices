import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";

export interface Stat {
  icon: LucideIcon;
  number: string;
  label: string;
}

function FallThroughCounter({
  target,
  className,
}: {
  target: number;
  className?: string;
}) {
  const [value, setValue] = useState(100);
  const ref = useRef<HTMLSpanElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const duration = 1800;
            const start = performance.now();
            const from = 100;
            const to = target;
            const tick = (now: number) => {
              const p = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              setValue(from + (to - from) * eased);
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className={className}>
      {value.toFixed(1)}%
    </span>
  );
}

export function StatsBar({ stats, variant = "light" }: { stats: Stat[]; variant?: "light" | "dark" }) {
  const dark = variant === "dark";
  return (
    <div
      className={`grid grid-cols-2 lg:grid-cols-4 ${
        dark ? "" : "border-y border-border bg-secondary"
      }`}
    >
      {stats.map((s, i) => {
        const Icon = s.icon;
        const isFallThrough = /fall[-\s]?through/i.test(s.label);
        const parsed = parseFloat(s.number);
        const numberClass = `font-serif text-3xl lg:text-4xl ${
          dark ? "text-primary-foreground" : "text-primary"
        }`;
        return (
          <div
            key={i}
            className={`flex flex-col items-start gap-3 px-6 py-8 lg:px-10 lg:py-10 ${
              i < stats.length - 1 ? "lg:border-r" : ""
            } ${i < 2 ? "border-b lg:border-b-0" : ""} ${i % 2 === 0 ? "border-r lg:border-r" : ""} ${
              dark ? "border-primary-foreground/10" : "border-border"
            }`}
          >
            <Icon size={22} className="text-bronze" strokeWidth={1.5} />
            <div className={numberClass}>
              {isFallThrough && !Number.isNaN(parsed) ? (
                <FallThroughCounter target={parsed} />
              ) : (
                s.number
              )}
            </div>
            <div className={`text-sm ${dark ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
              {s.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
