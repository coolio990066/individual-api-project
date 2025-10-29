import React, { useState, useEffect, useMemo } from 'react';
import './LoadingAnimation.css';

// Move fallback characters outside component to prevent recreating on every render
const FALLBACK_CHARACTERS = [
  { name: 'Goku', image: '/assets/dragon-ball-logo.png' },
  { name: 'Vegeta', image: '/assets/dragon-ball-logo.png' },
  { name: 'Gohan', image: '/assets/dragon-ball-logo.png' },
  { name: 'Piccolo', image: '/assets/dragon-ball-logo.png' },
  { name: 'Krillin', image: '/assets/dragon-ball-logo.png' },
  { name: 'Frieza', image: '/assets/dragon-ball-logo.png' },
];

const LoadingAnimation = ({ characters = [] }) => {
  const [currentCharacter, setCurrentCharacter] = useState(null);

  useEffect(() => {
    // Use actual characters if available, otherwise use fallback
    const availableCharacters = characters.length > 0 ? characters : FALLBACK_CHARACTERS;
    const randomCharacter = availableCharacters[Math.floor(Math.random() * availableCharacters.length)];
    setCurrentCharacter(randomCharacter);
  }, [characters.length]);

  if (!currentCharacter) return null;

  return (
    <div className="loading-overlay">
      <div className="loading-container">
        {/* Character Animation */}
        <div className="character-loading">
          <div className="character-image-loading">
            <img
              src={currentCharacter.image || '/assets/dragon-ball-logo.png'}
              alt={currentCharacter.name}
              className="loading-character-img"
              onError={(e) => {
                e.target.src = '/assets/dragon-ball-logo.png';
              }}
            />
            <div className="energy-aura"></div>
            <div className="energy-rings">
              <div className="ring ring-1"></div>
              <div className="ring ring-2"></div>
              <div className="ring ring-3"></div>
            </div>
          </div>

          {/* Character Name */}
          <h2 className="loading-character-name">{currentCharacter.name}</h2>

          {/* Power Up Animation */}
          <div className="power-up-animation">
            <div className="power-line"></div>
            <div className="power-line"></div>
            <div className="power-line"></div>
            <div className="power-line"></div>
            <div className="power-line"></div>
          </div>

          {/* Loading Text */}
          <div className="loading-text">
            <span>Loading Dragon Ball Universe</span>
            <div className="loading-dots">
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </div>
          </div>
        </div>

        {/* Dragon Balls Animation */}
        <div className="dragon-balls">
          <div className="dragon-ball ball-1">⭐</div>
          <div className="dragon-ball ball-2">⭐</div>
          <div className="dragon-ball ball-3">⭐</div>
          <div className="dragon-ball ball-4">⭐</div>
          <div className="dragon-ball ball-5">⭐</div>
          <div className="dragon-ball ball-6">⭐</div>
          <div className="dragon-ball ball-7">⭐</div>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;