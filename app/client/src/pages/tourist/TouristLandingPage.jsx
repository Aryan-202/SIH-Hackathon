import React, { useEffect, useRef, useState } from 'react';
import { UserPlus, ShieldCheck, Zap, Globe, Lock, Bell, MapPin, CheckSquare, Briefcase, Sun, Share2 } from 'lucide-react';

const TouristLandingPage = () => {
  const heroRef = useRef(null);
  const trustRef = useRef(null);
  const tipsRef = useRef(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const [trustVisible, setTrustVisible] = useState(false);
  const [tipsVisible, setTipsVisible] = useState(false);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2,
    };

    const createObserver = (ref, setVisible) => {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      }, observerOptions);

      if (ref.current) {
        observer.observe(ref.current);
      }
      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      };
    };

    const cleanupHero = createObserver(heroRef, setHeroVisible);
    const cleanupTrust = createObserver(trustRef, setTrustVisible);
    const cleanupTips = createObserver(tipsRef, setTipsVisible);

    return () => {
      cleanupHero();
      cleanupTrust();
      cleanupTips();
    };
  }, []);

  const handleNavigateToRegister = () => {
    // This is a placeholder for your navigation logic.
    // In your actual app, you would use a router, e.g., navigate('/register');
    console.log('Navigating to the registration page...');
  };

  return (
    <div className="min-h-screen bg-gray-100 font-inter text-gray-800 flex flex-col items-center">
      {/* Hero Section */}
      <section ref={heroRef} className={`w-full max-w-7xl mx-auto flex flex-col items-center justify-center text-center py-24 px-4 md:px-8 transition-opacity duration-1000 ${heroVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="bg-blue-600 p-12 md:p-16 rounded-3xl text-white shadow-xl animate-scale-in">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 animate-fade-in-up">
            Travel Securely, Explore Freely
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 animate-fade-in-up animate-delay-200">
            Our Smart Tourist Safety System offers a Digital ID, AI-powered monitoring, and a rapid emergency response network to keep you safe on your journey.
          </p>
          <button
            onClick={handleNavigateToRegister}
            className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-200 transition-transform transform hover:scale-105 flex items-center justify-center space-x-2 mx-auto animate-scale-in animate-delay-300"
          >
            <UserPlus size={20} />
            <span>Get Your Digital Tourist ID</span>
          </button>
        </div>
      </section>

      {/* Why Trust Us Section */}
      <section ref={trustRef} className={`w-full max-w-7xl mx-auto py-16 px-4 md:px-8 transition-all duration-1000 transform ${trustVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Why Trust Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-lg transition-transform hover:scale-105 duration-300 text-center">
            <div className="flex justify-center mb-4">
              <Lock size={48} className="text-blue-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Privacy-First Design</h3>
            <p className="text-gray-600">
              Your data is secure and under your control. Our system is built with a privacy-first philosophy, using a secure, blockchain-backed digital ID.
            </p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-lg transition-transform hover:scale-105 duration-300 text-center">
            <div className="flex justify-center mb-4">
              <ShieldCheck size={48} className="text-blue-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Government-Aligned</h3>
            <p className="text-gray-600">
              We work in partnership with local authorities to ensure a coordinated and rapid emergency response, making your safety a shared priority.
            </p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-lg transition-transform hover:scale-105 duration-300 text-center">
            <div className="flex justify-center mb-4">
              <Zap size={48} className="text-blue-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Faster Response</h3>
            <p className="text-gray-600">
              Our system uses AI monitoring and a real-time alert feed to connect you to help faster than ever before.
            </p>
          </div>
        </div>
      </section>

      {/* Travel Tips Section */}
      <section ref={tipsRef} className={`w-full max-w-7xl mx-auto py-16 px-4 md:px-8 transition-all duration-1000 transform ${tipsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Travel Tips for a Safe Journey</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center text-center">
            <CheckSquare size={40} className="text-green-500 mb-4" />
            <h4 className="font-semibold mb-2">Do Your Research</h4>
            <p className="text-sm text-gray-600">
              Familiarize yourself with local laws, customs, and emergency procedures before you go.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center text-center">
            <Briefcase size={40} className="text-yellow-500 mb-4" />
            <h4 className="font-semibold mb-2">Secure Your Valuables</h4>
            <p className="text-sm text-gray-600">
              Keep your passport, money, and other important documents in a secure place.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center text-center">
            <Sun size={40} className="text-red-500 mb-4" />
            <h4 className="font-semibold mb-2">Stay Aware</h4>
            <p className="text-sm text-gray-600">
              Be mindful of your surroundings, especially in crowded or unfamiliar areas.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center text-center">
            <Share2 size={40} className="text-purple-500 mb-4" />
            <h4 className="font-semibold mb-2">Share Your Itinerary</h4>
            <p className="text-sm text-gray-600">
              Inform a trusted friend or family member of your travel plans and updates.
            </p>
          </div>
        </div>
      </section>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
        body {
          font-family: 'Inter', sans-serif;
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
        .animate-delay-200 { animation-delay: 0.2s; }
        .animate-delay-300 { animation-delay: 0.3s; }
      `}</style>
    </div>
  );
};

export default TouristLandingPage;
