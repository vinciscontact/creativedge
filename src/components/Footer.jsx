import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-surface/5 bg-primary pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-margin flex flex-col md:flex-row flex-wrap gap-12">
        <div className="w-full md:w-[calc(50%-24px)] flex-1 min-w-[280px]">
          {/* Using a filter to invert the logo color if it's dark, or assume logo is already fine */}
          <img src={logo} alt="CREATIVZEDGE" className="h-16 w-auto object-contain mb-6 filter invert opacity-80" />
          <p className="text-surface/70 font-inter max-w-sm leading-relaxed">
            Pioneering the intersection of artistic expression and high-fidelity technical performance. Built for those who demand the extraordinary.
          </p>
        </div>
        <div className="w-full md:flex-1 min-w-[150px]">
          <h4 className="font-outfit text-[12px] font-black uppercase tracking-[0.2em] text-accent mb-6">STUDIO</h4>
          <ul className="space-y-4 font-inter text-[14px] text-surface/60">
            <li><Link to="/about" className="hover:text-accent transition-colors">Vision</Link></li>
            <li><Link to="/services" className="hover:text-accent transition-colors">Expertise</Link></li>
            <li><Link to="/portfolio" className="hover:text-accent transition-colors">Our Work</Link></li>
          </ul>
        </div>
        <div className="w-full md:flex-1 min-w-[150px]">
          <h4 className="font-outfit text-[12px] font-black uppercase tracking-[0.2em] text-accent mb-6">CONNECT</h4>
          <ul className="space-y-4 font-inter text-[14px] text-surface/60">
            <li>
              <a
                href="https://www.instagram.com/creativzedge_official/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/b-venkata-krishnan-87954a379"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://www.google.com/search?kgmid=/g/11ylpc_5bh&hl=en-IN&q=Creativzedge#lrd=0x3a5267556e16bb0b:0x71872bfe942c800,1"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                Google Reviews
              </a>
            </li>
            <li><Link to="/contact" className="hover:text-accent transition-colors">Initiate Project</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-margin mt-20 pt-10 border-t border-surface/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="font-outfit text-[10px] text-surface/50 uppercase tracking-widest opacity-50">
          © {new Date().getFullYear()} CREATIVZEDGE STUDIO. ELEVATING DIGITAL REALITY.
        </p>
        <div className="flex gap-10">
          <Link to="/privacy" className="text-[10px] uppercase tracking-widest text-surface/50 hover:text-accent transition-all">Privacy Policy</Link>
          <Link to="/terms" className="text-[10px] uppercase tracking-widest text-surface/50 hover:text-accent transition-all">Terms &amp; Conditions</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
