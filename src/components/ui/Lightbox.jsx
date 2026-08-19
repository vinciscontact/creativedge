import { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

// Full-screen viewer for the portfolio artwork. Opening is driven by the parent
// (click / Enter on a tile); this component owns everything that happens once
// it's open: keyboard nav, scroll lock and the prev/next cycling.
//
// `items` is the list the arrows walk through — the caller passes the group the
// clicked image belongs to (a chapter's gallery, the clients row, …) so next/prev
// stay inside one set instead of wandering across the whole page.
const Lightbox = ({ items, index, onClose, onNavigate }) => {
  const isOpen = index !== null && index >= 0 && items.length > 0;
  const current = isOpen ? items[index] : null;
  const many = items.length > 1;

  // Wrap around at both ends so the arrows never dead-end.
  const step = useCallback(
    (delta) => onNavigate((index + delta + items.length) % items.length),
    [index, items.length, onNavigate],
  );

  // Esc closes, arrows page through. Bound to the document because focus starts
  // on the close button but may move to either arrow.
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight' && many) step(1);
      else if (e.key === 'ArrowLeft' && many) step(-1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, many, onClose, step]);

  // Lock the page behind the overlay. Padding compensates for the scrollbar so
  // the layout underneath doesn't jump sideways as it disappears.
  useEffect(() => {
    if (!isOpen) return undefined;
    const { body } = document;
    const prevOverflow = body.style.overflow;
    const prevPadding = body.style.paddingRight;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = 'hidden';
    if (gap > 0) body.style.paddingRight = `${gap}px`;
    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPadding;
    };
  }, [isOpen]);

  // Unmount outright when closed rather than animating out through
  // AnimatePresence: under React 19 + StrictMode the exit callback doesn't fire
  // reliably for a portalled child, which left an invisible full-screen overlay
  // mounted and swallowing every click on the page. The enter animation below
  // still runs; only the fade-out is given up, and that trade is worth it.
  if (!isOpen) return null;

  // Rendered into <body> so the page's overflow-clip / transformed ancestors
  // can't trap the fixed overlay inside a chapter.
  return createPortal(
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={current?.alt || 'Portfolio image'}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      // Backdrop click closes; the image itself stops propagation below.
      onClick={onClose}
      className="fixed inset-0 z-[100] flex flex-col bg-background/95 backdrop-blur-xl p-4 sm:p-6"
    >
      {/* Top bar: caption + close. shrink-0 keeps it off the image's height budget. */}
      <div className="shrink-0 flex items-center justify-between gap-4 mb-3 sm:mb-4">
        <span className="font-outfit text-[10px] sm:text-[11px] font-black tracking-[0.25em] text-accent uppercase min-w-0 truncate">
          {current?.label}
        </span>
        <div className="flex items-center gap-3 shrink-0">
          {many && (
            <span className="font-outfit text-[10px] sm:text-[11px] font-black tracking-widest text-on-surface-variant tabular-nums">
              {index + 1} / {items.length}
            </span>
          )}
          <button
            type="button"
            autoFocus
            onClick={onClose}
            aria-label="Close image viewer"
            className="grid place-items-center w-10 h-10 rounded-full glass border border-primary/10 text-primary hover:border-accent hover:text-accent transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Stage — min-h-0 lets the flex child actually shrink, which is what
          keeps the image inside the viewport on short/landscape screens. */}
      <div className="flex-1 min-h-0 flex items-center justify-center gap-2 sm:gap-4">
        {many && (
          <NavButton dir="prev" onClick={(e) => { e.stopPropagation(); step(-1); }} />
        )}

        {/* flex-1 + min-w-0 is what keeps the arrows on screen: the image measures
            max-w-full against THIS box, so it takes the width left over after the
            two buttons instead of shoving the next one past the viewport edge. */}
        <div className="flex-1 min-w-0 h-full flex items-center justify-center">
          <motion.img
            key={current?.src}
            src={current?.src}
            alt={current?.alt || ''}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-full max-h-full w-auto h-auto object-contain rounded-xl sm:rounded-2xl shadow-2xl bg-surface"
          />
        </div>

        {many && (
          <NavButton dir="next" onClick={(e) => { e.stopPropagation(); step(1); }} />
        )}
      </div>

      <p className="shrink-0 mt-3 sm:mt-4 text-center font-inter text-[11px] sm:text-xs text-on-surface-variant">
        Tap outside or press Esc to close
      </p>
    </motion.div>,
    document.body,
  );
};

// Round prev/next control. Kept compact on phones so the image keeps the width.
const NavButton = ({ dir, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={dir === 'prev' ? 'Previous image' : 'Next image'}
    className="shrink-0 grid place-items-center w-9 h-9 sm:w-12 sm:h-12 rounded-full glass border border-primary/10 text-primary hover:border-accent hover:text-accent transition-colors"
  >
    <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={dir === 'prev' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
    </svg>
  </button>
);

export default Lightbox;
