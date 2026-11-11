import { ArrowUp, ArrowUpRight, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <span className="eyebrow eyebrow-light">A home should feel like you.</span>
          <h2>Let&apos;s make<br /><em>room for good things.</em></h2>
        </div>
        <Link className="footer-contact-link" to="/contact">
          Start a conversation <ArrowUpRight size={18} />
        </Link>
      </div>
      <div className="footer-bottom">
        <Link className="wordmark wordmark-light" to="/">
          <span className="wordmark-name">dollyspro<span>®</span></span><small>INTERIOR DESIGN STUDIO</small>
        </Link>
        <p>Melbourne & beyond<br />By appointment, always.</p>
        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram">
          Instagram <Instagram size={15} />
        </a>
        <button className="back-to-top" type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          Back to top <ArrowUp size={14} />
        </button>
        <span className="copyright">© {new Date().getFullYear()} Dollyspro Studio</span>
      </div>
    </footer>
  );
}
