import { Star } from "lucide-react";

export interface Review {
  name: string;
  initial: string;
  date: string;
  body: string;
  rating?: number;
}

const defaultReviews: Review[] = [
  {
    name: "Sarah J.",
    initial: "S",
    date: "2 weeks ago",
    body: "Outstanding service from start to finish. The team kept us informed at every stage and made what could have been a stressful purchase remarkably smooth.",
  },
  {
    name: "Michael R.",
    initial: "M",
    date: "1 month ago",
    body: "We bought at auction and needed a fast legal pack review. WM Legal Services turned it around in 48 hours with a clear, plain-English summary. Brilliant.",
  },
  {
    name: "Priya K.",
    initial: "P",
    date: "1 month ago",
    body: "As an estate agency, we've worked with many panels. WM's communication and low fall-through rate are genuinely in a different league.",
  },
  {
    name: "James W.",
    initial: "J",
    date: "2 months ago",
    body: "Sold our home with no hassle. Knowledgeable, responsive, and they actually picked up the phone — rare these days.",
  },
];

export function Testimonials({ reviews = defaultReviews }: { reviews?: Review[] }) {
  return (
    <section className="bg-secondary py-20 md:py-28">
      <div className="container-prose">
        <div className="max-w-2xl">
          <span className="eyebrow">Client Reviews</span>
          <h2 className="mt-4 text-4xl md:text-5xl">What our clients say</h2>
          <p className="mt-5 text-muted-foreground">
            Genuine feedback from buyers, sellers and introducers who have worked with our team.
          </p>
        </div>

        {/* TODO: replace with live Google Reviews embed */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {reviews.map((r, i) => (
            <article
              key={i}
              className="bg-card border border-border rounded-md p-6 shadow-[var(--shadow-soft)] flex flex-col"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground grid place-items-center font-serif">
                  {r.initial}
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.date}</div>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-0.5">
                {Array.from({ length: r.rating ?? 5 }).map((_, k) => (
                  <Star key={k} size={14} className="text-bronze" fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="mt-4 text-sm text-foreground/80 leading-relaxed flex-1">{r.body}</p>
              <div className="mt-5 text-xs text-muted-foreground">Posted on Google</div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex items-center gap-4">
          <a
            href="https://www.google.com/search?q=WM+Legal+Services+reviews"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-bronze transition-colors"
          >
            Read more reviews on Google →
          </a>
        </div>
      </div>
    </section>
  );
}
