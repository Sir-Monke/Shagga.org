"use client";
import React, { useEffect, useState } from 'react';
import LandingPage from './components/LandingPage';
import Footer from './components/Footer';
import PopupArea from '@/components/PopupArea';
import PopupPc from '@/components/PopupPc';
import MidSection from './components/MidSection';
import PopupAd from '@/components/PopupAd';

export default function Home() {
  // Define the state as either null or a string
  const [activePopup, setActivePopup] = useState<string | null>(null);

  const togglePopup = () => {
    setActivePopup(null);
  };

  useEffect(() => {
    const showPopup = () => {
      const popupOptions = ['popupArea', 'popupPc', 'popupAd'];
      const randomPopup = popupOptions[Math.floor(Math.random() * popupOptions.length)];
      setActivePopup(randomPopup);  // This now works because activePopup can be a string or null
    };

    showPopup();

    const interval = setInterval(() => {
      if (!activePopup) {
        showPopup();
      }
    }, 10000);  // Adjusted to 10 seconds (10000ms)

    return () => clearInterval(interval);
  }, [activePopup]);

  return (
    <main>
      <LandingPage />
      <div className="h-[20vh]" />
      <MidSection />
      <div className="h-[10vh]" />
      <Footer />
      {activePopup === 'popupArea' && <PopupArea onClose={togglePopup} />}
      {activePopup === 'popupAd' && <PopupAd onClose={togglePopup} />}
      {activePopup === 'popupPc' && <PopupPc onClose={togglePopup} />}
    </main>
  );
}
