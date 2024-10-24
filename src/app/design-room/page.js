'use client';
import { useState } from 'react';
import DesignRoomComponent from '../../components/DesignRoomComponent';

export default function DesignRoom() {
  const [isDesigning, setIsDesigning] = useState(false);

  const handleStartDesigning = () => {
    setIsDesigning(true);
  };

  const handleBackToInfo = () => {
    setIsDesigning(false);
  };

  return (
    <div className="w-full h-screen relative">
      {!isDesigning ? (
        <div className="container mx-auto px-4 py-8 animate-fadeIn flex flex-col items-center justify-center h-full">
          <h1 className="text-3xl font-bold text-yellow-300 mb-4 animate-slideInLeft text-center">Design Your Room</h1>
          <p className="text-white mb-8 animate-slideInRight text-center max-w-2xl">
            Welcome to the Chinese New Year Design Room! Immerse yourself in the festive spirit by decorating
            your virtual space with traditional elements. Choose from a variety of auspicious items such as red
            lanterns, zodiac animal figurines, lucky couplets, and vibrant spring flowers. Arrange furniture,
            hang decorations, and create your perfect celebration setting. Can you create the most prosperous
            and harmonious room to usher in the New Year?
          </p>
          <button 
            className="bg-yellow-300 text-black font-bold py-3 px-6 rounded-lg hover:bg-yellow-400 transition duration-300 transform hover:scale-105"
            onClick={handleStartDesigning}
          >
            Start Designing
          </button>
        </div>
      ) : (
        <DesignRoomComponent onBack={handleBackToInfo} />
      )}
    </div>
  );
}
