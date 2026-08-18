import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';

// Below this scroll offset the header always stays visible.
const REVEAL_ZONE = 140;
// Minimum px of travel before a direction change counts, so trackpad jitter
// and iOS rubber-banding don't flicker the header.
const SCROLL_THRESHOLD = 6;
// Scroll offset at which the backdrop scrim fades in behind the pills.
const SCRIM_OFFSET = 24;

const Header = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  // Auto-hide: the header slides away while reading down the page so content
  // never scrolls through the gaps between the pills, and returns on scroll up.
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Re-subscribed per route so a navigation always re-baselines from the real
  // scroll position and reveals the header, however the new page enters.
  useEffect(() => {
    let previous = window.scrollY;

    const evaluate = (force) => {
      const latest = window.scrollY;
      const delta = latest - previous;

      setScrolled(latest > SCRIM_OFFSET);

      if (force || latest <= REVEAL_ZONE || delta < -SCROLL_THRESHOLD) setHidden(false);
      else if (delta > SCROLL_THRESHOLD) setHidden(true);

      // Only advance the reference point once the move was big enough to act
      // on, otherwise a slow drag never accumulates past the threshold.
      if (force || Math.abs(delta) > SCROLL_THRESHOLD) previous = latest;
    };

    const onScroll = () => evaluate(false);

    evaluate(true);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
  ];

  return (
    <>
      <header
        className={`fixed top-4 sm:top-6 left-0 w-full z-50 px-4 sm:px-margin pointer-events-none transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          hidden && !isOpen ? '-translate-y-[180%]' : 'translate-y-0'
        }`}
      >
        {/* Full-bleed backdrop. Only fades in once scrolled, so the hero keeps
            its edge-to-edge look while the header floats over it at the top. */}
        <div
          aria-hidden="true"
          className={`absolute inset-x-0 -top-4 sm:-top-6 -bottom-4 sm:-bottom-6 -z-10 bg-background/85 backdrop-blur-xl border-b border-primary/5 transition-opacity duration-300 ${
            scrolled ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <div className="max-w-7xl mx-auto relative flex justify-between items-center h-20 sm:h-24">
          
          {/* Background Connecting Lines (The Constellation) - Hidden on mobile */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-visible hidden lg:block">
            <svg className="w-full h-full">
              <motion.path 
                d="M 180 48 L 480 48" 
                stroke="rgba(0,0,0,0.1)" 
                strokeWidth="1" 
                fill="none" 
                strokeDasharray="4 4"
                animate={{ strokeDashoffset: [0, -20] }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              />
              <motion.path 
                d="M 820 48 L 1100 48" 
                stroke="rgba(0,0,0,0.1)" 
                strokeWidth="1" 
                fill="none" 
                strokeDasharray="4 4"
                animate={{ strokeDashoffset: [0, -20] }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              />
              <motion.circle 
                r="2" cy={48} fill="var(--color-primary)"
                initial={{ cx: 200, opacity: 0 }}
                animate={{ cx: [200, 460], opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              />
              <motion.circle 
                r="2" cy={48} fill="var(--color-secondary)"
                initial={{ cx: 840, opacity: 0 }}
                animate={{ cx: [840, 1080], opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 1.5 }}
              />
            </svg>
          </div>

          {/* Left: Logo Pill */}
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="glass rounded-full px-5 sm:px-10 py-3 sm:py-5 pointer-events-auto border border-primary/10 hover:border-accent/40 transition-all shadow-lg bg-surface"
          >
            <Link to="/" className="flex items-center">
              <img 
                src={logo} 
                alt="CREATIVZEDGE" 
                className="h-8 sm:h-14 w-auto object-contain"
              />
            </Link>
          </motion.div>

          {/* Center: Menu Pill (Desktop) */}
          <motion.nav 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="glass rounded-full px-12 py-6 hidden lg:flex gap-12 items-center pointer-events-auto border border-primary/10 shadow-2xl bg-surface"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-outfit text-[12px] font-black uppercase tracking-[0.25em] transition-all hover:text-primary ${
                  location.pathname === link.path ? 'text-primary' : 'text-on-surface-variant'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </motion.nav>

          {/* Right: Toggle / Contact Pill */}
          <div className="flex gap-4 items-center pointer-events-auto">
            {/* Mobile Toggle */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden glass rounded-full w-12 h-12 flex flex-col items-center justify-center gap-1.5 border border-primary/10 active:scale-95 transition-all"
            >
              <motion.span 
                animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="w-5 h-0.5 bg-primary block"
              ></motion.span>
              <motion.span 
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-5 h-0.5 bg-primary block"
              ></motion.span>
              <motion.span 
                animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="w-5 h-0.5 bg-primary block"
              ></motion.span>
            </button>

            {/* CTA Pill */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="glass rounded-full px-2 py-2 border border-primary/10 shadow-2xl hidden sm:block bg-surface"
            >
              <Link 
                to="/contact"
                className="cyber-btn"
              >
                Initiate
              </Link>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-2xl flex flex-col items-center justify-center px-6 py-12 lg:hidden"
          >
            <div className="flex flex-col gap-6 sm:gap-8 text-center w-full">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`syne-title text-[clamp(1.5rem,7.5vw,2.75rem)] tracking-tight leading-tight transition-all hover:text-primary ${
                      location.pathname === link.path ? 'text-primary' : 'text-secondary/40'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-10"
              >
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="cyber-btn"
                >
                  Initiate Project
                </Link>

              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
