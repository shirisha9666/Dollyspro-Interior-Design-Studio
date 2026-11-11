import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";

export default function EnquiryForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  };

  return (
    <form className="enquiry-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label className="floating-field">
          <input name="name" autoComplete="name" placeholder=" " required />
          <span>Your name</span>
        </label>
        <label className="floating-field">
          <input name="phone" type="tel" autoComplete="tel" placeholder=" " pattern="[+0-9() .-]{7,}" required />
          <span>Phone number</span>
        </label>
      </div>
      <label className="floating-field">
        <select name="projectType" defaultValue="" required>
          <option value="" disabled hidden></option>
          <option>Residential design</option>
          <option>Commercial interiors</option>
          <option>Space planning</option>
          <option>Modular kitchen</option>
          <option>Styling and decor</option>
          <option>Turnkey execution</option>
          <option>Something else</option>
        </select>
        <span>Project type</span>
      </label>
      <label className="floating-field">
        <textarea name="message" rows="3" placeholder=" " required />
        <span>Tell us a little about your project</span>
      </label>
      <div className="form-submit-row">
        <p>We&apos;ll be in touch within two business days.</p>
        <button className="button button-dark" type="submit">
          Send enquiry {submitted ? <Check size={16} /> : <ArrowUpRight size={16} />}
        </button>
      </div>
      {submitted && (
        <p className="form-success" role="status">
          Thank you for getting in touch. Your demo enquiry is with us — we look forward to hearing more.
        </p>
      )}
    </form>
  );
}
