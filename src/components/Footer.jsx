import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { LOCATIONS } from '../config/site';

// Sourced from the site config so the footer can't drift from the schema data.
const CONTACT_EMAIL = LOCATIONS.chennai.email;

const STUDIO_LINKS = [
  { label: 'Vision', to: '/about' },
  { label: 'Expertise', to: '/services' },
  { label: 'Our Work', to: '/portfolio' },
];

const CONNECT_LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com/creativzedge_official/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/b-venkata-krishnan-87954a379' },
  {
    label: 'Google Reviews',
    href: 'https://www.google.com/search?kgmid=/g/11ylpc_5bh&hl=en-IN&q=Creativzedge#lrd=0x3a5267556e16bb0b:0x71872bfe942c800,1',
  },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms & Conditions', to: '/terms' },
];

const ColumnHeading = ({ children }) => (
  <h4 className="font-outfit text-[11px] font-black uppercase tracking-[0.3em] text-accent mb-6">{children}</h4>
);

// One shared link treatment: the label shifts a touch on hover so the whole
// footer responds the same way rather than each column inventing its own.
const linkClass =
  'inline-block font-inter text-[14px] text-surface/60 hover:text-surface hover:translate-x-1 transition-all duration-300';

const Footer = () => (
  <footer className="relative z-10 bg-primary overflow-hidden">
    <div className="ambient-glow bottom-[-40%] left-[-5%] bg-accent opacity-[0.07]"></div>

    <div className="relative z-10 max-w-7xl mx-auto px-margin">
      {/* Statement — the footer's own voice, kept short so the longest word
          always fits whole however narrow the screen gets */}
      <div className="pt-24 sm:pt-32 pb-16">
        <div className="flex items-center gap-3 mb-7">
          <div className="w-8 h-[1px] bg-accent/40"></div>
          <span className="font-outfit text-[11px] font-black tracking-[0.4em] uppercase text-accent">Say Hello</span>
        </div>
        <h2 className="syne-title text-[clamp(2.75rem,11vw,7rem)] leading-[0.88] text-surface">
          Let&apos;s <span className="text-gradient">talk.</span>
        </h2>

        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="group inline-flex items-center gap-4 mt-10 text-surface hover:text-accent transition-colors"
        >
          <span className="font-inter text-base sm:text-xl md:text-2xl break-keep">{CONTACT_EMAIL}</span>
          <span
            aria-hidden="true"
            className="material-symbols-outlined text-[22px] group-hover:translate-x-1.5 transition-transform duration-300"
          >
            arrow_forward
          </span>
        </a>

        <p className="font-outfit text-[11px] tracking-[0.3em] uppercase text-surface/40 mt-6">
          Chennai <span className="text-accent/50">&middot;</span> Mumbai
        </p>
      </div>

      {/* Link columns */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 border-t border-surface/10 pt-14 pb-16">
        <nav aria-label="Studio">
          <ColumnHeading>Studio</ColumnHeading>
          <ul className="space-y-4">
            {STUDIO_LINKS.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className={linkClass}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Connect">
          <ColumnHeading>Connect</ColumnHeading>
          <ul className="space-y-4">
            {CONNECT_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <Link to="/contact" className={linkClass}>Initiate Project</Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Legal">
          <ColumnHeading>Legal</ColumnHeading>
          <ul className="space-y-4">
            {LEGAL_LINKS.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className={linkClass}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Bottom bar — mark, copyright, credit */}
      <div className="border-t border-surface/10 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <Link to="/" aria-label="CreativzEdge home" className="inline-flex bg-surface rounded-xl px-4 py-2.5 shrink-0">
          <img src={logo} alt="CREATIVZEDGE" className="h-9 w-auto object-contain" />
        </Link>
        <p className="font-outfit text-[10px] text-surface/40 uppercase tracking-[0.2em] text-center">
          &copy; {new Date().getFullYear()} CreativzEdge Studio. Elevating digital reality.
        </p>
        <p className="font-outfit text-[10px] text-surface/40 uppercase tracking-[0.2em]">
          Designed by <span className="text-accent/80">TheVincis</span>
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
