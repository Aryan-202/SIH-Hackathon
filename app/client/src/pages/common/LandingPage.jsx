import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../../components/UI/Navbar'; // Adjust path if necessary
import { ShieldCheck, UserPlus, Info, MapPin, QrCode, HardHat, PhoneCall, Globe, TrendingUp } from 'lucide-react';

const LandingPage = () => {
  const featuresRef = useRef(null);
  const howItWorksRef = useRef(null);
  const [featuresVisible, setFeaturesVisible] = useState(false);
  const [howItWorksVisible, setHowItWorksVisible] = useState(false);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2, // Trigger when 20% of the element is visible
    };

    const featuresObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setFeaturesVisible(true);
      }
    }, observerOptions);

    const howItWorksObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setHowItWorksVisible(true);
      }
    }, observerOptions);

    if (featuresRef.current) {
      featuresObserver.observe(featuresRef.current);
    }
    if (howItWorksRef.current) {
      howItWorksObserver.observe(howItWorksRef.current);
    }

    return () => {
      if (featuresRef.current) featuresObserver.unobserve(featuresRef.current);
      if (howItWorksRef.current) howItWorksObserver.unobserve(howItWorksRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 font-inter text-gray-800 flex flex-col">
      <Navbar/>
      {/* Hero Section */}
      <div className="flex-grow flex items-center justify-center pt-24 pb-8 md:pt-32 p-4">
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Main Content & CTA */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4 animate-fade-in-up">
              Smart Tourist Safety System
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-2xl mb-8 animate-fade-in-up animate-delay-200">
              Your safety is our priority. Digital ID + AI monitoring + faster emergency response.
            </p>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 justify-center lg:justify-start">
              <button 
                onClick={() => console.log('Register as Tourist clicked')}
                className="btn-primary animate-scale-in"
              >
                <UserPlus className="w-5 h-5 mr-2" />
                Register as Tourist
              </button>
              <button 
                onClick={() => console.log('Learn More clicked')}
                className="btn-secondary animate-scale-in animate-delay-100"
              >
                <Info className="w-5 h-5 mr-2" />
                Learn More
              </button>
            </div>
            
            {/* Trust-building Section */}
            <div className="mt-16 w-full max-w-lg mx-auto lg:mx-0 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <ShieldCheck className="w-10 h-10 text-blue-500 mb-2" />
                <span className="font-semibold text-sm md:text-base">Blockchain-backed</span>
              </div>
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <ShieldCheck className="w-10 h-10 text-blue-500 mb-2" />
                <span className="font-semibold text-sm md:text-base">Privacy-first</span>
              </div>
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <ShieldCheck className="w-10 h-10 text-blue-500 mb-2" />
                <span className="font-semibold text-sm md:text-base">Govt aligned</span>
              </div>
            </div>
          </div>
          
          {/* Visuals / Mockup */}
          <div className="relative w-full aspect-square animate-fade-in-up animate-delay-300 hidden lg:block">
            <div className="absolute inset-0 bg-gray-200 rounded-3xl shadow-xl flex items-center justify-center p-8">
                <div className="w-3/4 h-3/4 bg-white rounded-2xl shadow-inner p-4 flex flex-col items-center justify-center space-y-4">
                  <div className="flex items-center space-x-2">
                    <QrCode className="w-16 h-16 text-gray-500" />
                    <div className="text-center">
                      <span className="block text-sm text-gray-500">Digital Tourist ID</span>
                      <span className="block font-mono text-xs text-gray-400">#4a1e9c7b</span>
                    </div>
                  </div>
                  <div className="bg-green-100 text-green-800 font-semibold px-3 py-1 rounded-full text-sm">
                    Safety Status: Safe
                  </div>
                  <div className="relative w-full h-32 bg-gray-100 rounded-lg shadow-inner">
                    <MapPin className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-500 w-8 h-8" />
                    <span className="absolute bottom-2 left-2 text-xs text-gray-400">Mock Map</span>
                  </div>
                </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Features Section */}
      <div ref={featuresRef} className={`py-20 p-4 transition-all duration-1000 transform ${featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature-card">
              <HardHat className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Real-time Monitoring</h3>
              <p className="text-gray-600">AI-powered algorithms constantly analyze your surroundings to detect potential threats and anomalies.</p>
            </div>
            <div className="feature-card">
              <PhoneCall className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">One-Click SOS</h3>
              <p className="text-gray-600">Instantly alert emergency services and your contacts with a single tap, providing your location.</p>
            </div>
            <div className="feature-card">
              <Globe className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Multilingual Support</h3>
              <p className="text-gray-600">Access vital information and communicate with authorities in multiple languages.</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div ref={howItWorksRef} className={`py-20 p-4 bg-gray-200 transition-all duration-1000 transform ${howItWorksVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="step-card">
              <span className="step-number">1</span>
              <h3 className="text-xl font-bold mb-2">Register</h3>
              <p className="text-gray-600">Create your digital ID and set up your emergency contacts and details.</p>
            </div>
            <div className="step-card">
              <span className="step-number">2</span>
              <h3 className="text-xl font-bold mb-2">Explore Safely</h3>
              <p className="text-gray-600">Your status is monitored in real-time, providing peace of mind as you travel.</p>
            </div>
            <div className="step-card">
              <span className="step-number">3</span>
              <h3 className="text-xl font-bold mb-2">Get Help</h3>
              <p className="text-gray-600">In an emergency, your location and ID are shared with authorities for a fast response.</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
        body {
          font-family: 'Inter', sans-serif;
        }
        .btn-primary {
          @apply bg-blue-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-blue-600 transition transform hover:scale-105 flex items-center justify-center;
        }
        .btn-secondary {
          @apply bg-gray-200 text-gray-800 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-300 transition transform hover:scale-105 flex items-center justify-center;
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .animate-scale-in { animation: scale-in 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        .animate-delay-100 { animation-delay: 0.1s; }
        .animate-delay-200 { animation-delay: 0.2s; }
        .animate-delay-300 { animation-delay: 0.3s; }
        
        .feature-card, .step-card {
          @apply bg-white p-8 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105;
        }

        .step-card {
          @apply relative pt-12;
        }
        .step-number {
          @apply absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;