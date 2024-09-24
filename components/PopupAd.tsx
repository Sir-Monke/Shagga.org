import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const imageCount = 20;
const ShaggaImages = Array.from({ length: imageCount }, (_, index) => require(`@/app/images/products/${index + 1}.jpg`));

export default function PopupAd({ onClose }) {
  const [randomImage, setRandomImage] = useState(null);
  const [shuffledImages, setShuffledImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0); // State to hold the current price

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const generateRandomPrice = () => {
    // Generates a random price between 1.00 and 100.00
    return (Math.random() * 2 + 2).toFixed(2); // Returns a float formatted to 2 decimal places
  };

  useEffect(() => {
    const shuffled = shuffleArray(ShaggaImages);
    setShuffledImages(shuffled);
    setRandomImage(shuffled[0]);
    setCurrentPrice(generateRandomPrice()); // Set initial price
  }, []);

  const getNextImage = () => {
    const nextIndex = (currentImageIndex + 1) % shuffledImages.length;
    setCurrentImageIndex(nextIndex);
    setRandomImage(shuffledImages[nextIndex]);
    setCurrentPrice(generateRandomPrice()); // Update price with each new image
  };

  const randomPosition = () => {
    const popupHeight = 300;
    const popupWidth = 300;
    const maxTop = window.innerHeight - popupHeight;
    const maxLeft = window.innerWidth - popupWidth;
    const top = Math.random() * maxTop;
    const left = Math.random() * maxLeft;
    return { top, left };
  };

  const { top, left } = randomPosition();

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="absolute" style={{ top: `${top}px`, left: `${left}px` }}>
        <div className="relative bg-white p-6 shadow-lg border-4 border-red-500 animate-blink">
          <button 
            onClick={() => { getNextImage(); onClose(); }} 
            className="absolute top-0 right-2 text-red-500 hover:text-red-700 text-3xl font-bold" 
            aria-label="Close"
          >
            &times;
          </button>
          <h2 className="text-xl font-bold mb-4 text-center">Shagga Item For Sale!</h2>
          {randomImage && (
            <Image src={randomImage} alt="Top Shagga" width={250} height={250} className="mb-4 mx-auto" />
          )}
          <p className="mb-4 text-center">
            Only Small Price of £{currentPrice}
          </p>
        </div>
      </div>
    </div>
  );
}
