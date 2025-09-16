import React, { useEffect, useRef, useState } from 'react';
import { ShieldCheck, Eye, Heart, User, UserPlus, MapPin, Bell, Zap } from 'lucide-react';

const About = () => {
  const pillarsRef = useRef(null);
  const teamRef = useRef(null);
  const howItWorksRef = useRef(null);
  const [pillarsVisible, setPillarsVisible] = useState(false);
  const [teamVisible, setTeamVisible] = useState(false);
  const [howItWorksVisible, setHowItWorksVisible] = useState(false);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2, // Trigger when 20% of the element is visible
    };

    const pillarsObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setPillarsVisible(true);
      }
    }, observerOptions);

    const teamObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTeamVisible(true);
      }
    }, observerOptions);

    const howItWorksObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setHowItWorksVisible(true);
      }
    }, observerOptions);

    if (pillarsRef.current) {
      pillarsObserver.observe(pillarsRef.current);
    }
    if (teamRef.current) {
      teamObserver.observe(teamRef.current);
    }
    if (howItWorksRef.current) {
      howItWorksObserver.observe(howItWorksRef.current);
    }

    return () => {
      if (pillarsRef.current) pillarsObserver.unobserve(pillarsRef.current);
      if (teamRef.current) teamObserver.unobserve(teamRef.current);
      if (howItWorksRef.current) howItWorksObserver.unobserve(howItWorksRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 font-inter text-gray-800 flex flex-col items-center">
      {/* Container for content with consistent padding and max width */}
      <div className="w-full max-w-6xl mx-auto py-24 px-4 md:px-8">
        
        {/* About Section */}
        <section className="bg-white p-8 md:p-12 rounded-3xl shadow-xl text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            About the Smart Tourist Safety System
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Our mission is to empower tourists and protect communities through innovative, privacy-first technology. We believe that technology should serve humanity, creating safer and more connected travel experiences for everyone.
          </p>
        </section>

        {/* How It Works Section */}
        <section ref={howItWorksRef} className={`mb-16 transition-all duration-1000 transform ${howItWorksVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-8 rounded-2xl shadow-lg bg-white text-center transition-transform hover:scale-105 duration-300">
              <div className="flex justify-center mb-4">
                <UserPlus className="w-12 h-12 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">1. Register</h3>
              <p className="text-sm text-gray-600">
                Tourists register with a digital ID, providing emergency contacts and dates of stay.
              </p>
            </div>
            <div className="p-8 rounded-2xl shadow-lg bg-white text-center transition-transform hover:scale-105 duration-300 animate-delay-200">
              <div className="flex justify-center mb-4">
                <MapPin className="w-12 h-12 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">2. Monitor</h3>
              <p className="text-sm text-gray-600">
                The system uses AI to monitor location and flag potential safety anomalies.
              </p>
            </div>
            <div className="p-8 rounded-2xl shadow-lg bg-white text-center transition-transform hover:scale-105 duration-300 animate-delay-400">
              <div className="flex justify-center mb-4">
                <Bell className="w-12 h-12 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">3. Alert</h3>
              <p className="text-sm text-gray-600">
                If an anomaly or a panic button is triggered, an instant alert is sent to authorities.
              </p>
            </div>
            <div className="p-8 rounded-2xl shadow-lg bg-white text-center transition-transform hover:scale-105 duration-300 animate-delay-600">
              <div className="flex justify-center mb-4">
                <Zap className="w-12 h-12 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">4. Respond</h3>
              <p className="text-sm text-gray-600">
                Authorities receive real-time data and can respond with greater speed and precision.
              </p>
            </div>
          </div>
        </section>

        {/* Core Pillars Section with animation */}
        <section ref={pillarsRef} className={`mb-16 transition-all duration-1000 transform ${pillarsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">Our Core Pillars</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl shadow-lg bg-white transition-transform hover:scale-105 duration-300">
              <div className="flex justify-center mb-4">
                <ShieldCheck className="w-12 h-12 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-center mb-2">Safety First</h3>
              <p className="text-center text-gray-600">
                We use cutting-edge AI and real-time monitoring to provide tourists and authorities with proactive alerts and a faster emergency response.
              </p>
            </div>
            <div className="p-8 rounded-2xl shadow-lg bg-white transition-transform hover:scale-105 duration-300">
              <div className="flex justify-center mb-4">
                <Eye className="w-12 h-12 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-center mb-2">Privacy & Control</h3>
              <p className="text-center text-gray-600">
                Our system is built on a privacy-first philosophy, giving tourists full control over their data with a secure, blockchain-backed digital ID.
              </p>
            </div>
            <div className="p-8 rounded-2xl shadow-lg bg-white transition-transform hover:scale-105 duration-300">
              <div className="flex justify-center mb-4">
                <Heart className="w-12 h-12 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-center mb-2">Community Aligned</h3>
              <p className="text-center text-gray-600">
                We work closely with local government and tourism authorities to ensure our platform supports local safety initiatives.
              </p>
            </div>
          </div>
        </section>

        {/* Meet the Team Section with animation */}
        <section ref={teamRef} className={`mb-16 transition-all duration-1000 transform ${teamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">Meet the Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {/* Team Member: Aanchal Tripathi */}
            <div className="text-center">
              <User className="w-24 h-24 mx-auto text-gray-400 mb-1" />
              <h4 className="font-semibold text-lg">Aanchal Tripathi</h4>
              <p className="text-sm text-gray-500">AI Services</p>
            </div>
            {/* Team Member: Vaishnavi Panday */}
            <div className="text-center">
              <User className="w-24 h-24 mx-auto text-gray-400 mb-1" />
              <h4 className="font-semibold text-lg">Vaishnavi Pandey</h4>
              <p className="text-sm text-gray-500">Mobile App Designer</p>
            </div>
            {/* Team Member: Aadya Priyam */}
            <div className="text-center">
              <User className="w-24 h-24 mx-auto text-gray-400 mb-1" />
              <h4 className="font-semibold text-lg">Aadya Priyam</h4>
              <p className="text-sm text-gray-500">Blockchain Services</p>
              <p className="text-sm text-gray-500">Team lead</p>
            </div>
            {/* Team Member: Aryan Vishwakarma */}
            <div className="text-center">
              <User className="w-24 h-24 mx-auto text-gray-400 mb-1" />
              <h4 className="font-semibold text-lg">Aryan</h4>
              <p className="text-sm text-gray-500">Backend and Database</p>
              <p className="text-sm text-gray-500">Team lead</p>
            </div>
            {/* Team Member: Praseed Kumar */}
            <div className="text-center">
              <User className="w-24 h-24 mx-auto text-gray-400 mb-1" />
              <h4 className="font-semibold text-lg">Praseed Kumar</h4>
              <p className="text-sm text-gray-500">UI/UX Designer</p>
            </div>
            {/* Team Member: Shailja */}
            <div className="text-center">
              <User className="w-24 h-24 mx-auto text-gray-400 mb-1" />
              <h4 className="font-semibold text-lg">Shailja</h4>
              <p className="text-sm text-gray-500">Web Designer</p>
            </div>
          </div>
        </section>

        {/* CTA to go back to home */}
        <div className="text-center">
          <button 
            onClick={() => window.history.back()}
            className="btn-primary"
          >
            Go Back to Home
          </button>
        </div>

      </div>
      
      {/* Tailwind CSS utility classes and animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
        body {
          font-family: 'Inter', sans-serif;
        }
        .btn-primary {
          @apply bg-blue-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-blue-600 transition transform hover:scale-105 flex items-center justify-center mx-auto;
        }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-delay-200 { animation-delay: 0.2s; }
        .animate-delay-400 { animation-delay: 0.4s; }
        .animate-delay-600 { animation-delay: 0.6s; }
      `}</style>
    </div>
  );
};

export default About;
