import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Quick-nav destinations shown when the pen is tapped.
const PAGES = [
  { name: 'Home', path: '/', icon: 'home' },
  { name: 'About', path: '/about', icon: 'person' },
  { name: 'Services', path: '/services', icon: 'design_services' },
  { name: 'Portfolio', path: '/portfolio', icon: 'gallery_thumbnail' },
  { name: 'Contact', path: '/contact', icon: 'bolt' },
];

// Rotating "hooks" — playful nudges that pop up as the visitor scrolls.
const MESSAGES = [
  { text: "Hi, I'm Edge ✦ your design guide!" },
  { text: 'Loved our work? Let’s create yours →', to: '/portfolio', cta: 'See the work' },
  { text: 'Got an idea? Let’s make it real.', to: '/contact', cta: 'Start a project' },
  { text: '15+ years of design magic ✨', to: '/about', cta: 'Meet the team' },
  { text: 'Need a logo that truly pops?', to: '/contact', cta: 'Let’s talk' },
];

const DesignerPen = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [bubbleOpen, setBubbleOpen] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);

  const lastShownRef = useRef(0);
  const hideTimerRef = useRef(null);
  const idleTimerRef = useRef(null);

  // Greet shortly after load.
  useEffect(() => {
    idleTimerRef.current = setTimeout(() => {
      setBubbleOpen(true);
      hideTimerRef.current = setTimeout(() => setBubbleOpen(false), 5000);
    }, 2500);
    return () => {
      clearTimeout(idleTimerRef.current);
      clearTimeout(hideTimerRef.current);
    };
  }, []);

  // Pop a fresh message as the visitor scrolls (throttled so it never nags).
  useEffect(() => {
    const onScroll = () => {
      if (menuOpen) return;
      const now = Date.now();
      if (now - lastShownRef.current < 9000) return;
      lastShownRef.current = now;

      setMsgIndex((i) => (i + 1) % MESSAGES.length);
      setBubbleOpen(true);
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = setTimeout(() => setBubbleOpen(false), 5000);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [menuOpen]);

  // Close the menu whenever the route changes (reset transient UI to the new route).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setBubbleOpen(false);
    setMenuOpen((o) => !o);
  };

  const msg = MESSAGES[msgIndex];

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-[60] flex flex-col items-end gap-3 print:hidden">
      {/* Quick-nav menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: 16, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            className="glass rounded-3xl p-2.5 shadow-2xl border border-primary/10 w-56 origin-bottom-right"
          >
            <div className="px-3 py-2 mb-1">
              <p className="font-outfit text-[10px] font-black tracking-[0.25em] text-accent uppercase">Jump to</p>
            </div>
            {PAGES.map((page, i) => {
              const active = location.pathname === page.path;
              return (
                <motion.div
                  key={page.path}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.03 * i }}
                >
                  <Link
                    to={page.path}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all font-outfit text-[13px] font-bold ${
                      active
                        ? 'bg-primary text-surface'
                        : 'text-primary hover:bg-primary/5'
                    }`}
                  >
                    <span className={`material-symbols-outlined text-[18px] ${active ? 'text-accent' : 'text-secondary'}`}>
                      {page.icon}
                    </span>
                    {page.name}
                  </Link>
                </motion.div>
              );
            })}
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Speech bubble */}
      <AnimatePresence>
        {bubbleOpen && !menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="relative max-w-[230px] bg-primary text-surface rounded-2xl rounded-br-md px-4 py-3 shadow-2xl"
          >
            <button
              onClick={() => setBubbleOpen(false)}
              aria-label="Dismiss"
              className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-surface text-primary flex items-center justify-center shadow-md hover:bg-accent transition-colors"
            >
              <span className="material-symbols-outlined text-[13px]">close</span>
            </button>
            <p className="font-inter text-[13px] leading-snug">{msg.text}</p>
            {msg.to && (
              <Link
                to={msg.to}
                onClick={() => setBubbleOpen(false)}
                className="inline-flex items-center gap-1 mt-2 font-outfit text-[10px] font-black tracking-[0.15em] text-accent uppercase hover:gap-2 transition-all"
              >
                {msg.cta}
                <span className="material-symbols-outlined text-[14px]">arrow_right_alt</span>
              </Link>
            )}
            {/* Tail */}
            <span className="absolute -bottom-1.5 right-4 w-3 h-3 bg-primary rotate-45"></span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The pen button */}
      <motion.button
        onClick={toggleMenu}
        aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
        whileTap={{ scale: 0.9 }}
        animate={menuOpen ? { y: 0 } : { y: [0, -6, 0] }}
        transition={menuOpen ? {} : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        className="relative w-14 h-14 rounded-full bg-accent text-primary shadow-[0_10px_30px_rgba(197,168,128,0.45)] flex items-center justify-center group"
      >
        {/* Pulsing ring (hidden once interacted) */}
        {!menuOpen && (
          <span className="absolute inset-0 rounded-full bg-accent/40 animate-ping"></span>
        )}
        <motion.span
          animate={{ rotate: menuOpen ? 90 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="material-symbols-outlined text-[26px] relative z-10"
          style={{ transform: menuOpen ? 'none' : 'rotate(-12deg)' }}
        >
          {menuOpen ? 'close' : 'ink_pen'}
        </motion.span>
      </motion.button>
    </div>
  );
};

export default DesignerPen;
