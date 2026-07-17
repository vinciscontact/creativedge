import { useState } from 'react';
import { motion } from 'framer-motion';
import Seo from '../components/Seo';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    brief: ''
  });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Studio WhatsApp number (international format, no '+' or spaces for wa.me).
  const WHATSAPP_NUMBER = '917299942627';

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, service, brief } = formData;
    const message =
      `New Project Inquiry\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Service: ${service}\n\n` +
      `Brief: ${brief}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');

    setStatus('success');
    setFormData({ name: '', email: '', service: '', brief: '' });
  };

  return (
    <div className="min-h-screen dot-grid bg-background selection:bg-primary selection:text-surface">
      <Seo
        title="Contact CreativzEdge — Chennai & Mumbai Design Studios"
        description="Start your project with CreativzEdge. Visit our Chennai (Saligramam) or Mumbai (Andheri East) studios, call +91 72999 42627, or send your brief via WhatsApp — we reply within hours."
        path="/contact"
        breadcrumb="Contact"
      />
      <section className="max-w-7xl mx-auto px-margin pt-[220px] pb-stack-lg">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-stack-lg"
        >
          <h1 className="font-space text-hero-900 text-on-surface uppercase tracking-tighter font-black">
            Contact<br /><span className="text-primary">Studio</span>
          </h1>
          <div className="h-1 w-24 bg-secondary mt-stack-sm shadow-[0_0_15px_#00e475]"></div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-gutter">
          {/* Form Side */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:w-[60%] bg-surface-container-low p-stack-md relative border-t-2 border-primary"
          >
            <div className="corner-bracket-tl text-primary"></div>
            <div className="corner-bracket-br text-primary"></div>
            <h2 className="font-space text-headline-md mb-stack-md text-primary font-bold uppercase">LET'S WORK TOGETHER</h2>
            
            <form className="space-y-stack-md" onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row gap-stack-md w-full">
                <div className="relative group w-full">
                  <input 
                    className="peer w-full bg-transparent border-0 border-b-2 border-outline-variant pt-6 pb-2 px-0 focus:ring-0 focus:border-accent transition-all outline-none text-body-lg text-primary placeholder-transparent" 
                    id="name" 
                    placeholder="NAME" 
                    type="text" 
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <label className="absolute left-0 top-0 font-space text-label-caps text-on-surface-variant pointer-events-none transition-all uppercase peer-placeholder-shown:top-6 peer-placeholder-shown:text-body-lg peer-focus:top-0 peer-focus:text-label-caps peer-focus:text-secondary" htmlFor="name">Name</label>
                </div>
                <div className="relative group w-full">
                  <input 
                    className="peer w-full bg-transparent border-0 border-b-2 border-outline-variant pt-6 pb-2 px-0 focus:ring-0 focus:border-accent transition-all outline-none text-body-lg text-primary placeholder-transparent" 
                    id="email" 
                    placeholder="EMAIL" 
                    type="email" 
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <label className="absolute left-0 top-0 font-space text-label-caps text-on-surface-variant pointer-events-none transition-all uppercase peer-placeholder-shown:top-6 peer-placeholder-shown:text-body-lg peer-focus:top-0 peer-focus:text-label-caps peer-focus:text-secondary" htmlFor="email">Email</label>
                </div>
              </div>

              <div className="relative group">
                <select 
                  className="peer w-full bg-transparent border-0 border-b-2 border-outline-variant pt-6 pb-2 px-0 focus:ring-0 focus:border-accent transition-all outline-none text-body-lg text-primary appearance-none cursor-pointer" 
                  id="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                >
                  <option className="bg-surface-container-highest" value=""></option>
                  <option className="bg-surface-container-highest" value="Logo & Brand Identity">Logo &amp; Brand Identity</option>
                  <option className="bg-surface-container-highest" value="Social Media Creatives">Social Media Creatives</option>
                  <option className="bg-surface-container-highest" value="Packaging Design">Packaging Design</option>
                  <option className="bg-surface-container-highest" value="Print & Advertising">Print &amp; Advertising (Brochures, Posters, Menus)</option>
                  <option className="bg-surface-container-highest" value="Digital Growth (SEO / GEO / AEO / SMO)">Digital Growth (SEO / GEO / AEO / SMO)</option>
                  <option className="bg-surface-container-highest" value="Something Else">Something Else / Custom Brief</option>
                </select>
                <label className="absolute left-0 top-0 font-space text-label-caps text-on-surface-variant pointer-events-none transition-all uppercase peer-placeholder-shown:top-6 peer-placeholder-shown:text-body-lg peer-focus:top-0 peer-focus:text-label-caps peer-focus:text-secondary" htmlFor="service">Service</label>
                <span className="material-symbols-outlined absolute right-0 top-6 pointer-events-none text-on-surface-variant">expand_more</span>
              </div>

              <div className="relative group">
                <textarea
                  className="peer w-full bg-transparent border-0 border-b-2 border-outline-variant pt-6 pb-2 px-0 focus:ring-0 focus:border-accent transition-all outline-none text-body-lg text-primary placeholder-transparent resize-none" 
                  id="brief" 
                  placeholder="PROJECT BRIEF" 
                  rows="4"
                  value={formData.brief}
                  onChange={handleChange}
                  required
                ></textarea>
                <label className="absolute left-0 top-0 font-space text-label-caps text-on-surface-variant pointer-events-none transition-all uppercase peer-placeholder-shown:top-6 peer-placeholder-shown:text-body-lg peer-focus:top-0 peer-focus:text-label-caps peer-focus:text-secondary" htmlFor="brief">Project Brief</label>
              </div>

              <div className="pt-stack-sm">
                <button
                  className="intense-glow-btn w-full"
                  type="submit"
                >
                  {status === 'success' ? 'SENT — CHECK WHATSAPP' : 'SEND VIA WHATSAPP'}
                </button>
                <p className="font-space text-[11px] text-on-surface-variant/70 mt-3 text-center uppercase tracking-widest">
                  Opens WhatsApp with your brief pre-filled — we usually reply within a few hours.
                </p>

                {status === 'success' && <p className="text-secondary font-space text-label-caps mt-4">Opening WhatsApp — just hit send to reach us directly.</p>}
                {status === 'error' && <p className="text-error font-space text-label-caps mt-4">Something went wrong. Please try again.</p>}
              </div>
            </form>
          </motion.div>

          {/* Info Side */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:w-[40%] flex flex-col gap-gutter"
          >
            <div className="bg-surface-container p-stack-md border-t-2 border-secondary relative overflow-hidden h-full">
              <div className="flex items-center gap-2 mb-stack-md">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
                </span>
                <span className="font-space text-label-caps text-secondary font-bold">Currently accepting new projects</span>
              </div>
              
              <div className="space-y-stack-md">
                <div>
                  <h3 className="font-space text-label-caps text-on-surface-variant mb-2">Get In Touch</h3>
                  {/* Fluid sizes keep each address whole on one line down to 360px — addresses never split */}
                  <a href="mailto:creativzedge@gmail.com" className="block font-space text-[clamp(1rem,4vw,1.75rem)] whitespace-nowrap text-on-surface lowercase font-black hover:text-primary transition-colors">creativzedge@gmail.com</a>
                  <a href="mailto:designcreativzedge@gmail.com" className="block font-space text-[clamp(0.85rem,3.8vw,1.125rem)] whitespace-nowrap text-on-surface-variant lowercase hover:text-primary transition-colors">designcreativzedge@gmail.com</a>
                </div>

                <div className="pt-stack-md">
                  <h3 className="font-space text-label-caps text-on-surface-variant mb-2">Call Us</h3>
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary">call</span>
                    <p className="font-manrope text-body-lg text-on-surface">
                      <a href="tel:+917299942627" className="hover:text-primary transition-colors">+91 72999 42627</a><br />
                      <a href="tel:+919500340369" className="hover:text-primary transition-colors">+91 95003 40369</a>
                    </p>
                  </div>
                </div>

                <div className="pt-stack-md">
                  <h3 className="font-space text-label-caps text-on-surface-variant mb-2">Our Studios</h3>
                  <div className="space-y-stack-sm">
                    <div className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-primary">location_on</span>
                      <p className="font-manrope text-body-lg text-on-surface">
                        <span className="font-bold">Chennai</span><br />
                        25/4, Thiruvalluvar Street, Gandhi Nagar, Saligramam, Chennai - 600 093.
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-primary">location_on</span>
                      <p className="font-manrope text-body-lg text-on-surface">
                        <span className="font-bold">Mumbai</span><br />
                        Kalpataru Estate, 3B-22, JVLR, Poonam Nagar, Andheri East, Mumbai, Maharashtra 400093.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-stack-md aspect-video relative group overflow-hidden border border-outline/20">
                  <iframe
                    title="Creativzedge Chennai Studio"
                    src="https://maps.google.com/maps?q=25%2F4%20Thiruvalluvar%20Street%20Gandhi%20Nagar%20Saligramam%20Chennai%20600093&z=15&output=embed"
                    className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  ></iframe>
                  <div className="absolute inset-0 bg-primary/20 pointer-events-none mix-blend-overlay"></div>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
