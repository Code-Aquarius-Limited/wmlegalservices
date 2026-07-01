import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type MouseEvent } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import logoAsset from "@/assets/WM_Legal_Services_Logo.png.asset.json";

const serviceLinks = [
  { to: "/services", hash: "conveyancing", label: "Conveyancing & Property Services" },
  { to: "/services", hash: "auctions", label: "Auction Conveyancing Specialists" },
  { to: "/services", hash: "panel-management", label: "Panel Management" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToService = (hash: string) => {
    const el = document.getElementById(hash);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleServiceClick = async (event: MouseEvent<HTMLAnchorElement>, hash: string) => {
    event.preventDefault();
    setOpen(false);

    if (location.pathname === "/services" && location.hash?.replace("#", "") === hash) {
      scrollToService(hash);
      return;
    }

    await navigate({ to: "/services", hash, resetScroll: false });
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all ${
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border"
          : "bg-background/70 backdrop-blur-sm"
      }`}
    >
      <div className="container-prose flex h-28 items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2 group" onClick={() => setOpen(false)}>
          <img
            src={logoAsset.url}
            alt="WM Legal Services"
            className="h-16 w-auto object-contain md:h-20"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            activeProps={{ className: "text-primary" }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>

          <div className="group relative">
            <button
              type="button"
              className="inline-flex items-center gap-1 text-sm font-medium text-foreground/80 transition-colors hover:text-primary focus:text-primary focus:outline-none"
            >
              Our Services
              <ChevronDown
                size={14}
                className="shrink-0 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
              />
            </button>
            <div className="invisible absolute left-0 top-full z-50 min-w-[16rem] rounded-md border bg-popover p-1 text-popover-foreground opacity-0 shadow-md transition-opacity duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              {serviceLinks.map((s) => (
                <a
                  key={s.hash}
                  href={`${s.to}#${s.hash}`}
                  onClick={(event) => handleServiceClick(event, s.hash)}
                  className="block rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <Link
            to="/contact"
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            activeProps={{ className: "text-primary" }}
            activeOptions={{ exact: true }}
          >
            Contact Us
          </Link>

          <Link
            to="/contact"
            hash="quote"
            className="inline-flex items-center justify-center rounded-sm bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Get a Quote
          </Link>
        </nav>

        <button
          aria-label="Open menu"
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-sm border border-border text-primary"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container-prose py-4 flex flex-col">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="py-3 text-sm font-medium text-foreground/80 border-b border-border/60"
            >
              Home
            </Link>

            <div className="py-3 border-b border-border/60">
              <span className="text-sm font-medium text-foreground/80">Our Services</span>
              <ul className="mt-2 ml-3 space-y-1 border-l border-border pl-3">
                {serviceLinks.map((s) => (
                  <li key={s.hash}>
                    <a
                      href={`${s.to}#${s.hash}`}
                      onClick={(event) => handleServiceClick(event, s.hash)}
                      className="block py-1.5 text-sm text-foreground/70 hover:text-primary"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="py-3 text-sm font-medium text-foreground/80 border-b border-border/60"
            >
              Contact Us
            </Link>

            <Link
              to="/contact"
              hash="quote"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex items-center justify-center rounded-sm bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
