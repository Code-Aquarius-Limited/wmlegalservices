import type { LucideIcon } from "lucide-react";

export interface Stat {
  icon: LucideIcon;
  number: string;
  label: string;
}

export function StatsBar({ stats, variant = "light" }: { stats: Stat[]; variant?: "light" | "dark" }) {
  const dark = variant === "dark";
  const smLastRowStart = stats.length - (stats.length % 2 === 0 ? 2 : stats.length % 2);
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${
        dark ? "" : "border-y border-border bg-secondary"
      }`}
    >
      {stats.map((s, i) => {
        const Icon = s.icon;
        return (
          <div
            key={i}
            style={{ animationDelay: `${i * 150}ms`, animationFillMode: "both" }}
            className={`flex flex-col items-start gap-3 px-6 py-8 lg:px-10 lg:py-10 animate-in fade-in slide-in-from-bottom-2 duration-700 ${
              i < stats.length - 1 ? "border-b" : ""
            } ${i < smLastRowStart ? "sm:border-b" : "sm:border-b-0"} ${
              i % 2 === 0 && i < stats.length - 1 ? "sm:border-r" : ""
            } ${i % 3 !== 2 && i < stats.length - 1 ? "lg:border-r" : ""} lg:border-b-0 ${
              dark ? "border-primary-foreground/10" : "border-border"
            }`}
          >
            <Icon size={22} className="text-bronze" strokeWidth={1.5} />
            <div className={`font-serif text-3xl lg:text-4xl ${dark ? "text-primary-foreground" : "text-primary"}`}>
              {s.number}
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
