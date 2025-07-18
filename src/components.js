import React, {useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

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
          : 'bg-black/60 backdrop-blur-sm border border-gray-700'
      } rounded-2xl max-w-full`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-6 py-4 max-w-full">
        <div className="flex items-center justify-between">
          {/* Logo */}
           <motion.img
              src="/images/logo.png"
              animate={{ x: 10, rotate: 360 }}
              transition={{ duration: 2 }}
              style={{}}
              width={100}
            />

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
                <NavLink href="#home" mobile onClose={closeMobileMenu}>Home</NavLink>
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
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const objectsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);

    // Store references
    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;

    // Camera position
    camera.position.z = 8;

    // Harmonized lighting
    const ambientLight = new THREE.AmbientLight(0x1a1a2e, 0.4); // Slightly increased ambient light for better base visibility
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7); // Slightly reduced intensity
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Subtler point lights, aligned with a refined palette
    const pointLight1 = new THREE.PointLight(0x00aaff, 1.0, 50); // Clear blue
    pointLight1.position.set(8, 8, 8);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x8A2BE2, 0.8, 50); // Purple
    pointLight2.position.set(-8, -8, 8);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0x40E0D0, 0.6, 50); // Turquoise
    pointLight3.position.set(8, -8, -8);
    scene.add(pointLight3);

    // Create futuristic 3D objects with refined glass-like and glowing effects
    const objects = [];

    // 1. Glowing CPU/Chip with glass effect (Blue Focus)
    const chipGeometry = new THREE.BoxGeometry(1.2, 1.2, 0.15);
    const chipMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x00aaff, // Clear blue
      emissive: 0x004488, // Deeper blue glow
      emissiveIntensity: 0.3, // Subtler glow
      metalness: 0.1,
      roughness: 0.1,
      transparent: true,
      opacity: 0.6, // More transparent
      transmission: 0.4,
      thickness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1
    });
    const chip = new THREE.Mesh(chipGeometry, chipMaterial);
    chip.position.set(-6, 3, -2);
    chip.castShadow = true;
    scene.add(chip);

    const chipWireframe = new THREE.Mesh(
      chipGeometry,
      new THREE.MeshBasicMaterial({
        color: 0x00aaff,
        wireframe: true,
        transparent: true,
        opacity: 0.2 // Subtler wireframe
      })
    );
    chipWireframe.position.copy(chip.position);
    chip.add(chipWireframe);

    objects.push({ mesh: chip, speed: 0.01, followStrength: 0.12, basePos: { x: -6, y: 3, z: -2 }, baseOpacity: 0.6, baseEmissiveIntensity: 0.3 });

    // 2. Pulsing Neural Network Node with glass sphere (Purple Focus)
    const nodeGeometry = new THREE.SphereGeometry(0.6, 32, 32);
    const nodeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x8A2BE2, // Purple
      emissive: 0x4B0082, // Deeper purple glow
      emissiveIntensity: 0.4, // Subtler glow
      metalness: 0.0,
      roughness: 0.0,
      transparent: true,
      opacity: 0.5, // More transparent
      transmission: 0.6,
      thickness: 0.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.0,
      ior: 1.5
    });
    const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
    node.position.set(6, -2, 1);
    node.castShadow = true;
    scene.add(node);

    const nodeCore = new THREE.Mesh(
      new THREE.SphereGeometry(0.3, 16, 16),
      new THREE.MeshBasicMaterial({
        color: 0x8A2BE2,
        transparent: true,
        opacity: 0.7 // Slightly reduced opacity
      })
    );
    node.add(nodeCore);

    objects.push({ mesh: node, speed: 0.015, followStrength: 0.15, basePos: { x: 6, y: -2, z: 1 }, baseOpacity: 0.5, baseEmissiveIntensity: 0.4 });

    // 3. Rotating Data Crystal with prismatic effect (Turquoise Focus)
    const crystalGeometry = new THREE.OctahedronGeometry(0.8);
    const crystalMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x40E0D0, // Turquoise
      emissive: 0x207068, // Subtle turquoise glow
      emissiveIntensity: 0.2, // Very subtle glow
      metalness: 0.0,
      roughness: 0.0,
      transparent: true,
      opacity: 0.4, // More transparent
      transmission: 0.8, // High transmission for clear glass
      thickness: 0.3,
      clearcoat: 1.0,
      clearcoatRoughness: 0.0,
      ior: 2.4,
      dispersion: 0.1
    });
    const crystal = new THREE.Mesh(crystalGeometry, crystalMaterial);
    crystal.position.set(-2, 5, -3);
    crystal.castShadow = true;
    scene.add(crystal);

    const crystalEdges = new THREE.EdgesGeometry(crystalGeometry);
    const crystalLines = new THREE.LineSegments(
      crystalEdges,
      new THREE.LineBasicMaterial({
        color: 0x40E0D0,
        transparent: true,
        opacity: 0.5 // Subtler edges
      })
    );
    crystal.add(crystalLines);

    objects.push({ mesh: crystal, speed: 0.02, followStrength: 0.18, basePos: { x: -2, y: 5, z: -3 }, baseOpacity: 0.4, baseEmissiveIntensity: 0.2 });

    // 4. Circuit Board Plane with holographic effect (Subtle Blue)
    const circuitGeometry = new THREE.PlaneGeometry(2, 2);
    const circuitMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x6495ED, // Cornflower Blue
      emissive: 0x324A76, // Subtle glow
      emissiveIntensity: 0.1, // Minimal self-emission
      metalness: 0.2,
      roughness: 0.3,
      transparent: true,
      opacity: 0.3, // Highly transparent
      transmission: 0.5,
      thickness: 0.1,
      clearcoat: 0.8,
      clearcoatRoughness: 0.2,
      side: THREE.DoubleSide
    });
    const circuit = new THREE.Mesh(circuitGeometry, circuitMaterial);
    circuit.position.set(-5, -3, 2);
    circuit.castShadow = true;
    scene.add(circuit);

    objects.push({ mesh: circuit, speed: 0.008, followStrength: 0.1, basePos: { x: -5, y: -3, z: 2 }, baseOpacity: 0.3, baseEmissiveIntensity: 0.1 });

    // 5. AI Brain Torus with inner glow (Subdued Purple)
    const brainGeometry = new THREE.TorusGeometry(0.8, 0.3, 16, 32);
    const brainMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x9370DB, // Medium Purple
      emissive: 0x4A386D, // Deeper purple glow
      emissiveIntensity: 0.3, // Subtler glow
      metalness: 0.1,
      roughness: 0.2,
      transparent: true,
      opacity: 0.6, // More transparent
      transmission: 0.3,
      thickness: 0.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1
    });
    const brain = new THREE.Mesh(brainGeometry, brainMaterial);
    brain.position.set(5, 2, -1);
    brain.castShadow = true;
    scene.add(brain);

    const brainGlow = new THREE.Mesh(
      new THREE.TorusGeometry(0.6, 0.2, 8, 16),
      new THREE.MeshBasicMaterial({
        color: 0x9370DB,
        transparent: true,
        opacity: 0.3 // Subtler inner glow
      })
    );
    brain.add(brainGlow);

    objects.push({ mesh: brain, speed: 0.012, followStrength: 0.14, basePos: { x: 5, y: 2, z: -1 }, baseOpacity: 0.6, baseEmissiveIntensity: 0.3 });

    // 6. Quantum Cube with holographic shimmer (Subtle Turquoise)
    const quantumGeometry = new THREE.BoxGeometry(0.7, 0.7, 0.7);
    const quantumMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x7FFFD4, // Aquamarine
      emissive: 0x3F7F6A, // Deeper turquoise glow
      emissiveIntensity: 0.4, // Subtler glow
      metalness: 0.0,
      roughness: 0.0,
      transparent: true,
      opacity: 0.4, // More transparent
      transmission: 0.6,
      thickness: 0.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.0,
      ior: 1.8
    });
    const quantum = new THREE.Mesh(quantumGeometry, quantumMaterial);
    quantum.position.set(1, 1, 3);
    quantum.castShadow = true;
    scene.add(quantum);

    const quantumWireframe = new THREE.Mesh(
      quantumGeometry,
      new THREE.MeshBasicMaterial({
        color: 0x7FFFD4,
        wireframe: true,
        transparent: true,
        opacity: 0.3 // Subtler wireframe
      })
    );
    quantum.add(quantumWireframe);

    objects.push({ mesh: quantum, speed: 0.018, followStrength: 0.16, basePos: { x: 1, y: 1, z: 3 }, baseOpacity: 0.4, baseEmissiveIntensity: 0.4 });

    // 7. Glass Dodecahedron with prismatic edges (Subtle Purple)
    const dodecaGeometry = new THREE.DodecahedronGeometry(0.9);
    const dodecaMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xBA55D3, // Medium Orchid
      emissive: 0x5D2B6B, // Deeper purple glow
      emissiveIntensity: 0.3, // Subtler glow
      metalness: 0.0,
      roughness: 0.0,
      transparent: true,
      opacity: 0.5, // More transparent
      transmission: 0.5,
      thickness: 0.3,
      clearcoat: 1.0,
      clearcoatRoughness: 0.0,
      ior: 2.0
    });
    const dodeca = new THREE.Mesh(dodecaGeometry, dodecaMaterial);
    dodeca.position.set(4, -4, 0);
    dodeca.castShadow = true;
    scene.add(dodeca);

    const dodecaEdges = new THREE.EdgesGeometry(dodecaGeometry);
    const dodecaLines = new THREE.LineSegments(
      dodecaEdges,
      new THREE.LineBasicMaterial({
        color: 0xBA55D3,
        transparent: true,
        opacity: 0.6 // Subtler edges
      })
    );
    dodeca.add(dodecaLines);

    objects.push({ mesh: dodeca, speed: 0.025, followStrength: 0.13, basePos: { x: 4, y: -4, z: 0 }, baseOpacity: 0.5, baseEmissiveIntensity: 0.3 });

    objectsRef.current = objects;

    // Mouse move handler
    const handleMouseMove = (event) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    // Resize handler
    const handleResize = () => {
      if (!camera || !renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    // Animation loop with enhanced interactivity and subtle effects
    const animate = () => {
      requestAnimationFrame(animate);

      const time = Date.now() * 0.001;
      const mouse = mouseRef.current;

      objectsRef.current.forEach((obj, index) => {
        const { mesh, speed, followStrength, basePos, baseOpacity, baseEmissiveIntensity } = obj;

        // Subtle floating animation
        const floatY = Math.sin(time * speed * 2 + index * 0.5) * 0.2; // Reduced float
        const floatX = Math.cos(time * speed * 1.5 + index * 0.3) * 0.15; // Reduced float

        // Fast cursor following (Spline-style)
        const mouseInfluence = 5; // Moderate influence range
        const targetX = basePos.x + (mouse.x * mouseInfluence) * followStrength;
        const targetY = basePos.y + (mouse.y * mouseInfluence) * followStrength;
        const targetZ = basePos.z + (mouse.x * mouseInfluence * 0.5) * followStrength;

        // Smooth interpolation with faster response
        const lerpSpeed = 0.08;
        mesh.position.x += (targetX + floatX - mesh.position.x) * lerpSpeed;
        mesh.position.y += (targetY + floatY - mesh.position.y) * lerpSpeed;
        mesh.position.z += (targetZ - mesh.position.z) * lerpSpeed;

        // Enhanced rotation with mouse influence
        mesh.rotation.x += speed * 0.8 + mouse.y * 0.008; // Subtler mouse rotation
        mesh.rotation.y += speed * 0.6 + mouse.x * 0.008; // Subtler mouse rotation
        mesh.rotation.z += speed * 0.4;

        // Pulsing effect based on mouse proximity (more subtle)
        const distance = Math.sqrt(
          Math.pow(mouse.x * 5, 2) + Math.pow(mouse.y * 5, 2)
        );
        const scale = 1 + (1 - Math.min(distance / 5, 1)) * 0.1; // Reduced pulse intensity
        mesh.scale.setScalar(scale);

        // Dynamic opacity and glow based on mouse distance (more subtle)
        if (mesh.material.opacity !== undefined) {
          const targetOpacity = baseOpacity + (1 - Math.min(distance / 3, 1)) * 0.1; // Reduced change
          mesh.material.opacity = Math.min(1.0, Math.max(0.2, targetOpacity)); // Clamp values
        }

        if (mesh.material.emissiveIntensity !== undefined) {
          const glowIntensity = baseEmissiveIntensity + (1 - Math.min(distance / 4, 1)) * 0.4; // Reduced change
          mesh.material.emissiveIntensity = Math.min(1.0, Math.max(0.0, glowIntensity)); // Clamp values
        }

        // Animate transmission for glass effect
        if (mesh.material.transmission !== undefined) {
          const baseTransmission = obj.transmission || mesh.material.transmission; // Store initial
          const targetTransmission = baseTransmission + Math.sin(time * 2 + index) * 0.05; // Smaller flicker
          mesh.material.transmission = Math.max(0.2, targetTransmission);
        }

        // Animate clearcoat for dynamic reflections
        if (mesh.material.clearcoat !== undefined) {
          const baseClearcoat = obj.clearcoat || mesh.material.clearcoat; // Store initial
          const targetClearcoat = baseClearcoat + Math.sin(time * 1.5 + index) * 0.1; // Smaller flicker
          mesh.material.clearcoat = Math.max(0.5, targetClearcoat);
        }
      });

      // Dynamic camera movement
      camera.position.x += (mouse.x * 0.3 - camera.position.x) * 0.02; // Slightly reduced camera movement
      camera.position.y += (mouse.y * 0.3 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      // Render
      renderer.render(scene, camera);
    };

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Start animation
    animate();
    setIsLoaded(true);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }

      // Dispose of Three.js objects
      objectsRef.current.forEach(obj => {
        if (obj.mesh.geometry) obj.mesh.geometry.dispose();
        if (obj.mesh.material) obj.mesh.material.dispose();
      });

      if (renderer) {
        renderer.dispose();
      }
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-32 px-6 overflow-hidden">
      {/* Dark Abstract Background (Ensure this image is dark and subtle) */}
      <div
        className="absolute inset-0 scale-110"
        style={{
          backgroundImage: 'url("/images/abstract-digital.jpg")', // Ensure this image is dark and abstract
          backgroundSize: 'cover', // Use cover for better responsiveness
          backgroundPosition: 'center',
          filter: 'brightness(0.7) contrast(1.1)' // Slightly darken and add contrast if image is too bright
        }}
      />

      {/* Modern Gradient Overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/20 to-black/80" />  */}

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
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-display">50+</div>
              <div className="text-xs sm:text-sm text-gray-400">Projects Delivered</div>
            </div>
            <div className="text-center backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-display">100%</div>
              <div className="text-xs sm:text-sm text-gray-400">Client Satisfaction</div>
            </div>
            <div className="text-center backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-display">24/7</div>
              <div className="text-xs sm:text-sm text-gray-400">AI Support</div>
            </div>
          </motion.div>

          {/* Enhanced CTA Buttons - kept as is, they look great */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button
              className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:shadow-xl transition-all duration-300 tracking-wide backdrop-blur-sm"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(147, 51, 234, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Our Services
            </motion.button>

            <motion.button
              className="w-full sm:w-auto border-2 border-white/60 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </motion.button>
          </motion.div>

          {/* Removed the 'Trusted by...' line for cleaner hero section */}
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
      <div className="relative">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* Left Side - Scrolling Text Content */}
            <div className="space-y-8 lg:space-y-32">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className="space-y-6 lg:space-y-8 py-8 lg:py-16 lg:min-h-screen lg:flex lg:flex-col lg:justify-center"
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

                  {/* Mobile Image - Show on small screens */}
                  <div className="lg:hidden mb-6">
                    <div className="relative rounded-2xl overflow-hidden shadow-xl">
                      <img
                        src={service.image || "/placeholder.svg"}
                        alt={service.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      
                      {/* Mobile Overlay Content */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center">
                          <div
                            className={`w-10 h-10 bg-gradient-to-r ${service.gradient} rounded-lg flex items-center justify-center mr-3`}
                          >
                            <span className="text-lg">{service.icon}</span>
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-white">{index == 6 ? "" : service.title}</h4>
                            <div className="h-0.5 w-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mt-1"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Service Title */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
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

                  {/* Service Description */}
                  <motion.p
                    className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-6 lg:mb-8 max-w-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    {service.description}
                  </motion.p>

                  {/* Features List */}
                  <motion.div
                    className="space-y-3 lg:space-y-4"
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
                        <span className="text-base lg:text-lg">{feature}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Right Side - Sticky Image Container (Desktop Only) */}
            <div className="hidden lg:block sticky top-24 h-[calc(100vh-6rem)] flex items-center justify-center">
              <div className="relative w-full max-w-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`image-${activeService}`}
                    className="relative"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
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

        {/* Bottom spacing */}
        <div className="pb-20"></div>
      </div>
    </section>
  );
};

// About Us Component - Fixed for responsive layout
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
    <section id="about" className="py-20 px-6 bg-black text-white overflow-x-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-full"
          >
            <p className="text-accent text-emerald-400 mb-4 text-sm sm:text-base">WHO WE ARE</p>
            
            <h2 className="section-title mb-6 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              About <span className="gradient-text">X-Web Labs</span>
            </h2>
            
            <p className="section-subtitle text-gray-300 mb-6 text-base sm:text-lg leading-relaxed">
              We are a cutting-edge AI automation agency dedicated to transforming businesses through intelligent technology solutions.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0"></div>
                <span className="text-gray-300 text-sm sm:text-base">Founded with a vision to democratize AI technology</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-teal-400 rounded-full flex-shrink-0"></div>
                <span className="text-gray-300 text-sm sm:text-base">50+ successful projects delivered</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></div>
                <span className="text-gray-300 text-sm sm:text-base">Trusted by enterprises worldwide</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            className="relative max-w-full"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 p-6 sm:p-8 rounded-2xl backdrop-blur-sm border border-gray-700">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-white font-display">Our Mission</h3>
              <p className="text-gray-300 mb-6 font-body text-sm sm:text-base leading-relaxed">
                To empower businesses with intelligent automation solutions that enhance productivity, drive innovation, and create sustainable competitive advantages.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-emerald-400 font-display">50+</div>
                  <div className="text-xs sm:text-sm text-gray-400">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-teal-400 font-display">100%</div>
                  <div className="text-xs sm:text-sm text-gray-400">Client Satisfaction</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Team Section */}
        <motion.div
          className="text-center mb-12 max-w-full"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-accent text-emerald-400 mb-4 text-sm sm:text-base">OUR TEAM</p>
          <h3 className="text-3xl sm:text-4xl font-bold mb-4 font-display">Meet Our Expert Team</h3>
          <p className="section-subtitle text-gray-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Passionate innovators dedicated to transforming your business with AI
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 p-6 rounded-xl backdrop-blur-sm border border-gray-700 hover:border-emerald-500 transition-all duration-300 group max-w-full"
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
              <h4 className="text-lg sm:text-xl font-semibold text-white mb-2 text-center font-display break-words">{member.name}</h4>
              <p className="text-accent text-emerald-400 text-center mb-3 text-sm sm:text-base">{member.role}</p>
              <p className="text-gray-300 text-center text-xs sm:text-sm leading-relaxed">{member.bio}</p>
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

// Data Section Component - Fixed for responsive layout
export const DataSection = () => {
  return (
    <section className="py-20 px-6 bg-black text-white overflow-x-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-full"
          >
            <p className="text-accent text-emerald-400 mb-4 text-sm sm:text-base">DATA INTELLIGENCE</p>
            
            <h2 className="section-title mb-8 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Do more with
              <br />
              <span className="gradient-text break-words">
                more of your data.
              </span>
            </h2>
            
            <p className="section-subtitle text-gray-300 mb-8 text-base sm:text-lg leading-relaxed">
              Transform raw data into actionable insights with our AI-powered analytics platform.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0"></div>
                <span className="text-gray-300 text-sm sm:text-base">Real-time Data Processing</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-teal-400 rounded-full flex-shrink-0"></div>
                <span className="text-gray-300 text-sm sm:text-base">Advanced Analytics & Insights</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></div>
                <span className="text-gray-300 text-sm sm:text-base">Predictive Intelligence</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            className="relative max-w-full"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1601132359864-c974e79890ac?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwyfHxBSSUyMHRlY2hub2xvZ3l8ZW58MHx8fGJsdWV8MTc1MjYzNDc2NXww&ixlib=rb-4.1.0&q=85"
                alt="AI Business Intelligence" 
                className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-2xl max-w-full"
              />
              <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-2 rounded-lg shadow-lg max-w-[calc(100%-2rem)]">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                  <span className="text-xs sm:text-sm break-words">AI analyzing customer behavior patterns</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Actions Section Component - Fixed for responsive layout
export const ActionsSection = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-gray-100 text-black overflow-x-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-full"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
              <div className="w-3 h-3 bg-teal-600 rounded-full"></div>
            </div>
            
            <h2 className="section-title mb-6 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight break-words">
              Turn data into action.
            </h2>
            
            <p className="section-subtitle text-gray-700 mb-8 text-base sm:text-lg leading-relaxed">
              Transform your business with intelligent automation solutions that deliver measurable results.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-emerald-600 rounded-full flex-shrink-0"></div>
                <span className="text-gray-700 text-sm sm:text-base">AI-Powered Business Intelligence</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-teal-600 rounded-full flex-shrink-0"></div>
                <span className="text-gray-700 text-sm sm:text-base">Real-time Data Processing</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-600 rounded-full flex-shrink-0"></div>
                <span className="text-gray-700 text-sm sm:text-base">Automated Workflow Systems</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-pink-600 rounded-full flex-shrink-0"></div>
                <span className="text-gray-700 text-sm sm:text-base">Advanced SEO Analytics</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            className="relative max-w-full"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl max-w-full">
              <div className="space-y-6">
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold font-mono">AI</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-gray-900 font-display text-sm sm:text-base">AI Agent Analysis</div>
                    <div className="text-xs sm:text-sm text-gray-600">Processing customer data...</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">📊</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-gray-900 font-display text-sm sm:text-base">Generate SEO insights</div>
                    <div className="text-xs sm:text-sm text-gray-600">Optimization recommendations active</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">🔄</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-gray-900 font-display text-sm sm:text-base">Automate workflow systems</div>
                    <div className="text-xs sm:text-sm text-gray-600">Cross-platform integration</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">📈</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-gray-900 font-display text-sm sm:text-base">Deploy AI website features</div>
                    <div className="text-xs sm:text-sm text-gray-600">Enhanced user experience</div>
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
                <span className="text-emerald-400 font-mono">PHONE:</span> +61 450 803 578 | +263 777 350 003 | +263 785 401 678
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