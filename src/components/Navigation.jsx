import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";

const links = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#philosophy" },
  { label: "Services", href: "/#services" },
  { label: "Projects", href: "/#projects" },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    let previousY = window.scrollY;
    let frame = 0;
    const updateScrollState = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const currentY = window.scrollY;
        setScrolled(currentY > 24);
        if (!menuOpen) {
          if (currentY < 120 || currentY < previousY - 5) setHidden(false);
          else if (currentY > previousY + 5) setHidden(true);
        }
        previousY = currentY;
        frame = 0;
      });
    };
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateScrollState);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [menuOpen]);

  useEffect(() => setMenuOpen(false), [location.pathname]);

  const navigateTo = (href) => {
    setMenuOpen(false);
    if (href.startsWith("/#") && location.pathname === "/") {
      document.querySelector(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className={`site-header ${isHome && !scrolled ? "is-over-hero" : "is-scrolled"} ${menuOpen ? "menu-open" : ""} ${hidden && !menuOpen ? "is-hidden" : ""}`}>
      <div className="nav-shell">
        <Link className="wordmark" to="/" aria-label="Dollyspro home" onClick={() => setMenuOpen(false)}>
          <span className="wordmark-name">dollyspro<span>®</span></span>
          <small>INTERIOR DESIGN STUDIO</small>
        </Link>

        <nav className={`desktop-nav ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
          {links.map((link) => (
            <Link key={link.label} to={link.href} onClick={() => navigateTo(link.href)}>
              {link.label}
            </Link>
          ))}
          <Link className="nav-cta" to="/contact" onClick={() => setMenuOpen(false)}>
            Contact <ArrowUpRight size={15} strokeWidth={1.6} />
          </Link>
        </nav>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
    </header>
  );
}
