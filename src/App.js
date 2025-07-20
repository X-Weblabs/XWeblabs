import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import {
  Header,
  Hero,
  ClientLogos,
  Services,
  AboutUs,
  // ProjectsDone,
  DataSection,
  ActionsSection,
  Footer,
  Chatbot
} from './components';


// Loading Screen Component
const LoadingScreen = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3500); // 3.5 seconds loading time

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
    >
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large abstract shapes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`shape-${i}`}
            className="absolute rounded-full opacity-10"
            style={{
              width: `${Math.random() * 400 + 200}px`,
              height: `${Math.random() * 400 + 200}px`,
              background: `linear-gradient(${Math.random() * 360}deg, #1a1a1a, #333333)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: 'translate(-50%, -50%)',
            }}
            animate={{
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}

        {/* Geometric lines */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute bg-gradient-to-r from-transparent via-gray-700 to-transparent opacity-20"
            style={{
              width: `${Math.random() * 600 + 200}px`,
              height: '1px',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 180}deg)`,
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scaleX: [0.5, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 8 + 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Subtle floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-gray-600 rounded-full opacity-30"
            initial={{
              x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 800,
              y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 600,
              opacity: 0
            }}
            animate={{
              x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 800,
              y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 600,
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Logo Container */}
      <div className="relative z-10">
        {/* Main Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          {/* Subtle Glow Effect Background - Reduced intensity */}
          <motion.div
            className="absolute inset-0 blur-lg opacity-30"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              background: `
                linear-gradient(45deg, 
                  rgba(64, 224, 208, 0.2) 0%, 
                  rgba(138, 43, 226, 0.2) 50%, 
                  rgba(255, 20, 147, 0.2) 100%
                )
              `,
              borderRadius: '20px',
              width: '300px',
              height: '120px',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          />
          
          {/* Logo Image with Reduced Glow Effects */}
          <motion.div
            className="relative z-10 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          >
            {/* Reduced Glow Layers */}
            <div className="absolute inset-0">
              {/* Outer glow - much more subtle */}
              <motion.div
                className="absolute inset-0 rounded-xl opacity-20"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.1, 0.25, 0.1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  background: 'radial-gradient(ellipse, rgba(64, 224, 208, 0.15) 0%, rgba(138, 43, 226, 0.1) 50%, rgba(255, 20, 147, 0.08) 100%)',
                  filter: 'blur(15px)',
                  transform: 'scale(1.1)'
                }}
              />
              
              {/* Inner glow - very subtle */}
              <motion.div
                className="absolute inset-0 rounded-lg opacity-30"
                animate={{
                  scale: [0.95, 1.02, 0.95],
                  opacity: [0.2, 0.35, 0.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                style={{
                  background: 'linear-gradient(45deg, rgba(64, 224, 208, 0.1), rgba(138, 43, 226, 0.15), rgba(255, 20, 147, 0.1))',
                  filter: 'blur(8px)'
                }}
              />
            </div>
            
            {/* Main Logo Image with Reduced Drop Shadow */}
            <motion.img
              src="/images/logo.png" // Update this path to match your image filename
              alt="X-WEB LABS Logo"
              className="relative z-10 max-w-sm h-auto"
              style={{
                filter: 'drop-shadow(0 0 8px rgba(64, 224, 208, 0.3)) drop-shadow(0 0 16px rgba(138, 43, 226, 0.2))',
                maxWidth: '300px',
                height: 'auto'
              }}
              initial={{ 
                opacity: 0, 
                y: 20,
                filter: 'drop-shadow(0 0 0px rgba(64, 224, 208, 0)) drop-shadow(0 0 0px rgba(138, 43, 226, 0))'
              }}
              animate={{ 
                opacity: 1, 
                y: 0,
                filter: 'drop-shadow(0 0 8px rgba(64, 224, 208, 0.3)) drop-shadow(0 0 16px rgba(138, 43, 226, 0.2))'
              }}
              transition={{ 
                duration: 2, 
                delay: 0.8,
                ease: "easeOut"
              }}
              whileInView={{
                filter: [
                  'drop-shadow(0 0 8px rgba(64, 224, 208, 0.3)) drop-shadow(0 0 16px rgba(138, 43, 226, 0.2))',
                  'drop-shadow(0 0 12px rgba(64, 224, 208, 0.4)) drop-shadow(0 0 20px rgba(138, 43, 226, 0.3))',
                  'drop-shadow(0 0 8px rgba(64, 224, 208, 0.3)) drop-shadow(0 0 16px rgba(138, 43, 226, 0.2))'
                ]
              }}
            />
          </motion.div>
        </motion.div>

        {/* Loading Animation */}
        <motion.div
          className="mt-12 text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          {/* Loading Dots */}
          <motion.div className="flex justify-center space-x-2 mb-4">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 rounded-full"
                style={{
                  background: 'linear-gradient(45deg, #40E0D0, #8A2BE2)'
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
          
          {/* Loading Text */}
          <motion.p
            className="text-gray-300 text-lg font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.7, 1] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            Loading Your Digital Experience...
          </motion.p>
        </motion.div>
      </div>
      
      {/* Progress Bar */}
      <motion.div
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-gray-800 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
};

const Home = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative z-10">
        <Header />
        <Hero />
        <Services />
        <AboutUs />
        <ClientLogos />
        <DataSection />
        <ActionsSection />
        <Footer />

        {/* Chatbot */}
        <AnimatePresence>
          {showChatbot && (
            <Chatbot onClose={() => setShowChatbot(false)} />
          )}
        </AnimatePresence>

        {/* Chatbot Toggle Button */}
        <motion.button
          className="fixed bottom-8 right-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowChatbot(!showChatbot)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </motion.button>
      </div>
    </div>
  );
};

function App() {
  const [loading, setLoading] = useState(true);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
        ) : (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </BrowserRouter>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;