import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Header Component - Floating Navbar
export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      className={`fixed top-4 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/90 backdrop-blur-lg shadow-2xl border border-gray-800' 
          : 'bg-black/60 backdrop-blur-sm border border-gray-700'
      } rounded-2xl`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{width: "100%"}}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm font-mono">X</span>
            </div>
            <span className="text-white text-xl font-bold font-display">X-Web Labs</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="#home">Home</NavLink>
            <NavLink href="#services">Services</NavLink>
            <NavLink href="#about">About</NavLink>
            <NavLink href="#projects">Projects</NavLink>
            <NavLink href="#contact">Contact</NavLink>
            <motion.button
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 font-semibold tracking-wide"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
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
                <NavLink href="#home" mobile>Home</NavLink>
                <NavLink href="#services" mobile>Services</NavLink>
                <NavLink href="#about" mobile>About</NavLink>
                <NavLink href="#projects" mobile>Projects</NavLink>
                <NavLink href="#contact" mobile>Contact</NavLink>
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-left font-semibold">
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

const NavLink = ({ href, children, mobile = false }) => (
  <motion.a
    href={href}
    className={`text-white hover:text-emerald-400 transition-colors duration-200 font-medium ${
      mobile ? 'block py-2' : ''
    }`}
    whileHover={{ y: -2 }}
  >
    {children}
  </motion.a>
);

// Hero Component - Updated with AI automation background and modern typography
export const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-32 px-6 overflow-hidden">
      {/* AI Automation Background Image */}
      <div 
        className="absolute inset-0 scale-110"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1660165458059-57cfb6cc87e5?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Modern Gradient Overlay */}
      <div className="absolute inset-0 hero-gradient-overlay" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-emerald-400 rounded-full opacity-60"
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/3 w-1 h-1 bg-teal-400 rounded-full opacity-80"
          animate={{
            y: [0, -20, 0],
            x: [0, -15, 0],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-purple-400 rounded-full opacity-40"
          animate={{
            y: [0, 25, 0],
            x: [0, -10, 0],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{
            duration: 5,
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
          className="max-w-6xl mx-auto"
        >
          {/* Small accent text */}
          <motion.p
            className="text-accent text-emerald-400 mb-4 opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            NEXT-GENERATION AI SOLUTIONS
          </motion.p>
          
          {/* Huge hero title with modern typography */}
          <motion.h1
            className="hero-text text-white mb-6"
            style={{fontSize: 70}}
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
          
          {/* Medium subtitle */}
          <motion.p
            className="hero-subtitle text-gray-200 mb-8 max-w-4xl mx-auto opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            We create intelligent AI agents, cutting-edge websites, and automation systems that transform how businesses operate in the digital age.
          </motion.p>
          
          {/* Stats row with small text */}
          <motion.div
            className="flex flex-wrap justify-center gap-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-white font-display">50+</div>
              <div className="text-small text-gray-400">Projects Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white font-display">100%</div>
              <div className="text-small text-gray-400">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white font-display">24/7</div>
              <div className="text-small text-gray-400">AI Support</div>
            </div>
          </motion.div>
          
          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300 tracking-wide"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(147, 51, 234, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Our Services
            </motion.button>
            
            <motion.button
              className="border-2 border-white/80 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </motion.button>
          </motion.div>
          
          {/* Small bottom text */}
          <motion.p
            className="text-small text-gray-400 mt-8 opacity-70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Trusted by leading enterprises worldwide
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

// Client Logos Component
export const ClientLogos = () => {
  const logos = [
    "Python", "React", "Javascript", "NodeJs", "Langflow", "n8n", "Make", "SQL", "Tensorflow" 
  ];

  return (
    <section className="py-16 px-6 bg-black border-b border-gray-800">
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
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60">
          {logos.map((logo, index) => (
            <motion.div
              key={index}
              className="text-white text-lg font-medium font-display"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 0.6, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.1, opacity: 1 }}
            >
              {logo}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Services Component - Updated with modern typography
export const Services = () => {
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      icon: "🤖",
      title: "AI Agents",
      description:
        "Intelligent automation agents that work 24/7 to streamline your processes and enhance customer experiences",
      features: [
        "Natural Language Processing",
        "Machine Learning Models",
        "Automated Decision Making",
        "Real-time Analytics",
      ],
      gradient: "from-emerald-500 to-teal-600",
      image:
        "/images/AI.png",
      stats: { clients: "150+", efficiency: "85%", support: "24/7" },
      count: "01",
    },
    {
      icon: "🌐",
      title: "AI Websites",
      description: "Dynamic, intelligent websites that adapt and learn from user behavior to optimize conversions",
      features: ["Responsive Design", "AI-Powered Features", "Performance Optimization", "SEO Integration"],
      gradient: "from-purple-500 to-pink-600",
      image:
        "/images/AI2.png",
      stats: { projects: "200+", conversion: "+40%", speed: "99%" },
      count: "02",
    },
    {
      icon: "☁️",
      title: "SaaS",
      description:
        "Scalable cloud-based software solutions designed to streamline your business operations and enhance productivity.",
      features: ["Multi-Tenant Architecture", "User Management", "Subscription Billing", "Real-time Analytics"],
      gradient: "from-indigo-500 to-purple-600",
      image:
        "/images/saas.png",
      stats: { users: "10K+", uptime: "99.9%", scale: "∞" },
      count: "003",
    },
    {
      icon: "🔍",
      title: "SEO Services",
      description: "Advanced SEO strategies powered by AI to boost your online presence and organic traffic",
      features: ["Keyword Research", "Content Optimization", "Technical SEO", "Performance Tracking"],
      gradient: "from-teal-500 to-emerald-600",
      image: "/images/SEO2.png",
      stats: { ranking: "+300%", traffic: "+150%", keywords: "500+" },
      count: "04",
    },
    {
      icon: "🤖",
      title: "Generative Engine Optimization",
      description:
        "Boost your brand's visibility across AI-powered search and answer engines using advanced generative content strategies.",
      features: [
        "AI-Optimized Content Creation",
        "Structured Data & Schema Enhancement",
        "LLM Ranking Optimization",
        "Answer Engine Visibility Reports",
      ],
      gradient: "from-pink-500 to-rose-600",
      image: "/images/geo.png",
      stats: { visibility: "+250%", queries: "1M+", engines: "10+" },
      count: "05",
    },
    {
      icon: "⚡",
      title: "Automation Systems",
      description: "Custom automation solutions that eliminate repetitive tasks and improve operational efficiency",
      features: ["Workflow Automation", "Data Processing", "API Integration", "Business Intelligence"],
      gradient: "from-pink-500 to-purple-600",
      image: "/images/auto2.png",
      stats: { automation: "95%", savings: "$50K+", time: "80%" },
      count: "06",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const servicesSection = document.getElementById("services");
      if (!servicesSection) return;

      const sectionTop = servicesSection.offsetTop;
      const sectionHeight = servicesSection.offsetHeight;
      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;

      // Check if we're in the services section
      if (scrollTop >= sectionTop - windowHeight / 2 && scrollTop <= sectionTop + sectionHeight - windowHeight / 2) {
        // Calculate progress through the services section
        const relativeScroll = scrollTop - sectionTop + windowHeight / 2;
        const serviceHeight = sectionHeight / services.length;
        const newActiveService = Math.floor(relativeScroll / serviceHeight);

        if (newActiveService >= 0 && newActiveService < services.length) {
          setActiveService(newActiveService);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [services.length]);

  return (
    <section id="services" className="bg-gradient-to-br from-gray-50 to-gray-100 text-black">
      {/* Section Header - Standalone with proper spacing */}
      <div className="container mx-auto px-6 py-20">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            className="text-accent text-gray-600 mb-4 font-bold text-sm tracking-wider"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            WHAT WE DO
          </motion.p>

          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Our{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Core Services
            </span>
          </h2>

          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Comprehensive AI solutions designed to transform your business operations and drive growth
          </p>
        </motion.div>
      </div>

      {/* Services Content - Separate container */}
      <div className="relative min-h-screen">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Side - Scrolling Text Content */}
            <div className="space-y-32">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className="space-y-8 min-h-screen flex flex-col justify-center"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-30%" }}
                  transition={{ duration: 0.8 }}
                >
                  {/* Service Number */}
                  <motion.div
                    className="flex items-center mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    <div className="flex items-center">
                      <span className="text-pink-500 text-lg font-bold mr-4">●</span>
                      <motion.p
                        className="text-accent text-gray-600 font-bold text-sm tracking-wider"
                        style={{fontSize: 20}}
                      >
                        {service.count}
                      </motion.p>
                    </div>
                  </motion.div>

                  {/* Service Title */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <h3 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                      {service.title.split(" ").map((word, idx) => (
                        <span key={idx} className={idx === service.title.split(" ").length - 1 ? "block" : ""}>
                          {word}
                          {idx !== service.title.split(" ").length - 1 ? " " : ""}
                        </span>
                      ))}
                    </h3>
                    <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mb-8"></div>
                  </motion.div>

                  {/* Service Description */}
                  <motion.p
                    className="text-xl text-gray-700 leading-relaxed mb-8 max-w-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    {service.description}
                  </motion.p>

                  {/* Features List */}
                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    {service.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-center text-gray-700"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                      >
                        <div className="w-2 h-2 bg-cyan-600 rounded-full mr-4 flex-shrink-0"></div>
                        <span className="text-lg">{feature}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Right Side - Sticky Image Container with top offset */}
            <div className="sticky top-24 h-[calc(100vh-6rem)] flex items-center justify-center">
              <div className="relative w-full max-w-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`image-${activeService}`}
                    className="relative"
                    initial={{ opacity: 0, scale: 0.9, rotateY: 90 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.9, rotateY: -90 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  >
                    {/* Main Image Container */}
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                      <img
                        src={services[activeService].image || "/placeholder.svg"}
                        alt={services[activeService].title}
                        className="w-full h-[60vh] object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                      {/* Overlay Content */}
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

                    {/* Decorative Elements */}
                    <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-full blur-2xl"></div>
                    <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl"></div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// About Us Component - Updated with modern typography
export const AboutUs = () => {
  const teamMembers = [
    {
      name: "Mandlenkosi Ndiweni",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1602110531833-53eab0b67456?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHN8ZW58MHx8fGdyZWVufDE3NTI3Mzg4MDl8MA&ixlib=rb-4.1.0&q=85",
      bio: "Leading our technical vision and AI innovation strategy"
    },
    {
      name: "Mqhelisi Mzizi",
      role: "Chief Marketing Officer",
      image: "https://images.pexels.com/photos/30535624/pexels-photo-30535624.jpeg",
      bio: "Driving growth through strategic marketing and brand development"
    },
    {
      name: "Stanlake Phiri",
      role: "Research Lead",
      image: "https://images.unsplash.com/photo-1602110531833-53eab0b67456?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHN8ZW58MHx8fGdyZWVufDE3NTI3Mzg4MDl8MA&ixlib=rb-4.1.0&q=85",
      bio: "Pioneering research in AI and automation technologies"
    },
    {
      name: "Pious Ncube",
      role: "Operations Manager",
      image: "https://images.pexels.com/photos/30535624/pexels-photo-30535624.jpeg",
      bio: "Ensuring smooth operations and project delivery excellence"
    }
  ];

  return (
    <section id="about" className="py-20 px-6 bg-black text-white">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-accent text-emerald-400 mb-4">WHO WE ARE</p>
            
            <h2 className="section-title mb-6">
              About <span className="gradient-text">X-Web Labs</span>
            </h2>
            
            <p className="section-subtitle text-gray-300 mb-6">
              We are a cutting-edge AI automation agency dedicated to transforming businesses through intelligent technology solutions.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span className="text-gray-300">Founded with a vision to democratize AI technology</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                <span className="text-gray-300">50+ successful projects delivered</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-gray-300">Trusted by enterprises worldwide</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 p-8 rounded-2xl backdrop-blur-sm border border-gray-700">
              <h3 className="text-2xl font-bold mb-4 text-white font-display">Our Mission</h3>
              <p className="text-gray-300 mb-6 font-body">
                To empower businesses with intelligent automation solutions that enhance productivity, drive innovation, and create sustainable competitive advantages.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-emerald-400 font-display">50+</div>
                  <div className="text-small text-gray-400">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-teal-400 font-display">100%</div>
                  <div className="text-small text-gray-400">Client Satisfaction</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Team Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-accent text-emerald-400 mb-4">OUR TEAM</p>
          <h3 className="text-4xl font-bold mb-4 font-display">Meet Our Expert Team</h3>
          <p className="section-subtitle text-gray-300 max-w-2xl mx-auto">
            Passionate innovators dedicated to transforming your business with AI
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 p-6 rounded-xl backdrop-blur-sm border border-gray-700 hover:border-emerald-500 transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="relative mb-6">
                <motion.img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto object-cover"
                  whileHover={{ scale: 1.1 }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
              <h4 className="text-xl font-semibold text-white mb-2 text-center font-display">{member.name}</h4>
              <p className="text-accent text-emerald-400 text-center mb-3">{member.role}</p>
              <p className="text-gray-300 text-center text-small">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Projects Done Component - Updated with modern typography
export const ProjectsDone = () => {
  const projects = [
    {
      title: "E-commerce AI Assistant",
      category: "AI Agent",
      description: "Intelligent chatbot that increased customer engagement by 300% for a major retailer",
      image: "https://images.unsplash.com/photo-1655393001768-d946c97d6fd1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwyfHxBSSUyMHRlY2hub2xvZ3l8ZW58MHx8fGJsdWV8MTc1MjYzNDc2NXww&ixlib=rb-4.1.0&q=85",
      technologies: ["Natural Language Processing", "Machine Learning", "API Integration"]
    },
    {
      title: "Healthcare Management Platform",
      category: "AI Website",
      description: "Comprehensive healthcare platform with AI-powered patient management and analytics",
      image: "https://images.pexels.com/photos/16053029/pexels-photo-16053029.jpeg",
      technologies: ["React", "AI Analytics", "Data Visualization", "Cloud Computing"]
    },
    {
      title: "Financial Services SEO Campaign",
      category: "SEO Optimization",
      description: "Achieved 400% increase in organic traffic for a fintech startup through AI-driven SEO",
      image: "https://images.unsplash.com/photo-1601132359864-c974e79890ac?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwyfHxBSSUyMHRlY2hub2xvZ3l8ZW58MHx8fGJsdWV8MTc1MjYzNDc2NXww&ixlib=rb-4.1.0&q=85",
      technologies: ["AI Content Generation", "Technical SEO", "Analytics", "Performance Optimization"]
    },
    {
      title: "Manufacturing Automation System",
      category: "Automation",
      description: "Automated production line monitoring system that reduced downtime by 60%",
      image: "https://images.unsplash.com/photo-1700498466261-824cbd01974e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwyfHxkYXRhJTIwdmlzdWFsaXphdGlvbnxlbnwwfHx8Ymx1ZXwxNzUyNzQwNjYyfDA&ixlib=rb-4.1.0&q=85",
      technologies: ["IoT Integration", "Real-time Monitoring", "Predictive Analytics", "Workflow Automation"]
    }
  ];

  return (
    <section id="projects" className="py-20 px-6 bg-gradient-to-br from-gray-50 to-gray-100 text-black">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-accent text-gray-600 mb-4">OUR WORK</p>
          <h2 className="section-title mb-6">
            Recent <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle text-gray-700 max-w-2xl mx-auto">
            Explore our successful implementations and see how we've helped businesses transform with AI
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-accent font-semibold">
                  {project.category}
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 font-display">{project.title}</h3>
                <p className="text-gray-600 mb-6 font-body">{project.description}</p>
                
                <div className="mb-6">
                  <h4 className="text-small font-semibold text-gray-800 mb-2 font-mono">TECHNOLOGIES USED:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-small">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button className="text-purple-600 font-semibold hover:text-purple-800 transition-colors duration-200 font-display">
                  View Details →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Data Section Component - Updated with modern typography
export const DataSection = () => {
  return (
    <section className="py-20 px-6 bg-black text-white">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-accent text-emerald-400 mb-4">DATA INTELLIGENCE</p>
            
            <h2 className="section-title mb-8 leading-none">
              Do more with
              <br />
              <span className="gradient-text">
                more of your data.
              </span>
            </h2>
            
            <p className="section-subtitle text-gray-300 mb-8">
              Transform raw data into actionable insights with our AI-powered analytics platform.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span className="text-gray-300">Real-time Data Processing</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                <span className="text-gray-300">Advanced Analytics & Insights</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-gray-300">Predictive Intelligence</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1601132359864-c974e79890ac?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwyfHxBSSUyMHRlY2hub2xvZ3l8ZW58MHx8fGJsdWV8MTc1MjYzNDc2NXww&ixlib=rb-4.1.0&q=85"
                alt="AI Business Intelligence" 
                className="w-full h-96 object-cover rounded-2xl"
              />
              <div className="absolute top-4 left-4 bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-small">AI analyzing customer behavior patterns</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Actions Section Component - Updated with modern typography
export const ActionsSection = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-gray-100 text-black">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
              <div className="w-3 h-3 bg-teal-600 rounded-full"></div>
            </div>
            
            <h2 className="section-title mb-6">
              Turn data into action.
            </h2>
            
            <p className="section-subtitle text-gray-700 mb-8">
              Transform your business with intelligent automation solutions that deliver measurable results.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                <span className="text-gray-700">AI-Powered Business Intelligence</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                <span className="text-gray-700">Real-time Data Processing</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                <span className="text-gray-700">Automated Workflow Systems</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-pink-600 rounded-full"></div>
                <span className="text-gray-700">Advanced SEO Analytics</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white p-8 rounded-2xl shadow-2xl">
              <div className="space-y-6">
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold font-mono">AI</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 font-display">AI Agent Analysis</div>
                    <div className="text-small text-gray-600">Processing customer data...</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">📊</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 font-display">Generate SEO insights</div>
                    <div className="text-small text-gray-600">Optimization recommendations active</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">🔄</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 font-display">Automate workflow systems</div>
                    <div className="text-small text-gray-600">Cross-platform integration</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">📈</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 font-display">Deploy AI website features</div>
                    <div className="text-small text-gray-600">Enhanced user experience</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Footer Component - Updated with modern typography
export const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 px-6" id="contact">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm font-mono">X</span>
              </div>
              <span className="text-white text-xl font-bold font-display">X-Web Labs</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md font-body">
              Transforming businesses through AI automation and intelligent solutions. Your partner in digital innovation.
            </p>
            <div className="space-y-2">
              <p className="text-gray-400">
                <span className="text-emerald-400 font-mono">EMAIL:</span> xweblabs@gmail.com
              </p>
              <p className="text-gray-400">
                <span className="text-emerald-400 font-mono">PHONE:</span> +26377735003
              </p>
              <p className="text-gray-400">
                <span className="text-emerald-400 font-mono">PHONE:</span> +263785401678
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4 font-display">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">AI Agents</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">AI Websites</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">SEO Services</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Automation Systems</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4 font-display">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#about" className="hover:text-emerald-400 transition-colors">About Us</a></li>
              <li><a href="#projects" className="hover:text-emerald-400 transition-colors">Projects</a></li>
              <li><a href="#contact" className="hover:text-emerald-400 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Careers</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-small">
            © 2025 X-Web Labs. All rights reserved. Powered by AI Innovation.
          </p>
        </div>
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