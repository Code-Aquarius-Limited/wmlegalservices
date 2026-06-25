import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export interface Review {
  name: string;
  initial: string;
  date: string;
  body: string;
  rating?: number;
}

const defaultReviews: Review[] = [
  {
    name: "Nicholas Cheung",
    initial: "N",
    date: "2 weeks ago",
    body: "We used Taylor Rose for our flat purchase. Aliyah Saddique was fantastic - very responsive and kept us updated at each stage. Her work was done to a high standard and we felt our interests were safe in her care. The fees were reasonable and the conveyancing process was smooth.",
  },
  {
    name: "Ramona Fernandes",
    initial: "R",
    date: "1 month ago",
    body: "Narin was so sweet, preemptive and litigious. Her knowledge and expertise on the legal matters really shows, taking the time to advise over the steps. So grateful to have her with me through the process.",
  },
  {
    name: "Julia Michasiewicz",
    initial: "J",
    date: "1 month ago",
    body: "I would like to provide feedback on the solicitor who handled the purchase of my flat in Bilston. Overall, I am very happy with the service provided. Aliyah Saddique was consistently professional throughout the process and demonstrated a strong level of competence and attention to detail.",
  },
  {
    name: "Aymeric Regnier",
    initial: "A",
    date: "2 months ago",
    body: "Aliyah Saddique and Sara Tenn from Taylor Rose were of great help in my legal process and very responsive to any queries I had. Great service, would recommend.",
  },
];

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="bg-card border border-border rounded-md p-6 shadow-[var(--shadow-soft)] flex flex-col h-full">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground grid place-items-center font-serif">
          {review.initial}
        </div>
        <div>
          <div className="text-sm font-medium text-foreground">{review.name}</div>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-0.5">
        {Array.from({ length: review.rating ?? 5 }).map((_, k) => (
          <Star key={k} size={14} className="text-bronze" fill="currentColor" strokeWidth={0} />
        ))}
      </div>
      <p className="mt-4 text-sm text-foreground/80 leading-relaxed flex-1">{review.body}</p>
      <div className="mt-5 text-xs text-muted-foreground">Posted on Google</div>
    </article>
  );
}

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

        {/* Desktop grid */}
        <div className="mt-12 hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-4">
          {reviews.map((r, i) => (
            <ReviewCard key={i} review={r} />
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="mt-12 md:hidden">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {reviews.map((r, i) => (
                <CarouselItem key={i} className="pl-4 basis-[85%] sm:basis-[75%]">
                  <ReviewCard review={r} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-6 flex items-center justify-center gap-4">
              <CarouselPrevious className="relative left-0 top-0 translate-x-0 translate-y-0" />
              <CarouselNext className="relative right-0 top-0 translate-x-0 translate-y-0" />
            </div>
          </Carousel>
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
