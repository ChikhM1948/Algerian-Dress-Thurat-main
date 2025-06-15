"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TypingAnimation = ({ text, speed = 80, className = "" }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const cursorRef = useRef(null);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      
      return () => clearTimeout(timeout);
    } else {
      setIsTypingComplete(true);
    }
  }, [currentIndex, text, speed]);

  // Random slight variation in typing speed for more natural effect
  const getRandomSpeed = () => {
    return Math.floor(speed * (0.8 + Math.random() * 0.4));
  };

  return (
    <div className={`${className} relative overflow-hidden`}>
      <AnimatePresence>
        {displayedText.split('').map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.2, 
              delay: 0.03, 
              ease: "easeOut" 
            }}
            className="inline-block"
          >
            {char}
          </motion.span>
        ))}
      </AnimatePresence>
      
      {!isTypingComplete && (
        <motion.span
          ref={cursorRef}
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 0, 1] }}
          transition={{ 
            duration: 1,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut" 
          }}
          className="inline-block ml-1"
        >
          |
        </motion.span>
      )}
    </div>
  );
};

export default TypingAnimation;