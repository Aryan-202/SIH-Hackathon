import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/ui/Navbar';
import SafeTourLanding from './SafeTourLanding';

const HomePage = () => {
  // Page animation variants
  const pageVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: 'easeOut' }
    },
  };

  return (
    <motion.div
      className="min-h-screen"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <Navbar />
      <SafeTourLanding />
    </motion.div>
  );
};

export default HomePage;
