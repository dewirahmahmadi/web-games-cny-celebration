"use client";
import { useState, useEffect } from 'react';
import SnakeGameComponent from '../../components/SnakeGameComponent';

export default function SnakeGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const storedHighScore = localStorage.getItem('snakeHighScore');
    if (storedHighScore) {
      setHighScore(parseInt(storedHighScore, 10));
    }
  }, []);

  const handleGameOver = (score) => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('snakeHighScore', score.toString());
    }
    setIsPlaying(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fadeIn">
      <h1 className="text-3xl font-bold text-yellow-300 mb-4 animate-slideInLeft">Snake Game</h1>
      <p className="text-white mb-4 animate-slideInRight">
        Guide the snake to eat food and grow longer, but be careful not to collide with the walls or your own tail!
        Use arrow keys to control the snake's direction. How long can you survive and grow?
      </p>
      
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-white mb-4">High Score: {highScore}</p>
        {!isPlaying ? (
          <button 
            className="bg-yellow-300 text-black font-bold py-2 px-4 rounded hover:bg-yellow-400 transition duration-300"
            onClick={() => setIsPlaying(true)}
          >
            Play
          </button>
        ) : (
          <div className="flex justify-center">
            <SnakeGameComponent onGameOver={handleGameOver} />
          </div>
        )}
      </div>
    </div>
  )
}
