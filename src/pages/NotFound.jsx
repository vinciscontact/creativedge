import { Link } from 'react-router-dom';
import Seo from '../components/Seo';

const NotFound = () => {
  return (
    <div className="relative pt-[220px] pb-32 min-h-screen bg-background overflow-clip">
      <Seo title="Page Not Found | CreativzEdge" path="/404" noindex />
      <div className="ambient-glow top-[-10%] right-[-10%] bg-primary/20"></div>

      <section className="max-w-3xl mx-auto px-margin text-center relative z-10">
        <span className="font-syne text-[7rem] md:text-[10rem] leading-none text-primary/10 font-extrabold select-none block mb-4">
          404
        </span>
        <h1 className="syne-title text-3xl md:text-5xl text-primary mb-6 leading-tight">
          This page went <span className="text-gradient">off the canvas.</span>
        </h1>
        <p className="font-inter text-body-lg text-on-surface-variant max-w-xl mx-auto leading-relaxed mb-12">
          The page you're looking for doesn't exist or has moved. Let's get you back to the good stuff.
        </p>
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <Link to="/" className="intense-glow-btn w-full sm:w-auto text-center">
            Back to Home
          </Link>
          <Link
            to="/portfolio"
            className="w-full sm:w-auto text-center border border-primary/20 text-primary font-outfit font-black text-[12px] uppercase tracking-[0.2em] px-9 py-4 rounded-full transition-all hover:border-accent hover:text-accent"
          >
            View Our Work
          </Link>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
