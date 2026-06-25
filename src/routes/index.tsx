import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Shield, TrendingDown, CheckCircle2, Briefcase, Home, Building2, RefreshCw,
  Gavel, MessageSquare, Compass, Users, UserSquare2, Play,
} from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import propertyImg from "@/assets/property.jpg";
import auctionImg from "@/assets/auction.jpg";
import { StatsBar } from "@/components/site/StatsBar";
import { Testimonials } from "@/components/site/Testimonials";
import { CTABanner } from "@/components/site/CTABanner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WM Legal Services — Property Law, Done Properly" },
      { name: "description", content: "Specialist conveyancing for homebuyers, sellers, auction clients and introducers. Operating under Taylor Rose." },
      { property: "og:title", content: "WM Legal Services — Property Law, Done Properly" },
      { property: "og:description", content: "Specialist conveyancing for homebuyers, sellers, auction clients and introducers." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-primary">
        <img
          src={heroImg}
          alt="London skyline at dusk"
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/85 to-primary/70" />
        <div className="container-prose relative py-28 md:py-40 text-primary-foreground">
          <div className="max-w-3xl">
            <span className="eyebrow text-bronze">Specialist Property Law</span>
            <h1 className="mt-6 font-serif text-5xl md:text-7xl leading-[1.05] text-primary-foreground">
              Property Law,<br />Done Properly.
            </h1>
            <p className="mt-7 text-lg md:text-xl text-primary-foreground/80 max-w-2xl leading-relaxed">
              Specialist conveyancing for homebuyers, sellers, auction clients and the introducers
              who trust us with their referrals.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/contact" hash="quote" className="inline-flex items-center justify-center rounded-sm bg-bronze px-7 py-3.5 text-sm font-medium text-accent-foreground hover:opacity-90 transition-opacity">
                Get a Quote
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center rounded-sm border border-primary-foreground/30 px-7 py-3.5 text-sm font-medium text-primary-foreground hover:bg-primary-foreground/10 transition-colors">
                Partner With Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatsBar
        stats={[
          { icon: Shield, number: "Regulated & Insured", label: "Fully SRA authorised" },
          { icon: TrendingDown, number: "9.2%", label: "Fall-through rate" },
          { icon: CheckCircle2, number: "1000s", label: "Transactions completed" },
          { icon: Briefcase, number: "Specialist", label: "Property law team" },
        ]}
      />

      {/* Services */}
      <section className="py-20 md:py-28">
        <div className="container-prose">
          <div className="max-w-2xl">
            <span className="eyebrow">Our Expertise</span>
            <h2 className="mt-4 text-4xl md:text-5xl">How we can help</h2>
            <p className="mt-5 text-muted-foreground">
              A full-service property law team covering everyday conveyancing, complex transactions
              and dedicated panel management for introducers.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Home, t: "Residential & Commercial Conveyancing", d: "End-to-end conveyancing for sales, purchases and remortgages." },
              { icon: Users, t: "Conveyancing Panel Management", d: "A dedicated extension of your business, from quote to completion." },
              { icon: RefreshCw, t: "Refinance", d: "Fast, accurate remortgage transactions with clear communication." },
              { icon: Building2, t: "New Build", d: "Specialist handling of tight builder deadlines and reservation contracts." },
            ].map(({ icon: I, t, d }) => (
              <div key={t} className="bg-card border border-border rounded-md p-7 hover:shadow-[var(--shadow-card)] transition-shadow">
                <I size={24} className="text-bronze" strokeWidth={1.5} />
                <h3 className="mt-5 text-lg font-medium text-primary">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>

          {/* Auction spotlight */}
          <div className="mt-10 relative overflow-hidden rounded-md bg-primary text-primary-foreground">
            <img src={auctionImg} alt="" loading="lazy" width={1280} height={832}
              className="absolute inset-0 h-full w-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/60" />
            <div className="relative grid md:grid-cols-[1.2fr_1fr] gap-10 p-10 md:p-14 items-center">
              <div>
                <span className="eyebrow text-bronze">Our Specialism</span>
                <h3 className="mt-4 font-serif text-3xl md:text-4xl text-primary-foreground">
                  Auction Conveyancing Specialists
                </h3>
                <p className="mt-5 text-primary-foreground/80 leading-relaxed max-w-xl">
                  Fast legal pack reviews, fixed-fee options, and a dedicated team built to work to
                  auction deadlines — for buyers, sellers, investors, developers and auction houses.
                </p>
                <Link to="/services" hash="auctions"
                  className="mt-7 inline-flex items-center gap-2 rounded-sm bg-bronze px-6 py-3 text-sm font-medium text-accent-foreground hover:opacity-90 transition-opacity">
                  Explore Auction Services →
                </Link>
              </div>
              <div className="hidden md:flex items-center justify-center">
                <Gavel size={140} strokeWidth={0.7} className="text-bronze/80" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video */}
      <section className="bg-secondary py-20 md:py-28">
        <div className="container-prose grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="eyebrow">Introduction</span>
            <h2 className="mt-4 text-4xl md:text-5xl">Meet William Michael</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed max-w-lg">
              Hear directly from our founder on what sets WM Legal Services apart — and why
              specialist property expertise matters more than ever.
            </p>
          </div>
          <div className="relative aspect-video rounded-md overflow-hidden bg-primary group cursor-pointer">
            {/* TODO: embed introduction video from William Michael */}
            <img src={propertyImg} alt="Introduction video placeholder"
              loading="lazy" width={1280} height={832}
              className="absolute inset-0 h-full w-full object-cover opacity-60 group-hover:opacity-70 transition-opacity" />
            <div className="absolute inset-0 grid place-items-center">
              <div className="h-20 w-20 rounded-full bg-bronze grid place-items-center shadow-[var(--shadow-card)] group-hover:scale-105 transition-transform">
                <Play size={28} className="text-accent-foreground ml-1" fill="currentColor" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="py-20 md:py-28">
        <div className="container-prose">
          <div className="max-w-2xl">
            <span className="eyebrow">Why Choose Us</span>
            <h2 className="mt-4 text-4xl md:text-5xl">A different kind of property team</h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { i: MessageSquare, t: "Strong communication", d: "We pick up the phone, return emails and keep every party informed." },
              { i: Compass, t: "Commercial approach", d: "Pragmatic, deal-driven advice — not box-ticking." },
              { i: TrendingDown, t: "Low fall-through", d: "A 9.2% fall-through rate. The industry average is well over double." },
              { i: Briefcase, t: "Specialists, not generalists", d: "A dedicated property law team — this is all we do." },
            ].map(({ i: I, t, d }) => (
              <div key={t}>
                <I size={22} className="text-bronze" strokeWidth={1.5} />
                <h3 className="mt-5 text-lg font-medium text-primary">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      {/* Panel mgmt teaser */}
      <section className="py-20 md:py-28">
        <div className="container-prose grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="eyebrow">For Introducers</span>
            <h2 className="mt-4 text-4xl md:text-5xl">Panel management, properly run</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              We act as a dedicated extension of your business — quoting leads, allocating
              instructions, monitoring capacity, and handling escalations — so your clients receive
              the level of service your brand demands.
            </p>
            <Link to="/services" hash="panel-management"
              className="mt-8 inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              Learn About Panel Management →
            </Link>
          </div>
          <div className="bg-secondary border border-border rounded-md p-10">
            <div className="grid grid-cols-2 gap-8">
              {[
                { n: "1 lead", l: "Single point of contact" },
                { n: "Same day", l: "Quote turnaround" },
                { n: "Live", l: "Pipeline reporting" },
                { n: "Direct", l: "Escalation route" },
              ].map((s) => (
                <div key={s.n}>
                  <div className="font-serif text-2xl text-primary">{s.n}</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partner */}
      <section id="partner-with-us" className="bg-secondary py-20 md:py-28 scroll-mt-20">
        <div className="container-prose">
          <div className="max-w-2xl">
            <span className="eyebrow">For Introducers &amp; Partners</span>
            <h2 className="mt-4 text-4xl md:text-5xl">Partner with us</h2>
            <p className="mt-5 text-muted-foreground">
              Built for estate agents, mortgage brokers and introducers who want their clients
              treated as carefully as their own brand demands.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              { t: "Regulated & Insured", d: "Fully SRA authorised" },
              { t: "Low fall-through", d: "A 9.2% fall-through rate vs. an industry average well over double." },
              { t: "Communication standards", d: "Defined SLAs on response times and pipeline updates." },
              { t: "Real partnership", d: "A dedicated relationship contact, not a faceless inbox." },
            ].map(({ t, d }) => (
              <div key={t} className="bg-card border border-border rounded-md p-6">
                <h3 className="text-base font-medium text-primary">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>

          {/* Introducer testimonial */}
          <div className="mt-12 rounded-md border-l-2 border-bronze bg-card p-8 md:p-10">
            <div className="eyebrow">Introducer testimonial</div>
            <blockquote className="mt-4 font-serif text-2xl text-primary leading-snug max-w-3xl">
              "WM have genuinely raised the bar for our clients. Their fall-through rate is exceptional and
              the communication is the best we've worked with."
            </blockquote>
            <div className="mt-5 text-sm text-muted-foreground">
              Director, Independent Estate Agency · London
            </div>
          </div>

          <div className="mt-10">
            <Link to="/contact"
              className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              Become a Partner →
            </Link>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-20 md:py-28 scroll-mt-20">
        <div className="container-prose">
          <div className="max-w-2xl">
            <span className="eyebrow">Our People</span>
            <h2 className="mt-4 text-4xl md:text-5xl">Meet the team</h2>
            <p className="mt-5 text-muted-foreground">
              Property specialists, not generalists — built around the principle that focused
              expertise produces better outcomes for clients.
            </p>
          </div>

          {/* TODO: replace with real team photos and bios from Gabriel */}
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { n: "William Michael", r: "Partner at Taylor Rose · CEO, WM Legal Services", e: "Auction conveyancing · Investor transactions · Strategy" },
              { n: "Senior Conveyancer", r: "Residential Property", e: "Sales, purchases, new build, lease extensions" },
              { n: "Senior Conveyancer", r: "Commercial Property", e: "Commercial sales & purchases, BSA matters" },
              { n: "Auction Team Lead", r: "Auction Conveyancing", e: "Legal pack reviews, auction completions" },
              { n: "Panel Manager", r: "Panel Management", e: "Introducer relationships, escalations, reporting" },
              { n: "Client Care", r: "Client Services", e: "Quotes, onboarding, communication" },
            ].map((p, idx) => (
              <article key={idx} className="bg-card border border-border rounded-md overflow-hidden">
                <div className="aspect-[4/3] bg-gradient-to-br from-secondary to-border grid place-items-center">
                  <UserSquare2 size={56} strokeWidth={0.8} className="text-primary/30" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-medium text-primary">{p.n}</h3>
                  <div className="mt-1 text-xs uppercase tracking-wider text-bronze">{p.r}</div>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.e}</p>
                  <a href="mailto:enquiries@wmlegalservices.co.uk"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-bronze transition-colors">
                    Contact →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
