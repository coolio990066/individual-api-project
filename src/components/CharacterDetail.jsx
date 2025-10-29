import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDragonBall } from '../context/DragonBallContext';
import './CharacterDetail.css';

const CharacterDetail = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const { getCharacterBySlug, loading } = useDragonBall();

  const character = getCharacterBySlug(name);

  if (loading) {
    return (
      <div className="character-detail-page">
        <div className="loading">
          <h3>Loading character details...</h3>
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (!character) {
    return (
      <div className="character-detail-page">
        <div className="error">
          <h3>Character not found</h3>
          <button onClick={() => navigate('/characters')} className="back-button">
            Back to Characters
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="character-detail-page">
      <div className="character-detail-container">
        {/* Back Button */}
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>

        <div className="character-detail-content">
          {/* Character Image */}
          <div className="character-image-section">
            <div className="character-image-wrapper">
              {character.image ? (
                <img
                  src={character.image}
                  alt={character.name}
                  onError={(e) => {
                    e.target.src = '/assets/dragon-ball-logo.png';
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
              ) : (
                <div className="no-image-large">
                  <span>No Image Available</span>
                </div>
              )}
            </div>
          </div>

          {/* Character Details */}
          <div className="character-info-section">
            <h1 className="character-name">{character.name}</h1>

            <div className="character-stats">
              <div className="stat-grid">

                {character.race && (
                  <div className="stat-item">
                    <span className="stat-label">Race:</span>
                    <span className="stat-value">{character.race}</span>
                  </div>
                )}

                {character.gender && (
                  <div className="stat-item">
                    <span className="stat-label">Gender:</span>
                    <span className="stat-value">{character.gender}</span>
                  </div>
                )}

                {character.ki && (
                  <div className="stat-item">
                    <span className="stat-label">Ki:</span>
                    <span className="stat-value">{character.ki}</span>
                  </div>
                )}

                {character.maxKi && (
                  <div className="stat-item">
                    <span className="stat-label">Max Ki:</span>
                    <span className="stat-value">{character.maxKi}</span>
                  </div>
                )}

                {character.affiliation && (
                  <div className="stat-item">
                    <span className="stat-label">Affiliation:</span>
                    <span className="stat-value">{character.affiliation}</span>
                  </div>
                )}

                {character.originPlanet && (
                  <div className="stat-item">
                    <span className="stat-label">Origin Planet:</span>
                    <span className="stat-value">{character.originPlanet.name}</span>
                  </div>
                )}

                {character.transformations && character.transformations.length > 0 && (
                  <div className="stat-item full-width">
                    <span className="stat-label">Transformations:</span>
                    <div className="transformations-list">
                      {character.transformations.map((transformation, index) => (
                        <span key={index} className="transformation-item">
                          {transformation.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {character.description && (
              <div className="character-description">
                <h3>Description</h3>
                <p>{character.description}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="action-buttons">
              <button
                onClick={() => navigate('/characters')}
                className="action-button secondary"
              >
                View All Characters
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;