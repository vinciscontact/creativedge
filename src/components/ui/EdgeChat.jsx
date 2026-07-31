import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { WHATSAPP_NUMBER } from '../../config/site';

const WA_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi CreativzEdge! I'd like to talk about a project."
)}`;

// Scripted FAQ tree — no backend, no cost: every bot turn offers quick-reply
// chips, and the "real talk" paths hand off to WhatsApp or the contact form.
const NODES = {
  root: {
    reply: ["Hi, I'm Edge ✦ CreativzEdge's design guide. What would you like to know?"],
    options: ['services', 'pricing', 'studios', 'work', 'start'],
  },
  services: {
    label: 'What do you offer?',
    reply: [
      'Two sides, one studio:',
      '🎨 Design — logos & brand identity, packaging, social media creatives, brochures, menus, print & event design, vehicle branding.',
      '📈 Digital growth — SEO, GEO and AEO, so your brand gets found on Google and in AI answers.',
    ],
    links: [{ label: 'Explore services', to: '/services' }],
    options: ['pricing', 'work', 'start'],
  },
  pricing: {
    label: 'Pricing & timelines',
    reply: [
      "Every brand's needs are different, so we scope each project individually — a quick logo refresh and a full identity system are very different animals.",
      'Send us your brief and we usually reply within hours with a clear quote and timeline.',
    ],
    links: [{ label: 'Share your brief', to: '/contact' }],
    options: ['services', 'start'],
  },
  studios: {
    label: 'Where are you based?',
    reply: [
      'Two studios in India:',
      '📍 Chennai — Saligramam · +91 72999 42627',
      '📍 Mumbai — Andheri East · +91 95003 40369',
      'We work with clients across India, the UK and the USA.',
    ],
    links: [{ label: 'Contact details', to: '/contact' }],
    options: ['services', 'start'],
  },
  work: {
    label: 'Show me your work',
    reply: [
      '1,000+ projects for 100+ clients — logos, packaging, social media, events and more. The portfolio tells it best.',
    ],
    links: [{ label: 'See the portfolio', to: '/portfolio' }],
    options: ['services', 'start'],
  },
  start: {
    label: 'Start a project',
    reply: [
      "Love it — let's talk. WhatsApp is fastest (we reply within hours), or drop your brief on the contact page.",
    ],
    links: [
      { label: 'Chat on WhatsApp', href: WA_LINK },
      { label: 'Contact form', to: '/contact' },
    ],
    options: ['services', 'pricing'],
  },
};

const EdgeChat = ({ open, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [options, setOptions] = useState([]);
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);
  const timerRef = useRef(null);

  const pushNode = (id, asUser = false) => {
    const node = NODES[id];
    if (asUser) setMessages((m) => [...m, { from: 'user', text: node.label }]);
    setOptions([]);
    setTyping(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { from: 'bot', lines: node.reply, links: node.links }]);
      setOptions(node.options);
    }, 550);
  };

  // Greet on first open; conversation persists across close/reopen.
  useEffect(() => {
    if (open && messages.length === 0 && !typing) pushNode('root');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, typing, open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 320, damping: 26 }}
          className="glass rounded-3xl shadow-2xl border border-primary/10 w-[min(92vw,360px)] max-h-[min(70vh,540px)] flex flex-col overflow-hidden origin-bottom-right"
        >
          {/* Header */}
          <div className="bg-primary text-surface px-4 py-3 flex items-center gap-3 shrink-0">
            <span className="w-8 h-8 rounded-full bg-accent text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]" style={{ transform: 'rotate(-12deg)' }}>ink_pen</span>
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-outfit text-[13px] font-bold leading-tight">Edge</p>
              <p className="font-inter text-[10px] text-surface/60 leading-tight">Design guide · replies instantly</p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close chat"
              className="w-7 h-7 rounded-full hover:bg-surface/10 flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-2.5 min-h-[180px]">
            {messages.map((m, i) =>
              m.from === 'user' ? (
                <div key={i} className="self-end max-w-[85%] bg-accent text-primary rounded-2xl rounded-br-md px-3.5 py-2 font-inter text-[13px] leading-snug">
                  {m.text}
                </div>
              ) : (
                <div key={i} className="self-start max-w-[90%] bg-primary/5 text-primary rounded-2xl rounded-bl-md px-3.5 py-2.5 space-y-1.5">
                  {m.lines.map((line, j) => (
                    <p key={j} className="font-inter text-[13px] leading-snug">{line}</p>
                  ))}
                  {m.links && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {m.links.map((link) =>
                        link.href ? (
                          <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-outfit text-[10px] font-black tracking-[0.12em] uppercase text-surface bg-primary rounded-full px-3 py-1.5 hover:bg-accent hover:text-primary transition-colors"
                          >
                            {link.label}
                            <span className="material-symbols-outlined text-[13px]">arrow_outward</span>
                          </a>
                        ) : (
                          <Link
                            key={link.label}
                            to={link.to}
                            onClick={onClose}
                            className="inline-flex items-center gap-1 font-outfit text-[10px] font-black tracking-[0.12em] uppercase text-surface bg-primary rounded-full px-3 py-1.5 hover:bg-accent hover:text-primary transition-colors"
                          >
                            {link.label}
                            <span className="material-symbols-outlined text-[13px]">arrow_right_alt</span>
                          </Link>
                        )
                      )}
                    </div>
                  )}
                </div>
              )
            )}

            {typing && (
              <div className="self-start bg-primary/5 rounded-2xl rounded-bl-md px-4 py-3 flex gap-1.5">
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce"
                    style={{ animationDelay: `${d * 0.15}s` }}
                  ></span>
                ))}
              </div>
            )}
            <div ref={endRef}></div>
          </div>

          {/* Quick replies */}
          {options.length > 0 && (
            <div className="px-3 pb-3 pt-1 flex flex-wrap gap-2 shrink-0 border-t border-primary/5">
              {options.map((id) => (
                <button
                  key={id}
                  onClick={() => pushNode(id, true)}
                  className="font-outfit text-[11px] font-bold text-primary border border-primary/20 rounded-full px-3.5 py-1.5 mt-2 hover:bg-primary hover:text-surface transition-colors"
                >
                  {NODES[id].label}
                </button>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EdgeChat;
