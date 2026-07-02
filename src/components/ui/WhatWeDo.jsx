import { motion } from 'framer-motion';

const items = [
  { abbr: 'SEO', title: 'Search Engine Optimization', desc: 'Rank higher and get found by the customers already searching for you.', icon: 'search' },
  { abbr: 'GEO', title: 'Generative Engine Optimization', desc: 'Get your brand cited and surfaced inside AI-powered answer engines.', icon: 'auto_awesome' },
  { abbr: 'AEO', title: 'Answer Engine Optimization', desc: 'Own the featured snippets and voice results that win the click.', icon: 'forum' },
  { abbr: 'SMO', title: 'Social Media', desc: 'Build presence and community across every social platform that matters.', icon: 'share' },
];

// Digital-growth services block. Lives on the Services page only — the Home
// page teases this with its own distinct "pillars" section instead, so the
// same content never appears twice on the site.
const WhatWeDo = () => {
  return (
    <div className="mb-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-8 h-[2px] bg-primary"></div>
          <span className="font-outfit text-[12px] font-black tracking-[0.4em] text-primary uppercase">Digital Growth</span>
          <div className="w-8 h-[2px] bg-primary"></div>
        </div>
        <h2 className="syne-title text-[clamp(2rem,5vw,3.5rem)] text-primary leading-[1.05]">
          Strategies That Drive <span className="text-secondary">Growth.</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, i) => (
          <motion.div
            key={item.abbr}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="group relative overflow-hidden rounded-[26px] bg-primary text-surface p-8 flex flex-col min-h-[260px] transition-transform duration-500 hover:-translate-y-2"
          >
            {/* Top-aligned flow (no bottom anchoring) so the SEO/GEO/AEO/SMO
                headings and descriptions line up across all four cards. The
                subtitle reserves two lines so short ones don't shift the rest. */}
            <div className="w-12 h-12 rounded-full border border-surface/20 flex items-center justify-center mb-8 group-hover:border-accent transition-colors">
              <span className="material-symbols-outlined text-[24px] text-accent">{item.icon}</span>
            </div>
            <div className="relative z-10">
              <h3 className="font-syne text-2xl text-surface mb-2 tracking-wide group-hover:text-accent transition-colors">{item.abbr}</h3>
              <p className="font-outfit text-[11px] font-black uppercase tracking-[0.15em] text-surface/70 mb-4 min-h-[2.9em]">{item.title}</p>
              <p className="font-inter text-[13px] text-surface/60 leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="font-inter text-on-surface-variant text-center max-w-3xl mx-auto leading-relaxed mt-12"
      >
        We craft digital strategies that connect brands with the right audience. From SEO to social media, we boost
        visibility and drive results — bringing ideas to life through design, content, and campaigns. Simply put, we
        help you grow, online and everywhere.
      </motion.p>
    </div>
  );
};

export default WhatWeDo;
