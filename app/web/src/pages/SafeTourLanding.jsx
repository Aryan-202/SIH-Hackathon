import React, { useState } from 'react';
import { Shield, MapPin, AlertTriangle, Users, Eye, Smartphone, Globe, CheckCircle, Star, Phone, Mail, Map, Clock, Zap } from 'lucide-react';
import { motion, useScroll, useTransform } from "framer-motion";




const SafeTourLanding = () => {
  const [activeTab, setActiveTab] = useState('tourists');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: ''
  });

  const { scrollYProgress } = useScroll({
    // Optional: track a specific element
    // target: refToElement,
    // offset: ["start end", "end start"]
  });

  

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your inquiry! We will contact you soon.');
    setFormData({ name: '', email: '', organization: '', message: '' });
  };
  
  //Animations
  
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 80 }, // start invisible and slightly below
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 100 }, // start off to the right
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1, // staggered by index
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const testimonialVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.3, // stagger by index
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  const slideVariants = {
    hiddenLeft: { opacity: 0, x: -100 },
    hiddenRight: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]); // from 0.8 → 1
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]); // fade in


  return (
    <motion.div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600" >
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Protecting Tourists with 
                  <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent"> AI & Blockchain</span>
                </h1>
                <p className="text-xl text-blue-100 leading-relaxed">
                  Revolutionary safety monitoring system that combines real-time AI surveillance, blockchain-secured digital IDs, and instant emergency response for comprehensive tourist protection.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-xl flex items-center justify-center space-x-2">
                  <Eye className="w-5 h-5" />
                  <span>Access Dashboard</span>
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-900 transition-all duration-300 flex items-center justify-center space-x-2">
                  <Smartphone className="w-5 h-5" />
                  <span>Download App</span>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">99.9%</div>
                  <div className="text-blue-200 text-sm">System Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">&lt;2s</div>
                  <div className="text-blue-200 text-sm">Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">1000+</div>
                  <div className="text-blue-200 text-sm">Concurrent Users</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white">Live Dashboard Preview</h3>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-400 text-sm">Live</span>
                    </div>
                  </div>
                  
                  <div className="bg-blue-900/50 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-200">Active Tourists</span>
                      <span className="text-white font-semibold">1,247</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-200">Safe Zones</span>
                      <span className="text-green-400 font-semibold">18</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-200">Active Alerts</span>
                      <span className="text-orange-400 font-semibold">2</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3 text-center">
                      <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-1" />
                      <div className="text-green-400 text-sm font-medium">All Systems OK</div>
                    </div>
                    <div className="bg-orange-500/20 border border-orange-500/30 rounded-lg p-3 text-center">
                      <AlertTriangle className="w-6 h-6 text-orange-400 mx-auto mb-1" />
                      <div className="text-orange-400 text-sm font-medium">2 Pending Alerts</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={scrollYProgress > 0.1 ? "visible" : "hidden"} // trigger by scroll
      >
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Safety Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced technology stack designed to provide complete tourist safety
              monitoring and rapid emergency response
            </p>
          </div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              visible: { transition: { staggerChildren: 0.25 } },
            }}
          >
            {[
              {
                icon: MapPin,
                title: "Real-time Location Tracking",
                description:
                  "GPS-enabled monitoring with geofencing for safe zone management and instant location updates.",
                color: "blue",
              },
              {
                icon: Shield,
                title: "Blockchain Digital IDs",
                description:
                  "Immutable, secure digital identification system built on blockchain for foolproof tourist verification.",
                color: "green",
              },
              {
                icon: Eye,
                title: "AI-Powered Monitoring",
                description:
                  "Machine learning algorithms detect anomalies and potential threats through behavioral pattern analysis.",
                color: "purple",
              },
              {
                icon: AlertTriangle,
                title: "Instant Alert System",
                description:
                  "Multi-channel emergency alerts with automated response protocols and real-time escalation.",
                color: "orange",
              },
              {
                icon: Users,
                title: "Multi-Stakeholder Dashboard",
                description:
                  "Role-based access for tourists, authorities, and administrators with customized interfaces.",
                color: "indigo",
              },
              {
                icon: Globe,
                title: "Multi-Language Support",
                description:
                  "Localized interfaces supporting multiple languages for international tourist accessibility.",
                color: "teal",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={cardVariants} // animation variant
                className="group hover:scale-105 transition-all duration-300"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300">
                  <div
                    className={`w-14 h-14 bg-${feature.color}-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon
                      className={`w-7 h-7 text-${feature.color}-600`}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      </motion.div>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How SafeTour Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A seamless three-step process ensuring comprehensive tourist safety from registration to emergency response
            </p>
          </div>

          <div className="relative">
            <motion.div
              className="grid lg:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {[
                {
                  step: "01",
                  title: "Tourist Registration",
                  description:
                    "Tourists register through our mobile app, creating blockchain-secured digital IDs with emergency contacts and travel itineraries.",
                  icon: Smartphone,
                  color: "blue",
                },
                {
                  step: "02",
                  title: "AI Monitoring & Tracking",
                  description:
                    "Real-time location tracking with AI-powered anomaly detection monitors tourist safety and identifies potential risks automatically.",
                  icon: Eye,
                  color: "green",
                },
                {
                  step: "03",
                  title: "Emergency Response",
                  description:
                    "Instant alerts to authorities with automated e-FIR generation, response team coordination, and real-time incident management.",
                  icon: Zap,
                  color: "orange",
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  custom={index}
                  variants={stepVariants}
                >
                  <div className="text-center">
                    <div
                      className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-${step.color}-500 to-${step.color}-600 rounded-full flex items-center justify-center shadow-lg`}
                    >
                      <step.icon className="w-10 h-10 text-white" />
                    </div>
                    <div className={`text-6xl font-bold text-${step.color}-200 mb-4`}>
                      {step.step}
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>

                  {index < 2 && (
                    <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-blue-300 to-transparent transform translate-y-8 z-0"></div>
                  )}
                </motion.div>
              ))}
            </motion.div>

          </div>

          <motion.div
            className="mt-16 text-center"
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-xl max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Access Level</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <button 
                  onClick={() => setActiveTab('tourists')}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                    activeTab === 'tourists' 
                      ? 'border-blue-500 bg-blue-50 shadow-lg' 
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  <Smartphone className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">For Tourists</h4>
                  <p className="text-gray-600">Mobile app with digital ID, emergency features, and safety alerts</p>
                </button>
                <button 
                  onClick={() => setActiveTab('authorities')}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                    activeTab === 'authorities' 
                      ? 'border-orange-500 bg-orange-50 shadow-lg' 
                      : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                  }`}
                >
                  <Shield className="w-12 h-12 mx-auto mb-4 text-orange-600" />
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">For Authorities</h4>
                  <p className="text-gray-600">Web dashboard for monitoring, alerts, and emergency response management</p>
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Government Agencies</h2>
            <p className="text-xl text-gray-600">Leading tourism and law enforcement departments rely on SafeTour</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "SafeTour has revolutionized how we monitor and protect tourists. The real-time alerts and AI detection have helped us prevent numerous incidents.",
                author: "Director, Tourism Department",
                organization: "Andhra Pradesh Government",
                rating: 5,
              },
              {
                quote:
                  "The blockchain digital ID system provides unmatched security and verification capabilities. Emergency response times have improved by 60%.",
                author: "Commissioner of Police",
                organization: "Guntur Police Department",
                rating: 5,
              },
              {
                quote:
                  "Implementation was smooth and the dashboard is incredibly intuitive. Our officers can now respond to tourist emergencies more efficiently than ever.",
                author: "Deputy Superintendent",
                organization: "State Tourism Police",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 shadow-lg border border-blue-100 hover:shadow-2xl transition-all duration-300"
                custom={index}
                variants={testimonialVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ scale: 1.05, rotate: -1 }} // subtle tilt on hover
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-6 italic leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="text-blue-600 text-sm">{testimonial.organization}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-24 bg-gradient-to-r from-blue-900 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Get Started with SafeTour</h2>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
            Download our mobile app for tourists or access the web dashboard for authorities and administrators
          </p>
          
          <motion.div
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.3, // delay between cards
                },
              },
            }}
          >
            <motion.div
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
              variants={slideVariants}
              initial="hiddenLeft"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <Smartphone className="w-16 h-16 text-white mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Tourist Mobile App</h3>
              <p className="text-blue-100 mb-6">
                Complete safety features, digital ID, emergency alerts, and more
              </p>
              <div className="space-y-3">
                <button className="w-full bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                  Download for iOS
                </button>
                <button className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors">
                  Download for Android
                </button>
              </div>
            </motion.div>
            
            <motion.div
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
              variants={slideVariants}
              initial="hiddenRight"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <Globe className="w-16 h-16 text-white mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Authority Dashboard</h3>
              <p className="text-blue-100 mb-6">
                Web-based monitoring, alert management, and response coordination
              </p>
              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition-all">
                  Access Dashboard
                </button>
                <button className="w-full border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-900 transition-colors">
                  Request Demo
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              <p className="text-xl text-gray-600 mb-8">
                Ready to enhance tourist safety in your region? Contact us for a personalized demonstration and implementation plan.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Phone Support</div>
                    <div className="text-gray-600">+91-8888-777-666</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Email Support</div>
                    <div className="text-gray-600">contact@safetour.gov.in</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Map className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Office Location</div>
                    <div className="text-gray-600">Guntur, Andhra Pradesh, India</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Business Hours</div>
                    <div className="text-gray-600">24/7 Emergency Support Available</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your email address"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Organization</label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Government department, police, tourism board"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Tell us about your requirements and how we can help..."
                  />
                </div>
                
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">SafeTour</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Advanced tourist safety monitoring system combining AI, blockchain, and real-time emergency response.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Solutions</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Tourist App</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Authority Dashboard</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Admin Portal</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Integration</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Training</a></li>
                <li><a href="#" className="hover:text-white transition-colors">24/7 Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 SafeTour - Tourist Safety Monitoring System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

export default SafeTourLanding;