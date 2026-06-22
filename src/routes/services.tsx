import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Home, Building2, RefreshCw, FileSignature, KeyRound, HandCoins, ShieldCheck,
  Gavel, Users, Handshake, UserSquare2, FileSearch, ListChecks, BadgeCheck,
  Briefcase, Download, PhoneCall, ChevronRight,
} from "lucide-react";
import { BackToTop } from "@/components/site/BackToTop";
import { CTABanner } from "@/components/site/CTABanner";
import auctionImg from "@/assets/auction.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Our Services — WM Legal Services" },
      { name: "description", content: "Conveyancing, auction conveyancing, panel management, partner services and our specialist property law team." },
      { property: "og:title", content: "Our Services — WM Legal Services" },
      { property: "og:description", content: "Specialist property law expertise, from everyday conveyancing to complex auction transactions." },
    ],
  }),
  component: ServicesPage,
});

const pillars = [
  { id: "conveyancing", icon: Home, t: "Conveyancing & Property Services", d: "Sales, purchases, remortgages and the full range of residential and commercial work." },
  { id: "auctions", icon: Gavel, t: "Auction Conveyancing", d: "Our specialism — fast legal pack reviews and full auction transaction handling.", spotlight: true },
  { id: "panel-management", icon: Users, t: "Panel Management", d: "A dedicated extension of estate agency and mortgage brokerage businesses." },
  { id: "partner-with-us", icon: Handshake, t: "Partner With Us", d: "Service standards, no sale no fee model, and a low fall-through rate for introducers." },
  { id: "team", icon: UserSquare2, t: "Meet the Team", d: "The specialist property lawyers behind WM Legal Services." },
];

function ServicesPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-secondary border-b border-border">
        <div className="container-prose py-20 md:py-28">
          <span className="eyebrow">Our Services</span>
          <h1 className="mt-5 text-5xl md:text-6xl max-w-3xl">Our services</h1>
          <p className="mt-5 max-w-2xl text-muted-foreground text-lg">
            Specialist property law expertise, from everyday conveyancing to complex auction
            transactions.
          </p>
        </div>
      </section>

      {/* Pillar overview */}
      <section className="py-16 md:py-20">
        <div className="container-prose">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p) => {
              const I = p.icon;
              return (
                <a
                  key={p.id}
                  href={`#${p.id}`}
                  className="group block rounded-md border border-border bg-card p-7 transition-all hover:bg-primary hover:border-primary hover:shadow-[var(--shadow-card)]"
                >
                  <I size={24} strokeWidth={1.5} className="text-bronze" />
                  <h3 className="mt-5 text-lg font-medium text-primary transition-colors group-hover:text-bronze">
                    {p.t}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-bronze/80">
                    {p.d}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors group-hover:text-bronze">
                    Read more <ChevronRight size={14} />
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core Conveyancing */}
      <section id="conveyancing" className="bg-secondary py-20 md:py-28 scroll-mt-20">
        <div className="container-prose">
          <div className="max-w-2xl">
            <span className="eyebrow">Core Conveyancing</span>
            <h2 className="mt-4 text-4xl md:text-5xl">Conveyancing &amp; property services</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Plain-English, deal-driven property law across the spectrum of residential and
              commercial transactions.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              { i: Home, t: "Residential & Commercial Conveyancing", d: "Full-service handling of sales and purchases for owner-occupiers, landlords and businesses." },
              { i: Building2, t: "New Build Conveyancing", d: "Specialist handling of reservation deadlines, builder contracts and developer requirements." },
              { i: RefreshCw, t: "Refinance", d: "Remortgage transactions managed with speed and clarity, working directly with your lender." },
              { i: FileSignature, t: "Transfer of Equity", d: "Adding or removing parties from a property title — including separations and gifted shares." },
              { i: KeyRound, t: "Lease Extensions", d: "Statutory and informal lease extensions handled with experienced leasehold expertise." },
              { i: HandCoins, t: "Shared Ownership", d: "Purchases, staircasing and resales of shared ownership properties." },
              { i: ShieldCheck, t: "Building Safety Act Matters", d: "Specialist advice on the legal implications of the Building Safety Act for buyers and owners." },
            ].map(({ i: I, t, d }) => (
              <div key={t} className="bg-card border border-border rounded-md p-6">
                <I size={22} className="text-bronze" strokeWidth={1.5} />
                <h3 className="mt-4 text-base font-medium text-primary">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Auctions — Spotlight */}
      <section id="auctions" className="relative bg-primary text-primary-foreground py-20 md:py-28 scroll-mt-20 overflow-hidden">
        <img src={auctionImg} alt="" loading="lazy" width={1280} height={832}
          className="absolute inset-0 h-full w-full object-cover opacity-10" />
        <div className="relative container-prose">
          <div className="max-w-3xl">
            <span className="eyebrow text-bronze">Our Specialism</span>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl text-primary-foreground">
              Auction conveyancing specialists
            </h2>
            <p className="mt-5 text-primary-foreground/80 leading-relaxed">
              WM Legal Services is a leading auction conveyancing team for buyers, sellers,
              investors, developers and auction houses. Fast turnaround, fixed-fee options, and a
              team that genuinely understands the pressure of auction deadlines.
            </p>
          </div>

          {/* Legal Pack Reviews */}
          <SpotBlock
            icon={FileSearch}
            title="Auction Legal Pack Reviews"
            body="Fast turnaround (often within 48 hours), fixed-fee packages, and a plain-English summary that highlights risks, title issues, lease terms, special conditions, and any other points worth knowing before you bid."
            cta={{ to: "/contact", hash: "legal-pack", label: "Request a Legal Pack Review" }}
          />

          {/* Buying at Auction */}
          <div className="mt-14">
            <h3 className="text-2xl text-primary-foreground">Buying at Auction</h3>
            <ol className="mt-8 grid md:grid-cols-5 gap-4">
              {[
                "Get the legal pack reviewed",
                "Arrange finance",
                "Register to bid",
                "Exchange on the fall of the hammer",
                "Complete within the auction timescale",
              ].map((step, idx) => (
                <li key={step} className="rounded-md border border-primary-foreground/15 bg-primary-foreground/5 p-5">
                  <div className="font-serif text-2xl text-bronze">{String(idx + 1).padStart(2, "0")}</div>
                  <p className="mt-3 text-sm text-primary-foreground/80 leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
            <div className="mt-8 rounded-md border-l-2 border-bronze bg-primary-foreground/5 px-6 py-5 text-sm text-primary-foreground/80 leading-relaxed">
              <strong className="text-bronze font-medium">Important:</strong> auction contracts are
              binding on the fall of the hammer. A proper legal pack review before bidding is the
              single best protection against expensive surprises.
            </div>
          </div>

          {/* Selling */}
          <SpotBlock
            icon={ListChecks}
            title="Selling at Auction"
            body="Legal pack preparation, fast instruction processes and direct coordination with your chosen auction house — so your lot is ready to sell on the catalogue deadline."
          />

          {/* Investor */}
          <div className="mt-14">
            <h3 className="text-2xl text-primary-foreground">Investor &amp; Developer Services</h3>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              {[
                "Portfolio acquisitions",
                "Limited company purchases",
                "Bridging finance transactions",
                "Commercial auction purchases",
                "Development opportunities",
              ].map((t) => (
                <div key={t} className="rounded-md border border-primary-foreground/15 bg-primary-foreground/5 p-5">
                  <BadgeCheck size={18} className="text-bronze" strokeWidth={1.5} />
                  <p className="mt-3 text-sm font-medium text-primary-foreground">{t}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Auction houses */}
          <SpotBlock
            icon={Handshake}
            title="Auction House Partnerships"
            body="Service standards, fast turnaround times, dedicated points of contact, capacity for volume instructions, and the ability to work consistently to tight auction deadlines."
            cta={{ to: "/contact", hash: "partner", label: "Partner With Us" }}
          />

          {/* Downloads */}
          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {[
              { t: "Buyer's Guide to Auction Conveyancing", d: "Everything to know before bidding." },
              { t: "Seller's Guide to Auction Conveyancing", d: "How to prepare a lot that sells smoothly." },
            ].map((g) => (
              <a key={g.t} href="#" /* TODO: attach downloadable PDF guide */
                className="group flex items-center gap-5 rounded-md border border-primary-foreground/15 bg-primary-foreground/5 p-6 hover:bg-primary-foreground/10 transition-colors">
                <div className="h-12 w-12 shrink-0 rounded-sm bg-bronze/15 grid place-items-center">
                  <Download size={20} className="text-bronze" />
                </div>
                <div className="min-w-0">
                  <div className="font-medium text-primary-foreground">{g.t}</div>
                  <div className="text-sm text-primary-foreground/70">{g.d}</div>
                </div>
              </a>
            ))}
          </div>

          {/* Callback */}
          <div className="mt-14 rounded-md border border-primary-foreground/15 bg-primary-foreground/5 p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <PhoneCall size={28} className="text-bronze shrink-0 mt-1" strokeWidth={1.5} />
              <div>
                <h3 className="text-xl text-primary-foreground">Prefer a call back?</h3>
                <p className="mt-2 text-sm text-primary-foreground/70 max-w-md">
                  Tell us when suits and one of our auction team will be in touch the same working day.
                </p>
              </div>
            </div>
            <Link to="/contact" hash="callback"
              className="inline-flex items-center justify-center rounded-sm bg-bronze px-6 py-3 text-sm font-medium text-accent-foreground hover:opacity-90 transition-opacity">
              Request a Call Back
            </Link>
          </div>
        </div>
      </section>

      {/* Panel Management */}
      <section id="panel-management" className="py-20 md:py-28 scroll-mt-20">
        <div className="container-prose grid lg:grid-cols-[1fr_1.2fr] gap-14">
          <div>
            <span className="eyebrow">Pillar 03</span>
            <h2 className="mt-4 text-4xl md:text-5xl">Panel management for estate agents &amp; mortgage brokers</h2>
          </div>
          <div className="space-y-5 text-foreground/85 leading-relaxed">
            <p>
              We act as a dedicated extension of your business — quoting new leads, allocating
              instructions to the right firm or fee-earner, monitoring capacity, and maintaining
              the panel relationships that keep your pipeline flowing.
            </p>
            <p>
              Our team handles escalations and complaints directly, so issues never drag on your
              client relationships, and reports back to you with the operational visibility your
              business needs to plan ahead.
            </p>
            <p>
              The result: better communication, fewer fall-throughs, less administrative burden on
              your team — and a level of service that reflects positively on your brand.
            </p>
          </div>
        </div>
      </section>


      {/* Team */}
      <section id="team" className="py-20 md:py-28 scroll-mt-20">
        <div className="container-prose">
          <div className="max-w-2xl">
            <span className="eyebrow">Pillar 05</span>
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

      <CTABanner heading="Let's talk" sub="Whatever the property matter — we'd like to hear from you." />
      <BackToTop />
    </>
  );
}

function SpotBlock({
  icon: I, title, body, cta,
}: { icon: any; title: string; body: string; cta?: { to: string; hash?: string; label: string } }) {
  return (
    <div className="mt-14 grid md:grid-cols-[auto_1fr] gap-6 md:gap-8 items-start">
      <div className="h-14 w-14 rounded-sm bg-bronze/15 grid place-items-center shrink-0">
        <I size={24} className="text-bronze" strokeWidth={1.5} />
      </div>
      <div>
        <h3 className="text-2xl text-primary-foreground">{title}</h3>
        <p className="mt-3 text-primary-foreground/80 leading-relaxed max-w-3xl">{body}</p>
        {cta && (
          <Link to={cta.to} hash={cta.hash}
            className="mt-5 inline-flex items-center gap-2 rounded-sm bg-bronze px-5 py-2.5 text-sm font-medium text-accent-foreground hover:opacity-90 transition-opacity">
            {cta.label} →
          </Link>
        )}
      </div>
    </div>
  );
}
