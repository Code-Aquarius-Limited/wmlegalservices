import { Link } from "@tanstack/react-router";
import { Instagram, Mail, Phone, MapPin } from "lucide-react";
import logoAsset from "@/assets/WM_Legal_Services_Logo.png.asset.json";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-prose py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2 max-w-sm">
          <div className="inline-block rounded bg-background p-2">
            <img
              src={logoAsset.url}
              alt="WM Legal Services"
              className="h-24 w-auto object-contain"
            />
          </div>
          <p className="mt-4 text-sm text-primary-foreground/70 leading-relaxed">
            Specialist property law team operating under Taylor Rose — one of the largest property
            law firms in the UK.
          </p>
          <a
            href="https://instagram.com/1propertylawyer"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-bronze transition-colors"
          >
            <Instagram size={16} /> @1propertylawyer
          </a>
        </div>

        <div>
          <h4 className="text-sm font-medium tracking-wide uppercase text-bronze">Contact</h4>
          <ul className="mt-5 space-y-3 text-sm text-primary-foreground/80">
            <li className="flex items-start gap-3">
              <Phone size={14} className="mt-1 shrink-0" />
              {/* TODO: insert real office phone number */}
              <span>020 0000 0000</span>
            </li>
            <li className="flex items-start gap-3">
              <Mail size={14} className="mt-1 shrink-0" />
              <a href="mailto:enquiries@wmlegalservices.co.uk" className="hover:text-bronze">
                enquiries@wmlegalservices.co.uk
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={14} className="mt-1 shrink-0" />
              {/* TODO: insert real office address */}
              <span>1 Property Lane, London, EC1A 1AA</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-medium tracking-wide uppercase text-bronze">Quick Links</h4>
          <ul className="mt-5 space-y-3 text-sm">
            <li><Link to="/" className="text-primary-foreground/80 hover:text-bronze">Home</Link></li>
            <li><Link to="/services" className="text-primary-foreground/80 hover:text-bronze">Our Services</Link></li>
            <li><Link to="/services" hash="auctions" className="text-primary-foreground/80 hover:text-bronze">Auction Conveyancing</Link></li>
            <li><Link to="/services" hash="panel-management" className="text-primary-foreground/80 hover:text-bronze">Panel Management</Link></li>
            <li><Link to="/services" hash="partner-with-us" className="text-primary-foreground/80 hover:text-bronze">Partner With Us</Link></li>
            <li><Link to="/contact" className="text-primary-foreground/80 hover:text-bronze">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="container-prose py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/60">
          <p>© {new Date().getFullYear()} WM Legal Services. Operating under Taylor Rose.</p>
          <p>Authorised &amp; regulated by the Solicitors Regulation Authority.</p>
        </div>
      </div>
    </footer>
  );
}
