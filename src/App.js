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

const Home = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative z-10">
        <Header />
        <Hero />
        <ClientLogos />
        <Services />
        <AboutUs />
        {/* <ProjectsDone /> */}
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
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;