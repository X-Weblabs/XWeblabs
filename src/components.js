import React, {useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';
import { Mail, Phone } from 'lucide-react';
import throttle from 'lodash.throttle'; // at the top

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

useEffect(() => {
  const handleScroll = throttle(() => {
    setIsScrolled(window.scrollY > 50);
  }, 200); // throttled to 1 call every 200ms

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

  // Function to close mobile menu
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Handle mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.header 
      className={`fixed top-4 left-4 right-4 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/90 backdrop-blur-lg shadow-2xl border border-gray-800' 
          : 'bg-black/10 backdrop-blur-sm border border-gray-700'
      } rounded-2xl max-w-full`}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-6 py-4 max-w-full">
        <div className="flex items-center justify-between">
          {/* Logo */}
           <motion.img
              src="/images/logo.png"
              animate={{ x: 10}}
              transition={{ duration: 2 }}
              style={{}}
              width={100}
            />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="#hero">Home</NavLink>
            <NavLink href="#services">Services</NavLink>
            <NavLink href="#about">About</NavLink>
            {/* <NavLink href="#projects">Projects</NavLink> */}
            <NavLink href="#footer">Contact</NavLink>
            {/* <motion.button
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 font-semibold tracking-wide"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button> */}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <svg 
              className="w-6 h-6 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              style={{ transform: isMobileMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden mt-4 pb-4 border-t border-gray-700"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <nav className="flex flex-col space-y-4 pt-4">
                <NavLink href="#hero" mobile onClose={closeMobileMenu}>Home</NavLink>
                <NavLink href="#services" mobile onClose={closeMobileMenu}>Services</NavLink>
                <NavLink href="#about" mobile onClose={closeMobileMenu}>About</NavLink>
                <NavLink href="#projects" mobile onClose={closeMobileMenu}>Projects</NavLink>
                <NavLink href="#contact" mobile onClose={closeMobileMenu}>Contact</NavLink>
                <button 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-left font-semibold hover:shadow-lg transition-all duration-300"
                  onClick={closeMobileMenu}
                >
                  Get Started
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

const NavLink = ({ href, children, mobile = false, onClose }) => {
  const handleClick = (e) => {
    e.preventDefault();
    
    // For mobile, we need to handle this differently
    if (mobile) {
      // First scroll to the target
      const targetElement = document.querySelector(href);
      if (targetElement) {
        const headerHeight = 100;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Close menu after scroll starts
        setTimeout(() => {
          onClose();
        }, 300);
      }
    } else {
      // Desktop navigation
      const targetElement = document.querySelector(href);
      if (targetElement) {
        const headerHeight = 100;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <motion.a
      href={href}
      className={`text-white hover:text-emerald-400 transition-colors duration-200 font-medium cursor-pointer ${
        mobile ? 'block py-2' : ''
      }`}
      whileHover={{ y: -2 }}
      onClick={handleClick}
    >
      {children}
    </motion.a>
  );
};

// Hero Component - Updated for a cleaner, professional look
export const Hero = () => {
  const mountRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-32 px-6 overflow-hidden">
      {/* Dark Abstract Background (Ensure this image is dark and subtle) */}
      <div
        className="absolute inset-0 scale-110"
        style={{
          backgroundImage: 'url("/images/abstract 2.jpg")', // Ensure this image is dark and abstract
          backgroundSize: 'cover', // Use cover for better responsiveness
          backgroundPosition: 'center',
          filter: 'brightness(0.7) contrast(1.1)' // Slightly darken and add contrast if image is too bright
        }}
      />

      {/* Modern Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/60 to-black/20" /> 

      {/* Animated Grid Pattern */}
      <div
        className="absolute inset-0 opacity-10" // Reduced opacity for subtlety
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `, // Subtler grid lines
          backgroundSize: '60px 60px', // Slightly larger grid for less density
          animation: 'grid-move 25s linear infinite' // Slower animation
        }}
      />

      {/* Three.js 3D Scene */}
      <div
        ref={mountRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 1.5s ease-in-out'
        }}
      />

      {/* Enhanced Floating Elements (Smaller, Subtler, Aligned Colors) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"
          animate={{
            y: [0, -25, 0], // Reduced movement
            x: [0, 20, 0],
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.8, 0.4] // Reduced opacity
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full"
          animate={{
            y: [0, -18, 0],
            x: [0, -15, 0],
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-2.5 h-2.5 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full" // Maintained a subtle warm tone
          animate={{
            y: [0, 30, 0],
            x: [0, -10, 0],
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      <div className="container mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          {/* Small accent text - more subtle */}
          <motion.p
            className="text-emerald-400 mb-4 opacity-60 text-sm sm:text-base font-medium tracking-wide uppercase" // Reduced opacity, uppercase for professional feel
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            NEXT-GENERATION AI SOLUTIONS
          </motion.p>

          {/* Responsive hero title with enhanced gradient and refined text */}
          <motion.h1
            className="hero-text text-white mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Build the Future with
            <br />
            <span className="gradient-text">
              AI Automation
            </span>
          </motion.h1>

          {/* Responsive subtitle - more concise */}
          <motion.p
            className="hero-subtitle text-gray-300 mb-8 max-w-3xl mx-auto opacity-80 text-base sm:text-lg md:text-xl leading-relaxed px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Crafting intelligent AI solutions and cutting-edge digital experiences for a smarter, more efficient future.
          </motion.p>

          {/* Enhanced stats row - kept as is, it's already clean and well-structured */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 mb-8 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="text-center backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-display">100%</div>
              <div className="text-xs sm:text-sm text-gray-400">Client Satisfaction</div>
            </div>
            <div className="text-center backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-display">24/7</div>
              <div className="text-xs sm:text-sm text-gray-400">AI Support</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); } /* Matches new background-size */
        }
      `}</style>
    </section>
  );
};

// Client Logos Component
export const ClientLogos = () => {
  const logos = [
    "Python", "React", "Javascript", "NodeJs", "Langchain", "Langflow", "Langsmith", "n8n", "Make", "SQL", "Tensorflow"
  ];

  // Duplicate the logos to create a seamless loop
  const duplicatedLogos = [...logos, ...logos, ...logos, ...logos]; // Duplicate 4 times for a smooth, continuous effect

  return (
    <section className="py-16 px-6 bg-black border-b border-gray-800 overflow-hidden"> {/* Added overflow-hidden */}
      <div className="container mx-auto">
        <motion.p
          className="text-accent text-center text-gray-500 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          OUR TECHNOLOGIES & TOOLS
        </motion.p>

        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex flex-nowrap items-center gap-8 md:gap-12 opacity-60"
            animate={{
              x: ['0%', '-25%'] // Adjust -25% based on how many times you duplicated (100% / number of duplicates)
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 10, // Increase duration for slower scroll
                ease: "linear",
              },
            }}
            whileInView={{ x: ['0%', '-25%'] }}
            viewport={{ once: false, amount: 0.5 }}
          >
            {duplicatedLogos.map((logo, index) => (
              <motion.div
                key={index}
                className="text-white text-lg font-medium font-display flex-shrink-0" // Added flex-shrink-0
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 0.6, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }} // Adjust amount for visibility trigger
                transition={{ duration: 0.5, delay: (index % logos.length) * 0.05 }} // Use modulo for delay to keep it consistent for original set
                whileHover={{ scale: 1.1, opacity: 1 }}
              >
                {logo}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Services Component
export const Services = () => {
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      icon: "🤖",
      title: "AI Agents",
      description: "Your digital workforce that never sleeps. Deploy intelligent agents that handle complex customer interactions, automate decision-making, and scale your operations beyond human limitations.",
      features: [
        "Conversational AI that understands context & intent",
        "Self-learning systems that get smarter over time",
        "Lightning-fast responses across all channels",
        "Deep analytics that reveal customer psychology",
        "WhatsApp, Web & omnichannel deployment"
      ],
      gradient: "from-emerald-500 to-teal-600",
      image: "/images/AI.png",
      stats: { clients: "150+", efficiency: "85%", support: "24/7" },
      count: "01",
    },
    {
      icon: "🌐",
      title: "AI-Powered Websites",
      description: "Websites that think, adapt, and convert. Your digital storefront becomes a living entity that learns from every visitor, personalizes experiences, and turns browsers into buyers.",
      features: [
        "Self-optimizing layouts that boost conversions",
        "AI-driven personalization for every visitor",
        "Blazing-fast performance that Google loves",
        "Built-in SEO intelligence that ranks higher"
      ],
      gradient: "from-purple-500 to-pink-600",
      image: "/images/AI2.png",
      stats: { projects: "200+", conversion: "+40%", speed: "99%" },
      count: "02",
    },
    {
      icon: "☁️",
      title: "SaaS Solutions",
      description: "Transform your business model overnight. Custom SaaS platforms that turn your expertise into recurring revenue streams while automating everything from billing to user onboarding.",
      features: [
        "Multi-tenant architecture that scales infinitely",
        "Frictionless user management & onboarding",
        "Smart subscription billing that maximizes LTV",
        "Real-time dashboards that reveal growth opportunities"
      ],
      gradient: "from-indigo-500 to-purple-600",
      image: "/images/saas.png",
      stats: { users: "10K+", uptime: "99.9%", scale: "∞" },
      count: "03",
    },
    {
      icon: "🔍",
      title: "SEO Dominance",
      description: "Own page one. Forever. AI-powered SEO strategies that don't just rank your content—they make your brand the definitive answer in your industry.",
      features: [
        "AI keyword intelligence that predicts trends",
        "Content optimization that search engines crave",
        "Technical SEO that leaves competitors behind",
        "Performance tracking that proves ROI"
      ],
      gradient: "from-teal-500 to-emerald-600",
      image: "/images/SEO2.png",
      stats: { ranking: "+300%", traffic: "+150%", keywords: "500+" },
      count: "04",
    },
    {
      icon: "🤖",
      title: "Generative Engine Optimization",
      description: "The future of search is here, and it's conversational. Position your brand as the go-to source when AI assistants like ChatGPT, Claude, and Perplexity answer your customers' questions.",
      features: [
        "AI-first content strategies that get cited",
        "Structured data optimization for AI engines",
        "LLM-friendly content that gets recommended",
        "Future-proof visibility across all AI platforms",
      ],
      gradient: "from-pink-500 to-rose-600",
      image: "/images/geo.png",
      stats: { visibility: "+250%", queries: "1M+", engines: "10+" },
      count: "05",
    },
    {
      icon: "⚡",
      title: "Automation Systems",
      description: "Eliminate the mundane. Amplify the extraordinary. Custom automation that handles your repetitive tasks while you focus on what truly matters—growing your empire.",
      features: [
        "Workflow automation that runs while you sleep",
        "Data processing that turns chaos into insights",
        "API integrations that connect your entire stack",
        "Business intelligence that predicts the future"
      ],
      gradient: "from-pink-500 to-purple-600",
      image: "/images/auto2.png",
      stats: { automation: "95%", savings: "$50K+", time: "80%" },
      count: "06",
    },
  ];

useEffect(() => {
  const handleScroll = throttle(() => {
    const servicesSection = document.getElementById("services");
    if (!servicesSection) return;

    const sectionTop = servicesSection.offsetTop;
    const sectionHeight = servicesSection.offsetHeight;
    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;

    if (scrollTop >= sectionTop - windowHeight / 2 && scrollTop <= sectionTop + sectionHeight - windowHeight / 2) {
      const relativeScroll = scrollTop - sectionTop + windowHeight / 2;
      const serviceHeight = sectionHeight / services.length;
      const newActiveService = Math.floor(relativeScroll / serviceHeight);

      if (newActiveService >= 0 && newActiveService < services.length) {
        setActiveService(newActiveService);
      }
    }
  }, 200); // throttle scroll updates to once every 200ms

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, [services.length]);


  return (
    <section id="services" className="bg-gradient-to-br from-gray-50 to-gray-100 text-black">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-10 pt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.p
            className="text-accent text-gray-600 mb-4 font-bold text-sm tracking-wider"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeInOut" }}
          >
            REVOLUTIONARY SOLUTIONS
          </motion.p>
          <motion.h2
            className="text-4xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
          >
            Services That{" "}
            <span className="gradient-text">
              Transform Businesses
            </span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
          >
            Stop competing on price. Start winning on innovation. Our AI-powered solutions don't just automate—they revolutionize how you operate, engage, and grow.
          </motion.p>
        </motion.div>
      </div>
      <div className="relative">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            <div className="space-y-8 lg:space-y-32">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className="space-y-6 lg:space-y-8 py-2 lg:py-16 lg:min-h-screen lg:flex lg:flex-col lg:justify-center"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  viewport={{ once: false, margin: "-30%" }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  <motion.div
                    className="flex items-center mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6, delay: 0.1, ease: "easeInOut" }}
                  >
                    <div className="flex items-center">
                      <span className="text-pink-500 text-lg font-bold mr-4">●</span>
                      <motion.p
                        className="text-accent text-gray-600 font-bold text-sm tracking-wider"
                        style={{ fontSize: 20 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.6, delay: 0.1, ease: "easeInOut" }}
                      >
                        {service.count}
                      </motion.p>
                    </div>
                  </motion.div>
                  <div className="lg:hidden mb-6">
                    <motion.div
                      className="relative rounded-2xl overflow-hidden shadow-xl lg:pt-10"
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                      <img
                        src={service.image || "/placeholder.svg"}
                        alt={service.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center">
                          <div
                            className={`w-10 h-10 bg-gradient-to-r ${service.gradient} rounded-lg flex items-center justify-center mr-3`}
                          >
                            <span className="text-lg">{service.icon}</span>
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-white">
                              {service.title === "Generative Engine Optimization" ? "" : service.title}
                            </h4>
                            <div className="h-0.5 w-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mt-1"></div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
                  >
                    <h3 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 leading-tight">
                      {service.title.split(" ").map((word, idx) => (
                        <span key={idx} className={idx === service.title.split(" ").length - 1 ? "block" : ""}>
                          {word}
                          {idx !== service.title.split(" ").length - 1 ? " " : ""}
                        </span>
                      ))}
                    </h3>
                    <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mb-6 lg:mb-8"></div>
                  </motion.div>
                  <motion.p
                    className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-6 lg:mb-8 max-w-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6, delay: 0.3, ease: "easeInOut" }}
                  >
                    {service.description}
                  </motion.p>
                  <motion.div
                    className="space-y-3 lg:space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
                  >
                    {service.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-center text-gray-700"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.5, delay: 0.4 + idx * 0.1, ease: "easeInOut" }}
                      >
                        <div className="w-2 h-2 bg-cyan-600 rounded-full mr-4 flex-shrink-0"></div>
                        <span className="text-base lg:text-lg">{feature}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              ))}
            </div>
            <div className="hidden lg:block sticky top-24 h-[calc(100vh-6rem)] flex items-center justify-center">
              <div className="relative w-full max-w-2xl serviceImage">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`image-${activeService}`}
                    className="relative"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                  >
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                      <img
                        src={services[activeService].image || "/placeholder.svg"}
                        alt={services[activeService].title}
                        className="w-full h-[60vh] object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute bottom-8 left-8 right-8">
                        <div className="flex items-center mb-4">
                          <div
                            className={`w-16 h-16 bg-gradient-to-r ${services[activeService].gradient} rounded-xl flex items-center justify-center mr-6`}
                          >
                            <span className="text-3xl">{services[activeService].icon}</span>
                          </div>
                          <div>
                            <h4 className="text-2xl font-bold text-white">{services[activeService].title}</h4>
                            <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mt-2"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-full blur-2xl"></div>
                    <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl"></div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
        <div className="pb-20"></div>
      </div>
    </section>
  );
};

// AboutUs Component
export const AboutUs = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const ringsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(false);

  const teamMembers = [
    {
      name: "Mandlenkosi Ndiweni",
      role: "Chief Technology Officer",
      bio: "The visionary architect behind our AI revolution. Transforms impossible ideas into market-dominating realities."
    },
    {
      name: "Mqhelisi Mzizi",
      role: "Chief Marketing Officer",
      bio: "The growth catalyst who turns cutting-edge technology into compelling stories that drive exponential business growth."
    },
    {
      name: "Stanlake Phiri",
      role: "Research & Innovation Lead",
      bio: "Our AI pioneer pushing the boundaries of what's possible. Every breakthrough starts with his relentless curiosity."
    },
    {
      name: "Pious Ncube",
      role: "Operations Manager",
      bio: "The execution master who ensures every project exceeds expectations. Operational perfection meets client delight."
    },
    {
      name: "Decent Ncube",
      role: "DevOps Engineer",
      bio: "The infrastructure genius who builds unbreakable systems. Your success runs on his bulletproof architecture."
    }
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const heroElement = document.querySelector('#hero');
    if (!heroElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    );

    observer.observe(heroElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isClient || !mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;

    const colors = [0x3b82f6, 0x06b6d4, 0x8b5cf6];
    const rings = [];

    for (let i = 0; i < 4; i++) {
      const geometry = new THREE.RingGeometry(0.8, 1.2, 32);
      const material = new THREE.MeshBasicMaterial({
        color: colors[i % colors.length],
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide
      });
      const ring = new THREE.Mesh(geometry, material);
      ring.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10
      );
      ring.rotation.x = Math.random() * Math.PI;
      ring.rotation.y = Math.random() * Math.PI;
      ring.rotation.z = Math.random() * Math.PI;
      scene.add(ring);
      rings.push(ring);
    }

    ringsRef.current = rings;
    camera.position.z = 8;

    const handleMouseMove = (event) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!mountRef.current) return;

      const time = Date.now() * 0.001;

      rings.forEach((ring, index) => {
        const targetX = mouseRef.current.x * 3 + Math.sin(time + index) * 2;
        const targetY = mouseRef.current.y * 3 + Math.cos(time + index) * 2;
        ring.position.x += (targetX - ring.position.x) * 0.1;
        ring.position.y += (targetY - ring.position.y) * 0.1;
        ring.rotation.x += 0.01;
        ring.rotation.y += 0.02;
        ring.rotation.z += 0.005;
        const scale = 1 + Math.sin(time * 2 + index) * 0.3;
        ring.scale.set(scale, scale, scale);
        if (isHeroVisible) {
          ring.material.opacity = Math.max(0, ring.material.opacity - 0.01);
        } else {
          const targetOpacity = 0.2 + Math.sin(time + index) * 0.1;
          ring.material.opacity = Math.min(targetOpacity, ring.material.opacity + 0.01);
        }
      });

      renderer.render(scene, camera);
      return () => {
        cancelAnimationFrame(animationFrameId);
        // cleanup
      };
    };

    const throttledMouseMove = throttle(handleMouseMove, 100); // 10fps
    window.addEventListener('mousemove', throttledMouseMove);
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isClient, isHeroVisible]);

  const teamCardStyle = {
    backgroundImage: `
      linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)),
      url("/images/abstract 2.jpg")
    `,
    backgroundSize: 'cover, cover',
    backgroundPosition: 'center center, center center',
    backgroundRepeat: 'no-repeat, no-repeat',
    transition: 'all 0.5s ease'
  };

  return (
    <section id="about" className="py-20 px-6 bg-black text-white overflow-x-hidden relative">
      <div
        ref={mountRef}
        className="absolute inset-0 pointer-events-none z-0"
        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}
      />
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            className="max-w-full"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <motion.p
              className="text-accent text-emerald-400 mb-4 text-sm sm:text-base"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeInOut" }}
            >
              THE ARCHITECTS OF TOMORROW
            </motion.p>
            <motion.h2
              className="section-title mb-6 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
            >
              We're Not Just <span className="gradient-text">Building AI</span>
              <br />
              <span className="text-2xl sm:text-3xl lg:text-4xl text-gray-300">We're Redefining Business</span>
            </motion.h2>
            <motion.p
              className="section-subtitle text-gray-300 mb-6 text-base sm:text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
            >
              Born from the belief that every business deserves superintelligent capabilities. We're the rebels who refuse to accept "that's just how it's done" and instead ask "what if we could do it better?"
            </motion.p>
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeInOut" }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0"></div>
                <span className="text-gray-300 text-sm sm:text-base">Battle-tested across 50+ transformations</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-teal-400 rounded-full flex-shrink-0"></div>
                <span className="text-gray-300 text-sm sm:text-base">Zero compromises on excellence</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></div>
                <span className="text-gray-300 text-sm sm:text-base">Trusted by visionaries worldwide</span>
              </div>
            </motion.div>
          </motion.div>
          <motion.div
            className="relative max-w-full"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 p-6 sm:p-8 rounded-2xl backdrop-blur-sm border border-gray-700">
              <motion.h3
                className="text-xl sm:text-2xl font-bold mb-4 text-white font-display"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeInOut" }}
              >
                Our Mission
              </motion.h3>
              <motion.p
                className="text-gray-300 mb-6 font-body text-sm sm:text-base leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
              >
                To democratize superintelligence. Every business—from scrappy startups to Fortune 500 giants—deserves AI capabilities that were once exclusive to tech titans. We're leveling the playing field.
              </motion.p>
              <motion.div
                className="grid grid-cols-2 gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeInOut" }}
              >
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-emerald-400 font-display">Many</div>
                  <div className="text-xs sm:text-sm text-gray-400">Businesses Transformed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-teal-400 font-display">10x</div>
                  <div className="text-xs sm:text-sm text-gray-400">Average ROI</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
        <motion.div
          className="text-center mb-12 max-w-full"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.p
            className="text-accent text-emerald-400 mb-4 text-sm sm:text-base"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeInOut" }}
          >
            THE DREAM TEAM
          </motion.p>
          <motion.h3
            className="text-3xl sm:text-4xl font-bold mb-4 font-display"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
          >
            Meet Your Success Partners
          </motion.h3>
          <motion.p
            className="section-subtitle text-gray-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
          >
            Five brilliant minds united by one obsession: making your business unstoppable through AI
          </motion.p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 mb-6">
          {teamMembers.slice(0, 2).map((member, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-2xl backdrop-blur-sm border border-gray-700 hover:border-purple-500 transition-all duration-300 group flex flex-col items-center text-center relative overflow-hidden hover:shadow-2xl hover:shadow-purple-500/20"
              style={teamCardStyle}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: "easeInOut" }}
            >
              <div
                className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                style={{
                  background: `
                    repeating-linear-gradient(
                      45deg,
                      transparent,
                      transparent 10px,
                      rgba(147, 51, 234, 0.1) 10px,
                      rgba(147, 51, 234, 0.1) 20px
                    ),
                    repeating-linear-gradient(
                      -45deg,
                      transparent,
                      transparent 10px,
                      rgba(20, 184, 166, 0.1) 10px,
                      rgba(20, 184, 166, 0.1) 20px
                    )
                  `
                }}
              />
              <motion.div
                className="relative w-28 h-28 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center mb-6 overflow-hidden z-10"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeInOut" }}
              >
                <svg className="w-16 h-16 text-white opacity-80" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM12 12.5c2.757 0 5-2.243 5-5s-2.243-5-5-5-5 2.243-5 5 2.243 5 5 5z"></path>
                </svg>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
              <motion.h4
                className="text-xl sm:text-2xl font-semibold text-white mb-2 font-display break-words z-10 relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
              >
                {member.name}
              </motion.h4>
              <motion.p
                className="text-accent text-emerald-400 text-sm sm:text-base mb-3 z-10 relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeInOut" }}
              >
                {member.role}
              </motion.p>
              <motion.p
                className="text-gray-300 text-sm sm:text-base leading-relaxed flex-grow z-10 relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
              >
                {member.bio}
              </motion.p>
              <motion.div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full group-hover:w-1/3 transition-all duration-300 z-10"
                initial={{ width: 0 }}
                whileInView={{ width: "33%" }}
                exit={{ width: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
            </motion.div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {teamMembers.slice(2).map((member, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-2xl backdrop-blur-sm border border-gray-700 hover:border-purple-500 transition-all duration-300 group flex flex-col items-center text-center relative overflow-hidden hover:shadow-2xl hover:shadow-purple-500/20"
              style={teamCardStyle}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: "easeInOut" }}
            >
              <div
                className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                style={{
                  background: `
                    repeating-linear-gradient(
                      45deg,
                      transparent,
                      transparent 10px,
                      rgba(147, 51, 234, 0.1) 10px,
                      rgba(147, 51, 234, 0.1) 20px
                    ),
                    repeating-linear-gradient(
                      -45deg,
                      transparent,
                      transparent 10px,
                      rgba(20, 184, 166, 0.1) 10px,
                      rgba(20, 184, 166, 0.1) 20px
                    )
                  `
                }}
              />
              <motion.div
                className="relative w-28 h-28 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center mb-6 overflow-hidden z-10"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeInOut" }}
              >
                <svg className="w-16 h-16 text-white opacity-80" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM12 12.5c2.757 0 5-2.243 5-5s-2.243-5-5-5-5 2.243-5 5 2.243 5 5 5z"></path>
                </svg>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
              <motion.h4
                className="text-xl sm:text-2xl font-semibold text-white mb-2 font-display break-words z-10 relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
              >
                {member.name}
              </motion.h4>
              <motion.p
                className="text-accent text-emerald-400 text-sm sm:text-base mb-3 z-10 relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeInOut" }}
              >
                {member.role}
              </motion.p>
              <motion.p
                className="text-gray-300 text-sm sm:text-base leading-relaxed flex-grow z-10 relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
              >
                {member.bio}
              </motion.p>
              <motion.div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full group-hover:w-1/3 transition-all duration-300 z-10"
                initial={{ width: 0 }}
                whileInView={{ width: "33%" }}
                exit={{ width: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// DataSection Component
export const DataSection = () => {
  return (
    <section className="py-20 px-6 bg-black text-white overflow-x-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="max-w-full"
          >
            <motion.p
              className="text-accent text-emerald-400 mb-4 text-sm sm:text-base"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeInOut" }}
            >
              DATA SUPERPOWERS
            </motion.p>
            <motion.h2
              className="section-title mb-8 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
            >
              Your Data Is Sitting On
              <br />
              <span className="gradient-text break-words">A Fortune</span>
            </motion.h2>
            <motion.p
              className="section-subtitle text-gray-300 mb-8 text-base sm:text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
            >
              Stop letting valuable insights slip through the cracks. Our AI doesn't just analyze your data—it transforms it into your competitive advantage, revealing opportunities your competitors can't see.
            </motion.p>
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeInOut" }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0"></div>
                <span className="text-gray-300 text-sm sm:text-base">Real-time intelligence that predicts market shifts</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-teal-400 rounded-full flex-shrink-0"></div>
                <span className="text-gray-300 text-sm sm:text-base">Pattern recognition that reveals hidden profits</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></div>
                <span className="text-gray-300 text-sm sm:text-base">Predictive models that see around corners</span>
              </div>
            </motion.div>
          </motion.div>
          <motion.div
            className="relative max-w-full"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <div className="relative">
              <motion.img
                src="https://images.unsplash.com/photo-1601132359864-c974e79890ac?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwyfHxBSSUyMHRlY2hub2xvZ3l8ZW58MHx8fGJsdWV8MTc1MjYzNDc2NXww&ixlib=rb-4.1.0&q=85"
                alt="AI Business Intelligence"
                className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-2xl max-w-full"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-2 rounded-lg shadow-lg max-w-[calc(100%-2rem)]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                  <span className="text-xs sm:text-sm break-words">AI analyzing customer behavior patterns</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ActionsSection Component
export const ActionsSection = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-gray-100 text-black overflow-x-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="max-w-full"
          >
            <motion.div
              className="flex items-center space-x-3 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeInOut" }}
            >
              <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
              <div className="w-3 h-3 bg-teal-600 rounded-full"></div>
            </motion.div>
            <motion.h2
              className="section-title mb-6 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight break-words"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
            >
              Stop Planning. Start Dominating.
            </motion.h2>
            <motion.p
              className="section-subtitle text-gray-700 mb-8 text-base sm:text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
            >
              While your competitors debate AI strategy, you'll already be reaping the rewards. Every day you wait is revenue lost to those who act decisively.
            </motion.p>
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeInOut" }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-emerald-600 rounded-full flex-shrink-0"></div>
                <span className="text-gray-700 text-sm sm:text-base">Business intelligence that never sleeps</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-teal-600 rounded-full flex-shrink-0"></div>
                <span className="text-gray-700 text-sm sm:text-base">Real-time processing that captures every opportunity</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-600 rounded-full flex-shrink-0"></div>
                <span className="text-gray-700 text-sm sm:text-base">Automated workflows that scale infinitely</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-pink-600 rounded-full flex-shrink-0"></div>
                <span className="text-gray-700 text-sm sm:text-base">SEO dominance that compounds daily</span>
              </div>
            </motion.div>
          </motion.div>
          <motion.div
            className="relative max-w-full"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <motion.div
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl max-w-full"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <div className="space-y-6">
                {[
                  { icon: "AI", title: "Analyzing customer psychology...", subtitle: "Discovering hidden buying patterns", color: "emerald-600" },
                  { icon: "📊", title: "Generating SEO domination strategy", subtitle: "Targeting competitor blind spots", color: "teal-600" },
                  { icon: "🔄", title: "Deploying automated workflows", subtitle: "Eliminating manual inefficiencies", color: "purple-600" },
                  { icon: "📈", title: "Optimizing conversion engines", subtitle: "Maximizing revenue per visitor", color: "pink-600" }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeInOut" }}
                  >
                    <div className={`w-8 h-8 bg-${item.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                      <span className="text-white text-sm font-bold font-mono">{item.icon}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-gray-900 font-display text-sm sm:text-base">{item.title}</div>
                      <div className="text-xs sm:text-sm text-gray-600">{item.subtitle}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
export const Footer = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    industryType: '',
    projectType: '',
    projectDetails: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const services = [
    'AI Agents',
    'AI Websites',
    'SaaS',
    'SEO Services',
    'Generative Engine Optimization',
    'Automation Systems',
    'Other'
  ];

  const industries = [
    'Technology',
    'Healthcare',
    'Finance & Banking',
    'E-commerce & Retail',
    'Real Estate',
    'Education',
    'Manufacturing',
    'Legal Services',
    'Marketing & Advertising',
    'Hospitality & Tourism',
    'Transportation & Logistics',
    'Food & Beverage',
    'Construction',
    'Non-profit',
    'Consulting',
    'Other'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setSubmitMessage('Thank you! We\'ll get back to you soon.');
      setIsSubmitting(false);
      setFormData({
        companyName: '',
        email: '',
        industryType: '',
        projectType: '',
        projectDetails: ''
      });
      setTimeout(() => setSubmitMessage(''), 3000);
    }, 1000);
  };

  return (
    <footer id='footer' className="bg-black text-white py-12 px-4 overflow-x-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="max-w-full"
          >
            <motion.h2
              className="text-2xl sm:text-3xl font-bold mb-6 font-display text-emerald-400 font-mono"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeInOut" }}
            >
              Get In Touch
            </motion.h2>
            <motion.p
              className="text-gray-400 mb-8 font-body text-sm sm:text-base max-w-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
            >
              Ready to transform your business with AI? Tell us about your project and let's create something amazing together.
            </motion.p>
            <motion.div
              className="space-y-6 max-w-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
            >
              <div>
                <label className="block text-sm font-medium text-emerald-400 font-mono mb-2">Email Address *</label>
                <motion.input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-white placeholder-gray-500 transition-all box-border"
                  placeholder="your.email@example.com"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-emerald-400 font-mono mb-2">Business/Company Name *</label>
                <motion.input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-white placeholder-gray-500 transition-all box-border"
                  placeholder="Your business or company name"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: 0.5, ease: "easeInOut" }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-emerald-400 font-mono mb-2">Industry Type *</label>
                <motion.select
                  name="industryType"
                  value={formData.industryType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-900 border font-mono border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-white transition-all box-border"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: 0.6, ease: "easeInOut" }}
                >
                  <option value="">Select your industry...</option>
                  {industries.map((industry, index) => (
                    <option key={index} value={industry}>{industry}</option>
                  ))}
                </motion.select>
              </div>
              <div>
                <label className="block text-sm font-medium text-emerald-400 font-mono mb-2">Project Type *</label>
                <motion.select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-white transition-all box-border"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: 0.7, ease: "easeInOut" }}
                >
                  <option value="">Select a service...</option>
                  {services.map((service, index) => (
                    <option key={index} value={service}>{service}</option>
                  ))}
                </motion.select>
              </div>
              <div>
                <label className="block text-sm font-medium text-emerald-400 font-mono mb-2">Project Details *</label>
                <motion.textarea
                  name="projectDetails"
                  value={formData.projectDetails}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-white placeholder-gray-500 transition-all resize-vertical box-border"
                  placeholder="Tell us about your project requirements, goals, and any specific details..."
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: 0.8, ease: "easeInOut" }}
                />
              </div>
              <motion.button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-emerald-500 font-mono hover:bg-emerald-600 text-black font-semibold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.9, ease: "easeInOut" }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>
              {submitMessage && (
                <motion.div
                  className="text-emerald-400 font-mono text-center font-medium bg-emerald-900/20 border border-emerald-500/30 rounded-lg py-3"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: 1.0, ease: "easeInOut" }}
                >
                  {submitMessage}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="max-w-full"
          >
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeInOut" }}
            >
              <img
                src="/images/logo.png"
                width={100}
                alt="X-Web Labs Logo"
                className="mb-4 max-w-full"
              />
              <motion.p
                className="text-gray-400 mb-6 font-body text-sm sm:text-base max-w-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
              >
                Transforming businesses through AI automation and intelligent solutions. Your partner in digital innovation.
              </motion.p>
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
              >
                <div className="flex items-center space-x-3">
                  <Mail size={20} className="text-emerald-400 flex-shrink-0" />
                  <div>
                    <motion.a
                      href="mailto:info@xweblabs.io"
                      className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 cursor-pointer text-sm sm:text-base"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
                    >
                      info@xweblabs.io
                    </motion.a>
                    </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone size={20} className="text-emerald-400 flex-shrink-0 mt-1" />
                  <div>
                    <div className="space-y-1 mt-1">
                      {["+61 450 803 578", "+263 777 350 003", "+263 785 401 678"].map((phone, idx) => (
                        <motion.a
                          key={idx}
                          href={`https://wa.me/${phone.replace(/\s+/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-gray-300 hover:text-emerald-400 transition-colors duration-300 cursor-pointer text-sm sm:text-base"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          viewport={{ once: false }}
                          transition={{ duration: 0.6, delay: 0.5 + idx * 0.1, ease: "easeInOut" }}
                        >
                          {phone}
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            <motion.div
              className="grid md:grid-cols-2 gap-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeInOut" }}
            >
              <div>
                <motion.h3
                  className="text-white mb-4 font-display text-sm sm:text-base"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: 0.5, ease: "easeInOut" }}
                >
                  Services
                </motion.h3>
                <motion.ul
                  className="space-y-2 text-gray-400"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: 0.6, ease: "easeInOut" }}
                >
                  {services.map((service, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.6, delay: 0.7 + index * 0.1, ease: "easeInOut" }}
                    >
                      <a href="#" className="hover:text-emerald-400 font-mono transition-colors text-sm sm:text-base">{service}</a>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
              <div>
                <motion.h3
                  className="text-white mb-4 font-display text-sm sm:text-base"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: 0.5, ease: "easeInOut" }}
                >
                  Company
                </motion.h3>
                <motion.ul
                  className="space-y-2 text-gray-400"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: 0.6, ease: "easeInOut" }}
                >
                  {[
                    { href: "#about", text: "About Us" },
                    { href: "#projects", text: "Projects" },
                    { href: "#contact", text: "Contact" }
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.6, delay: 0.7 + index * 0.1, ease: "easeInOut" }}
                    >
                      <a href={item.href} className="hover:text-emerald-400 font-mono transition-colors text-sm sm:text-base">{item.text}</a>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
        <motion.div
          className="border-t border-gray-800 pt-8 text-center mt-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.p
            className="text-gray-400 font-mono text-sm sm:text-base"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeInOut" }}
          >
            © {new Date().getFullYear()} X-Web Labs. All rights reserved.
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
};

// Chatbot Component - Updated with modern typography
export const Chatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hello! I\'m your X-Web Labs AI assistant. How can I help you build the future with AI automation today?' }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessages = [
        ...messages,
        { type: 'user', text: inputText },
        { type: 'bot', text: 'Thank you for your interest in our AI solutions! Our team will analyze your needs and provide personalized recommendations. Contact us at xweblabs@gmail.com or call +26377735003.' }
      ];
      setMessages(newMessages);
      setInputText('');
    }
  };

  return (
    <motion.div
      className="fixed bottom-24 right-8 w-80 bg-black/95 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-2xl z-50"
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.8 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-t-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm font-mono">AI</span>
            </div>
            <span className="text-white font-semibold font-display">X-Web Labs Assistant</span>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="h-64 overflow-y-auto p-4 space-y-3">
        {messages.map((message, index) => (
          <motion.div
            key={index}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className={`max-w-xs p-3 rounded-lg ${
              message.type === 'user' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-800 text-gray-300'
            }`}>
              <span className="text-small">{message.text}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 bg-gray-800 text-white p-2 rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none text-small"
          />
          <button
            onClick={handleSend}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-2 rounded-lg hover:shadow-lg transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
};