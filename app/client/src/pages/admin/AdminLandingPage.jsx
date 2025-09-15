import React, { useEffect, useRef, useState } from 'react';
import { LogIn, MapPin, BellRing, Users, FileText, CheckCircle, ShieldPlus, Search } from 'lucide-react';

const AdminLandingPage = () => {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const howItWorksRef = useRef(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const [featuresVisible, setFeaturesVisible] = useState(false);
  const [howItWorksVisible, setHowItWorksVisible] = useState(false);

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
    const cleanupFeatures = createObserver(featuresRef, setFeaturesVisible);
    const cleanupHowItWorks = createObserver(howItWorksRef, setHowItWorksVisible);

    return () => {
      cleanupHero();
      cleanupFeatures();
      cleanupHowItWorks();
    };
  }, []);

  const handleNavigateToDashboard = () => {
    // This is a placeholder for your navigation logic.
    // In your actual app, you would use a router, e.g., navigate('/admin-dashboard');
    console.log('Navigating to the admin dashboard...');
  };

  return (
    <div className="min-h-screen bg-gray-900 font-inter text-gray-100 flex flex-col items-center">
      {/* Hero Section */}
      <section ref={heroRef} className={`w-full max-w-7xl mx-auto flex flex-col items-center justify-center text-center py-24 px-4 md:px-8 transition-opacity duration-1000 ${heroVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="bg-gray-800 p-12 md:p-16 rounded-3xl text-white shadow-xl animate-scale-in">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 animate-fade-in-up">
            Securely Monitor, Swiftly Respond
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-gray-300 animate-fade-in-up animate-delay-200">
            The all-in-one dashboard for tourist safety and management. Our platform provides authorities with real-time data and tools to ensure public safety.
          </p>
          <button
            onClick={handleNavigateToDashboard}
            className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105 flex items-center justify-center space-x-2 mx-auto animate-scale-in animate-delay-300"
          >
            <LogIn size={20} />
            <span>Access Dashboard</span>
          </button>
        </div>
      </section>

      {/* Core Capabilities Section */}
      <section ref={featuresRef} className={`w-full max-w-7xl mx-auto py-16 px-4 md:px-8 transition-all duration-1000 transform ${featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-4xl font-bold text-center text-gray-50 mb-12">Core Capabilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-gray-800 p-8 rounded-3xl shadow-lg transition-transform hover:scale-105 duration-300">
            <div className="flex justify-center mb-4">
              <MapPin size={48} className="text-blue-500" />
            </div>
            <h3 className="text-xl font-bold text-center mb-2 text-gray-100">Live Monitoring</h3>
            <p className="text-center text-gray-400">
              Visualize real-time locations and safety statuses of all registered tourists on a dynamic map.
            </p>
          </div>
          <div className="bg-gray-800 p-8 rounded-3xl shadow-lg transition-transform hover:scale-105 duration-300">
            <div className="flex justify-center mb-4">
              <BellRing size={48} className="text-blue-500" />
            </div>
            <h3 className="text-xl font-bold text-center mb-2 text-gray-100">Real-time Alerts</h3>
            <p className="text-center text-gray-400">
              Receive instant notifications for panic button activations and AI-detected anomalies in your area.
            </p>
          </div>
          <div className="bg-gray-800 p-8 rounded-3xl shadow-lg transition-transform hover:scale-105 duration-300">
            <div className="flex justify-center mb-4">
              <Users size={48} className="text-blue-500" />
            </div>
            <h3 className="text-xl font-bold text-center mb-2 text-gray-100">Tourist Management</h3>
            <p className="text-center text-gray-400">
              Search and view details of tourists, including registration info and emergency contacts, for swift action.
            </p>
          </div>
          <div className="bg-gray-800 p-8 rounded-3xl shadow-lg transition-transform hover:scale-105 duration-300">
            <div className="flex justify-center mb-4">
              <FileText size={48} className="text-blue-500" />
            </div>
            <h3 className="text-xl font-bold text-center mb-2 text-gray-100">Incident Reporting</h3>
            <p className="text-center text-gray-400">
              Effortlessly generate e-FIRs and digital reports from incident data with a single click.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works for Authorities Section */}
      <section ref={howItWorksRef} className={`w-full max-w-7xl mx-auto py-16 px-4 md:px-8 transition-all duration-1000 transform ${howItWorksVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-4xl font-bold text-center text-gray-50 mb-12">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-center space-y-8 md:space-y-0 md:space-x-8">
          <div className="bg-gray-800 p-8 rounded-3xl shadow-lg text-center flex-1 transition-transform hover:scale-105 duration-300">
            <div className="flex justify-center mb-4 text-blue-500">
              <ShieldPlus size={48} />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-gray-100">1. Receive Alert</h3>
            <p className="text-gray-400">Alerts are instantly sent to your dashboard from a tourist's panic button or AI detection.</p>
          </div>
          <div className="bg-gray-800 p-8 rounded-3xl shadow-lg text-center flex-1 transition-transform hover:scale-105 duration-300">
            <div className="flex justify-center mb-4 text-blue-500">
              <Search size={48} />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-gray-100">2. Locate & Assess</h3>
            <p className="text-gray-400">View the tourist's last known location and safety status on a live map for immediate assessment.</p>
          </div>
          <div className="bg-gray-800 p-8 rounded-3xl shadow-lg text-center flex-1 transition-transform hover:scale-105 duration-300">
            <div className="flex justify-center mb-4 text-blue-500">
              <CheckCircle size={48} />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-gray-100">3. Respond & Report</h3>
            <p className="text-gray-400">Dispatch a response team and generate official reports with a single click for efficient follow-up.</p>
          </div>
        </div>
      </section>

      {/* Trust & Reliability Section */}
      <section className="w-full max-w-7xl mx-auto text-center py-16 px-4 md:px-8">
        <div className="bg-gray-800 p-12 rounded-3xl shadow-xl">
          <h2 className="text-3xl font-bold text-gray-50 mb-4">Built for Trust and Efficiency</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Our system is built on secure, verifiable technology that provides you with a reliable and accurate source of information, empowering you to make a difference.
          </p>
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

export default AdminLandingPage;
