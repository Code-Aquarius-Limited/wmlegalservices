import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Gavel, Handshake } from "lucide-react";
import { EnquiryForm } from "@/components/site/EnquiryForm";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — WM Legal Services" },
      { name: "description", content: "Get in touch with the WM Legal Services property law team. Quotes, instructions, partnerships and general enquiries." },
      { property: "og:title", content: "Contact Us — WM Legal Services" },
      { property: "og:description", content: "Whether you're looking for a quote, ready to instruct, or interested in partnering — we're here to help." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <section className="bg-secondary border-b border-border">
        <div className="container-prose py-20 md:py-28">
          <span className="eyebrow">Contact</span>
          <h1 className="mt-5 text-5xl md:text-6xl max-w-3xl">Get in touch</h1>
          <p className="mt-5 max-w-2xl text-muted-foreground text-lg">
            Whether you're looking for a quote, ready to instruct us, or interested in partnering
            with our team — we're here to help.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-prose grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div id="quote" className="scroll-mt-20">
            <EnquiryForm formType="general" showTypeSelector />
          </div>

          <aside className="space-y-8">
            <div className="bg-card border border-border rounded-md p-8">
              <h3 className="text-xl font-medium text-primary">Direct contact</h3>
              <ul className="mt-6 space-y-5 text-sm">
                <li className="flex items-start gap-3">
                  <Phone size={16} className="mt-0.5 text-bronze shrink-0" />
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">Phone</div>
                    <a href="tel:+442032920669" className="font-medium text-foreground hover:text-bronze">
                      020 3292 0669

                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail size={16} className="mt-0.5 text-bronze shrink-0" />
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">Email</div>
                    <a href="mailto:enquiries@wmlegalservices.co.uk" className="font-medium text-foreground hover:text-bronze break-all">
                      enquiries@wmlegalservices.co.uk
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="mt-0.5 text-bronze shrink-0" />
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">Office</div>
                    {/* TODO: insert real office address */}
                    <div className="font-medium text-foreground">1 Property Lane<br />London, EC1A 1AA</div>
                  </div>
                </li>
              </ul>
            </div>




            {/* Quick links */}
            <div className="bg-card border border-border rounded-md p-8">
              <h3 className="text-lg font-medium text-primary">Looking for something specific?</h3>
              <div className="mt-5 grid gap-3">
                <Link to="/services" hash="auctions"
                  className="group flex items-center gap-3 p-3 rounded-sm border border-border hover:border-bronze transition-colors">
                  <Gavel size={18} className="text-bronze" strokeWidth={1.5} />
                  <span className="text-sm font-medium text-foreground group-hover:text-primary">
                    Auction enquiries
                  </span>
                </Link>
                <Link to="/services" hash="partner-with-us"
                  className="group flex items-center gap-3 p-3 rounded-sm border border-border hover:border-bronze transition-colors">
                  <Handshake size={18} className="text-bronze" strokeWidth={1.5} />
                  <span className="text-sm font-medium text-foreground group-hover:text-primary">
                    Partner / introducer enquiries
                  </span>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
