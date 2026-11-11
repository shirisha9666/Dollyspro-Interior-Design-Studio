import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      className="whatsapp-button"
      href="https://wa.me/?text=Hello%20Dollyspro%2C%20I%27d%20love%20to%20talk%20about%20a%20project."
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Dollyspro on WhatsApp"
    >
      <MessageCircle size={19} />
      <span>Let&apos;s chat</span>
    </a>
  );
}
