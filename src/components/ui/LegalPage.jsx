import { motion } from 'framer-motion';

// Shared layout for simple legal/long-form documents (Privacy, Terms, etc.).
const LegalPage = ({ eyebrow, title, updated, body }) => {
  return (
    <div className="relative pt-[150px] sm:pt-[220px] pb-24 overflow-hidden min-h-screen bg-background">
      <div className="ambient-glow top-[-10%] right-[-10%] bg-primary/20"></div>

      <section className="max-w-3xl mx-auto px-margin relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[2px] bg-brand-maroon/70"></div>
            <span className="font-outfit text-[12px] font-black tracking-[0.35em] text-primary uppercase">{eyebrow}</span>
          </div>
          <h1 className="syne-title text-[clamp(1.75rem,6vw,3.25rem)] text-primary leading-[1.05] text-balance">
            {title}
          </h1>
          {updated && <p className="font-inter text-sm text-on-surface-variant/60 mt-5">{updated}</p>}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 space-y-6 border-t border-primary/10 pt-10"
        >
          {body.map((para, i) => (
            <p key={i} className="font-inter text-on-surface-variant text-base sm:text-lg leading-relaxed">
              {para}
            </p>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default LegalPage;
