import { useLocation } from 'react-router-dom';
import { WHATSAPP_NUMBER, LOCATIONS } from '../../config/site';

// Persistent WhatsApp + call access on every route — mobile local searchers
// land on /services or /portfolio from search and shouldn't need to find the
// contact page to reach us. Hidden on /contact, where full options exist.
const WA_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi CreativzEdge! I'd like to talk about a design project."
)}`;

const ContactFloat = () => {
  const location = useLocation();
  if (location.pathname === '/contact') return null;

  return (
    <div className="fixed bottom-6 left-4 sm:left-6 z-40 flex flex-col gap-3">
      <a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with CreativzEdge on WhatsApp"
        className="w-12 h-12 rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
      >
        {/* WhatsApp glyph (inline SVG — no icon-font dependency) */}
        <svg viewBox="0 0 32 32" className="w-6 h-6 fill-current" aria-hidden="true">
          <path d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.2 1.6 6L4 29l8.2-1.5c1.2.5 2.5.7 3.8.7 6.6 0 12-5.4 12-12S22.6 3 16 3zm0 21.8c-1.2 0-2.4-.3-3.5-.8l-.6-.3-4.9.9 1-4.7-.3-.6c-.9-1.5-1.4-3.2-1.4-5.3 0-5.4 4.4-9.8 9.8-9.8s9.8 4.4 9.8 9.8-4.5 10.8-9.9 10.8zm5.4-7.4c-.3-.1-1.7-.9-2-1s-.5-.1-.7.1-.8 1-.9 1.2-.3.2-.6.1c-.3-.1-1.2-.5-2.4-1.5-.9-.8-1.5-1.8-1.6-2.1-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5s0-.4 0-.5c-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4s-1 1-1 2.5 1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.7-.4z" />
        </svg>
      </a>
      <a
        href={`tel:${LOCATIONS.chennai.telephone.replace(/-/g, '')}`}
        aria-label="Call CreativzEdge"
        className="w-12 h-12 rounded-full bg-primary text-surface shadow-lg shadow-black/20 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
      >
        <span className="material-symbols-outlined text-[22px]" aria-hidden="true">call</span>
      </a>
    </div>
  );
};

export default ContactFloat;
