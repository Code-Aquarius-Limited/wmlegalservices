import { Link } from "@tanstack/react-router";

export function CTABanner({
  heading = "Ready to get started?",
  sub = "Whether you're buying, selling, instructing on an auction, or referring clients — our team is ready to help.",
}: { heading?: string; sub?: string }) {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="container-prose py-20 md:py-24 text-center">
        <span className="hairline mb-6 bg-bronze" />
        <h2 className="text-4xl md:text-5xl text-primary-foreground">{heading}</h2>
        <p className="mt-5 max-w-xl mx-auto text-primary-foreground/75">{sub}</p>
        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          <Link
            to="/contact"
            hash="quote"
            className="inline-flex items-center justify-center rounded-sm bg-bronze px-7 py-3.5 text-sm font-medium text-accent-foreground hover:opacity-90 transition-opacity"
          >
            Get a Quote
          </Link>
          <Link
            to="/contact"
            hash="call"
            className="inline-flex items-center justify-center rounded-sm border border-primary-foreground/30 bg-transparent px-7 py-3.5 text-sm font-medium text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
          >
            Book a Call
          </Link>
          <Link
            to="/services"
            hash="partner-with-us"
            className="inline-flex items-center justify-center rounded-sm border border-primary-foreground/30 bg-transparent px-7 py-3.5 text-sm font-medium text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
          >
            Partner With Us
          </Link>
        </div>
      </div>
    </section>
  );
}
