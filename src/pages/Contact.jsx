import { ArrowLeft, ArrowUpRight, Clock3, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import EnquiryForm from "../components/EnquiryForm.jsx";

export default function Contact() {
  return (
    <main className="inner-page contact-page">
      <section className="contact-layout section-wrap">
        <div className="contact-aside">
          <Link className="back-link" to="/"><ArrowLeft size={15} /> Back home</Link>
          <span className="eyebrow">A good place to start</span>
          <h1>Let&apos;s talk<br /><em>about home.</em></h1>
          <p>Tell us a little about what you&apos;re imagining. We&apos;ll make a cuppa and take it from there.</p>
          <div className="contact-details">
            <a href="mailto:hello@dollyspro.com.au">hello@dollyspro.com.au <ArrowUpRight size={14} /></a>
            <span><MapPin size={15} /> Melbourne, Australia</span>
            <span><Clock3 size={15} /> Monday — Friday, 9am — 5pm</span>
          </div>
          <div className="contact-photo">
            <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1100&q=85" alt="Soft neutral interior with warm natural light" />
          </div>
        </div>
        <div className="contact-form-panel">
          <span className="eyebrow">Tell us a little more</span>
          <EnquiryForm />
        </div>
      </section>
    </main>
  );
}
