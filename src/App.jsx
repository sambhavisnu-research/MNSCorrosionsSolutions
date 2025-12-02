import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhoWeAre from './components/WhoWeAre';
import WhyChooseUs from './components/WhyChooseUs';
import Products from './components/Products';
import TechnicalData from './components/TechnicalData';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';

function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Navbar />
      <main>
        <Hero />
        <WhoWeAre />
        <WhyChooseUs />
        <Products />
        <TechnicalData />
        <Testimonials />
        <Contact />
      </main>
      <footer className="bg-gray-900 text-gray-400 py-8 text-center border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} MNS Corrosions Solutions. All rights reserved.</p>
          <p className="text-sm mt-2">Designed for Excellence.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
