import React, { useState, useEffect } from "react";

// Define the type for PopupPc props
interface PopupPcProps {
  onClose: () => void; // onClose is a function that takes no arguments and returns nothing
}

export default function PopupPc({ onClose }: PopupPcProps) { // Use the typed PopupPcProps
  const [isOpen, setIsOpen] = useState(true);
  const [pcInfo, setPcInfo] = useState<any>({}); // Using 'any' for simplicity, you can define a more specific type if needed

  const getPCInfo = () => {
    const info = {
      os: navigator.platform,
      userAgent: navigator.userAgent,
      language: navigator.language,
      screen: {
        width: window.screen.width,
        height: window.screen.height
      }
    };
    setPcInfo(info);
  };

  const randomPosition = () => {
    const popupHeight = 300;
    const popupWidth = 400;
    const maxTop = window.innerHeight - popupHeight;
    const maxLeft = window.innerWidth - popupWidth;
    const top = Math.random() * maxTop;
    const left = Math.random() * maxLeft;
    return { top, left };
  };

  const { top, left } = randomPosition();

  useEffect(() => {
    getPCInfo();
  }, []);

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute" style={{ top: `${top}px`, left: `${left}px` }}>
            <div className="bg-black shadow-lg p-6 max-w-sm w-full border-4 border-red-500 animate-blink">
              <button
                onClick={() => { setIsOpen(false); onClose(); }}
                className="absolute top-0 right-2 text-red-500 hover:text-red-700 text-3xl font-bold"
                aria-label="Close"
              >
                &times;
              </button>
              <h2 className="text-lg font-bold mb-4" style={{ color: '#00FF00' }}>Hacka Shagga Sees U..</h2>
              <ul className="mb-4" style={{ color: '#00FF00' }}>
                <li>Operating System: {pcInfo.os}</li>
                <li>User Agent: {pcInfo.userAgent}</li>
                <li>Language: {pcInfo.language}</li>
                <li>
                  Screen Size: {pcInfo.screen?.width} x {pcInfo.screen?.height}
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
