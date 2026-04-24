import { useEffect, useState } from 'react'
import logo from '../../assets/logo.png'; // Ensure this path is correct

/* ─── Scroll Reveal Hook ─────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal-tw");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.remove("opacity-0", "translate-y-7");
          e.target.classList.add("opacity-100", "translate-y-0");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function ContactPage() {
  useReveal();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    telephone: '',
    service: '',
    comments: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    alert('Thank you for your message. Our team will be in touch shortly.');
  };

  return (
    <div className="relative z-10 bg-[#04101f] text-[#f2f7ff] font-['DM_Sans'] font-light leading-relaxed overflow-x-hidden selection:bg-[#2B5BA8] selection:text-white min-h-screen flex flex-col">
      
      {/* ── BACKGROUND ── */}
      <div className="fixed inset-0 pointer-events-none opacity-50 bg-[size:60px_60px] bg-[linear-gradient(rgba(43,91,168,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(43,91,168,0.1)_1px,transparent_1px)] z-0" />
      <div className="fixed right-[-10%] top-[-10%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(43,91,168,0.15)_0%,transparent_70%)] pointer-events-none z-0" />
      <div className="fixed left-[-10%] bottom-[-10%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(90,140,46,0.1)_0%,transparent_70%)] pointer-events-none z-0" />

      {/* ── NAV ── */}
      <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 lg:px-12 h-[70px] bg-[#04101f]/90 backdrop-blur-xl border-b border-[#2b5ba8]/20 transition-colors">
        <a href="/" className="flex items-center gap-3">
          <img src={logo} alt="logo" className="h-[40px]" />
        </a>

        {/* Mobile Menu Button */}
        <button 
          className="flex lg:hidden flex-col gap-[5px] p-2 z-[101]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className={`w-6 h-[2px] bg-white transition-all duration-300 ${isMenuOpen ? 'translate-y-[7px] rotate-45' : ''}`}></span>
          <span className={`w-6 h-[2px] bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`w-6 h-[2px] bg-white transition-all duration-300 ${isMenuOpen ? '-translate-y-[7px] -rotate-45' : ''}`}></span>
        </button>

        {/* Links */}
        <ul className={`
          absolute lg:static top-[70px] inset-x-0 bg-[#04101f]/95 lg:bg-transparent backdrop-blur-xl lg:backdrop-blur-none
          border-b lg:border-none border-[#2b5ba8]/20
          flex-col lg:flex-row p-6 lg:p-0 gap-6 lg:gap-9 items-start lg:items-center
          transition-all duration-300 ease-in-out lg:transform-none lg:opacity-100 lg:pointer-events-auto lg:flex
          ${isMenuOpen ? 'translate-y-0 opacity-100 pointer-events-auto flex' : '-translate-y-full opacity-0 pointer-events-none hidden'}
        `}>
          {['Solar', 'EV Charging', 'Process', 'Support'].map((item) => (
            <li key={item} className="w-full lg:w-auto border-b lg:border-none border-[#2b5ba8]/10 pb-4 lg:pb-0">
              <a 
                href={`/${item.toLowerCase().replace(' ', '-')}`} 
                onClick={() => setIsMenuOpen(false)}
                className="text-[#6a80a8] hover:text-white text-sm tracking-wide transition-colors"
              >
                {item}
              </a>
            </li>
          ))}
          <li className="pt-2 lg:pt-0">
            <a 
              href="#contact" 
              onClick={() => setIsMenuOpen(false)}
              className="bg-[#2B5BA8] hover:bg-[#4a7fd4] text-white text-sm font-medium px-6 py-2.5 rounded-full transition-all hover:-translate-y-0.5 inline-block"
            >
              Get a Quote
            </a>
          </li>
        </ul>
      </nav>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-grow pt-[120px] lg:pt-[160px] pb-20 px-6 lg:px-12 relative z-10 flex items-center">
        <div className="max-w-[1140px] mx-auto w-full">
          
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-20 items-start">
            
            {/* Left Side: Minimal Intro */}
            <div className="reveal-tw opacity-0 translate-y-7 transition-all duration-700 lg:sticky lg:top-[160px]">
              <div className="inline-flex items-center gap-2 mb-6 font-['Space_Mono'] font-mono text-[10px] tracking-widest text-[#6a80a8] uppercase">
                <a href="/" className="hover:text-white transition-colors">Home</a>
                <span className="text-[#2b5ba8]/50">→</span>
                <span className="text-[#4a7fd4]">Contact Us</span>
              </div>

              <h1 className="font-['Bebas_Neue'] text-[clamp(48px,6.5vw,88px)] leading-[0.92] tracking-wide mb-6">
                <span className="text-white block">GET IN</span>
                <span className="text-[#4a7fd4] block">TOUCH</span>
              </h1>
              
              <p className="text-[16px] text-[#c8d8f0] font-light leading-relaxed max-w-md">
                Whether you're looking for a new solar installation, an EV charger for your home, or need support with your existing system, our expert team is ready to help.
              </p>
            </div>

            {/* Right Side: Contact Form */}
            <div className="bg-[#0b1830]/75 border border-[#2b5ba8]/22 rounded-[24px] p-8 lg:p-12 backdrop-blur-xl reveal-tw opacity-0 translate-y-7 transition-all duration-700 delay-150 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(43,91,168,0.1)_0%,transparent_70%)] pointer-events-none" />
              
              <div className="font-['Bebas_Neue'] text-3xl tracking-wide mb-2">SEND US A MESSAGE</div>
              <p className="text-[13px] text-[#6a80a8] mb-8">Fill out the form below and we'll get back to you within 24 hours.</p>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative z-10">
                
                {/* Row 1: Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="firstName" className="font-['Space_Mono'] font-mono text-[10px] tracking-widest text-[#6a80a8] uppercase ml-1">First Name <span className="text-[#4a7fd4]">*</span></label>
                    <input 
                      type="text" 
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      className="w-full bg-[#04101f]/50 border border-[#2b5ba8]/30 rounded-xl px-4 py-3.5 text-[14px] text-white placeholder:text-[#6a80a8]/50 focus:outline-none focus:border-[#4a7fd4] focus:ring-1 focus:ring-[#4a7fd4]/50 transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="lastName" className="font-['Space_Mono'] font-mono text-[10px] tracking-widest text-[#6a80a8] uppercase ml-1">Last Name <span className="text-[#4a7fd4]">*</span></label>
                    <input 
                      type="text" 
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      className="w-full bg-[#04101f]/50 border border-[#2b5ba8]/30 rounded-xl px-4 py-3.5 text-[14px] text-white placeholder:text-[#6a80a8]/50 focus:outline-none focus:border-[#4a7fd4] focus:ring-1 focus:ring-[#4a7fd4]/50 transition-all"
                    />
                  </div>
                </div>

                {/* Row 2: Contact */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="font-['Space_Mono'] font-mono text-[10px] tracking-widest text-[#6a80a8] uppercase ml-1">Email Address <span className="text-[#4a7fd4]">*</span></label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full bg-[#04101f]/50 border border-[#2b5ba8]/30 rounded-xl px-4 py-3.5 text-[14px] text-white placeholder:text-[#6a80a8]/50 focus:outline-none focus:border-[#4a7fd4] focus:ring-1 focus:ring-[#4a7fd4]/50 transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="telephone" className="font-['Space_Mono'] font-mono text-[10px] tracking-widest text-[#6a80a8] uppercase ml-1">Telephone</label>
                    <input 
                      type="tel" 
                      id="telephone"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleChange}
                      placeholder="07000 000 000"
                      className="w-full bg-[#04101f]/50 border border-[#2b5ba8]/30 rounded-xl px-4 py-3.5 text-[14px] text-white placeholder:text-[#6a80a8]/50 focus:outline-none focus:border-[#4a7fd4] focus:ring-1 focus:ring-[#4a7fd4]/50 transition-all"
                    />
                  </div>
                </div>

                {/* Row 3: Services Dropdown */}
                <div className="flex flex-col gap-2 relative">
                  <label htmlFor="service" className="font-['Space_Mono'] font-mono text-[10px] tracking-widest text-[#6a80a8] uppercase ml-1">Service Required <span className="text-[#4a7fd4]">*</span></label>
                  <div className="relative">
                    <select 
                      id="service"
                      name="service"
                      required
                      value={formData.service}
                      onChange={handleChange}
                      className="appearance-none w-full bg-[#04101f]/50 border border-[#2b5ba8]/30 rounded-xl px-4 py-3.5 text-[14px] text-white focus:outline-none focus:border-[#4a7fd4] focus:ring-1 focus:ring-[#4a7fd4]/50 transition-all cursor-pointer"
                      style={{ color: formData.service ? 'white' : 'rgba(106, 128, 168, 0.5)' }}
                    >
                      <option value="" disabled hidden>Select a service...</option>
                      <option value="solar" className="bg-[#0b1830] text-white">Solar panel installation</option>
                      <option value="ev" className="bg-[#0b1830] text-white">EV charger installation</option>
                      <option value="consultation" className="bg-[#0b1830] text-white">Energy consultation</option>
                      <option value="maintenance" className="bg-[#0b1830] text-white">System care and maintenance</option>
                    </select>
                    {/* Custom Dropdown Arrow */}
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-[#4a7fd4]">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Row 4: Comments */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="comments" className="font-['Space_Mono'] font-mono text-[10px] tracking-widest text-[#6a80a8] uppercase ml-1">Comments / Questions <span className="text-[#4a7fd4]">*</span></label>
                  <textarea 
                    id="comments"
                    name="comments"
                    required
                    value={formData.comments}
                    onChange={handleChange}
                    placeholder="Tell us a bit about your property and what you are looking to achieve..."
                    rows="4"
                    className="w-full bg-[#04101f]/50 border border-[#2b5ba8]/30 rounded-xl px-4 py-3.5 text-[14px] text-white placeholder:text-[#6a80a8]/50 focus:outline-none focus:border-[#4a7fd4] focus:ring-1 focus:ring-[#4a7fd4]/50 transition-all resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  className="mt-4 w-full inline-flex justify-center items-center gap-2 bg-gradient-to-br from-[#2B5BA8] to-[#4a7fd4] text-white font-medium text-[14px] uppercase tracking-wide py-4 px-8 rounded-xl shadow-[0_8px_28px_rgba(43,91,168,0.4)] hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(43,91,168,0.55)] transition-all"
                >
                  Send Enquiry →
                </button>
              </form>
            </div>
          </div>

        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 border-t border-[#2b5ba8]/22 pt-16 lg:pt-20 px-6 lg:px-12 pb-10 max-w-[1140px] mx-auto w-full mt-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-10 mb-16">
          <div>
            <div className="font-['Bebas_Neue'] text-2xl tracking-[2px] mb-4">
              <img src={logo} alt="logo" className="h-[40px]" />
            </div>
            <p className="text-[13px] text-[#6a80a8] leading-relaxed max-w-[280px]">Watten Power Ltd is a UK-based clean energy solutions provider specialising in EV charging and solar installations for residential and commercial properties.</p>
          </div>
          
          {[
            { title: "Services", links: [{n:"Solar Installation",h:"/solar"},{n:"EV Charging",h:"/ev"},{n:"Maintenance",h:"#"},{n:"Consultation",h:"#"}] },
            { title: "Company", links: [{n:"About Us",h:"#"},{n:"Compliance",h:"#"},{n:"Case Studies",h:"#"},{n:"Careers",h:"#"}] },
            { title: "Contact", links: [{n:"hello@wattenpower.co.uk",h:"mailto:hello@wattenpower.co.uk"},{n:"0800 123 4567",h:"tel:08001234567"},{n:"Privacy Policy",h:"#"},{n:"Terms of Service",h:"#"}] }
          ].map((col, idx) => (
            <div key={idx}>
              <h4 className="font-['Space_Mono'] font-mono text-xs font-medium tracking-widest uppercase text-[#c8d8f0] mb-5">{col.title}</h4>
              <ul className="flex flex-col gap-3">
                {col.links.map((l, i) => (
                  <li key={i}><a href={l.h} className="text-[13px] text-[#6a80a8] hover:text-white transition-colors">{l.n}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-[#2b5ba8]/22 text-xs text-[#6a80a8] font-['Space_Mono'] font-mono gap-4 text-center sm:text-left">
          <span>© 2025 Watten Power Ltd. All rights reserved.</span>
          <span>Registered in England & Wales</span>
        </div>
      </footer>
    </div>
  )
}