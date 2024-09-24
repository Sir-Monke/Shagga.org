import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define the type for PopupArea props
interface PopupAreaProps {
  onClose: () => void; // onClose is a function with no arguments and no return value
}

const imageCount = 16;
const ShaggaImages = Array.from({ length: imageCount }, (_, index) => require(`@/app/images/shaggas/${index + 1}.jpg`));

export default function PopupArea({ onClose }: PopupAreaProps) { // Use the typed PopupAreaProps
  const maleNames = [
    'John', 'Noah', 'Oliver', 'Elijah', 'James',
    'William', 'Benjamin', 'Lucas', 'Henry', 'Jamal',
    'Mason', 'Michael', 'Ethan', 'Tyrone', 'Alex',
    'Kevin', 'Tom', 'Suli', 'Sam', 'Max',
  ];

  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(true);
  const [randomImage, setRandomImage] = useState<string | null>(null); // Allow string or null
  const [shuffledImages, setShuffledImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const getRandomDistance = () => Math.floor(Math.random() * 50) + 1;

  const getRandomName = () => {
    const randomIndex = Math.floor(Math.random() * maleNames.length);
    return maleNames[randomIndex];
  };

  const fetchLocationByIP = async () => {
    try {
      const response = await axios.get('https://ipapi.co/json/');
      setLocation(`${response.data.city}, ${response.data.region}`);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching location by IP:', error);
      setLocation('your walls');
      setLoading(false);
    }
  };

  const shuffleArray = (array: string[]): string[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  

  useEffect(() => {
    const shuffled = shuffleArray(ShaggaImages);
    setShuffledImages(shuffled);
    setRandomImage(shuffled[0]);
    fetchLocationByIP();
  }, []);

  const getNextImage = () => {
    const nextIndex = (currentImageIndex + 1) % shuffledImages.length;
    setCurrentImageIndex(nextIndex);
    setRandomImage(shuffledImages[nextIndex]);
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
  const randomDistance = getRandomDistance();

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
          <h2 className="text-xl font-bold mb-4 text-center">Top Shagga's In Your Area</h2>
          {randomImage && (
            <Image src={randomImage} alt="Top Shagga" width={250} height={250} className="mb-4 mx-auto" />
          )}
          <p className="mb-4 text-center">
            {loading ? `${getRandomName()} is ${randomDistance}m away from you.` : `${getRandomName()} is ${randomDistance}m away from you in ${location}.`}
          </p>
        </div>
      </div>
    </div>
  );
}
