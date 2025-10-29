import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDragonBall } from '../context/DragonBallContext';
import './Cards.css'; // We'll create this for styling

const Cards = ({ limit = null, showSearch = false }) => {
  const { characters, loading, error, searchCharacters } = useDragonBall();
  const [searchTerm, setSearchTerm] = React.useState('');
  const navigate = useNavigate();

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle card click
  const handleCardClick = (characterId) => {
    navigate(`/character/${characterId}`);
  };

  // Get characters to display
  const displayCharacters = searchTerm
    ? searchCharacters(searchTerm)
    : characters;

  // Limit characters if specified
  const limitedCharacters = limit
    ? displayCharacters.slice(0, limit)
    : displayCharacters;

  if (loading) {
    return (
      <div className="cards-container">
        <div className="loading">
          <h3>Loading Dragon Ball characters...</h3>
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cards-container">
        <div className="error">
          <h3>Error loading characters</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cards-container">
      {showSearch && (
        <div className="search-section">
          <input
            type="text"
            placeholder="Search Dragon Ball characters..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
      )}

      <div className="cards-grid">
        {limitedCharacters.length > 0 ? (
          limitedCharacters.map((character, index) => (
            <div
              key={character.id || index}
              className="character-card"
              onClick={() => handleCardClick(character.id)}
              style={{ cursor: 'pointer' }}
            >
              <div className="card-image">
                {character.image ? (
                  <div className="image-wrapper">
                    <img
                      src={character.image}
                      alt={character.name}
                      onError={(e) => {
                        e.target.src = '/assets/dragon-ball-logo.png'; // Fallback image
                      }}
                      onLoad={(e) => {

                        const img = e.target;
                        const aspectRatio = img.naturalWidth / img.naturalHeight;
                        if (aspectRatio > 1.2) {

                          img.style.objectFit = 'cover';
                          img.style.objectPosition = 'center top';
                        } else {

                          img.style.objectFit = 'contain';
                          img.style.objectPosition = 'center';
                        }
                      }}

                    />
                  </div>
                ) : (
                  <div className="no-image">
                    <span>No Image</span>
                  </div>
                )}
              </div>

              <div className="card-content">
                <h3 className="character-name">{character.name}</h3>

                {character.race && (
                  <p className="character-race">
                    <strong>Race:</strong> {character.race}
                  </p>
                )}

                {character.description && (
                  <p className="character-description">
                    {character.description.length > 80
                      ? `${character.description.substring(0, 80)}...`
                      : character.description
                    }
                  </p>
                )}

                <div className="click-hint">
                  <span>Click to view details →</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <h3>No characters found</h3>
            <p>Try a different search term or check back later.</p>
          </div>
        )}
      </div>

      {searchTerm && (
        <div className="search-results-info">
          Found {limitedCharacters.length} character(s)
        </div>
      )}
    </div>
  );
};

export default Cards;
