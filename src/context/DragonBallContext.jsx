import React, { createContext, useContext, useState, useEffect } from 'react';
import LoadingAnimation from '../components/LoadingAnimation';


// Create the Dragon Ball Context
const DragonBallContext = createContext();

// Custom hook to use the Dragon Ball context
export const useDragonBall = () => {
  const context = useContext(DragonBallContext);
  if (!context) {
    throw new Error('useDragonBall must be used within a DragonBallProvider');
  }
  return context;
};

// Dragon Ball Provider Component
export const DragonBallProvider = ({ children }) => {
  const [characters, setCharacters] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Dragon Ball characters from API
  const fetchCharacters = async () => {
    try {
      setLoading(true);
      setError(null);

      // Using Dragon Ball API
      const response = await fetch('https://dragonball-api.com/api/characters?limit=50');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Dragon Ball API Response:', data);

      const charactersData = data.items || data.characters || data || [];
      setCharacters(charactersData);

      // Simple timeout to show loading for at least 1 second
      setTimeout(() => {
        setLoading(false);
      }, 1000);

    } catch (err) {
      console.error('Error fetching Dragon Ball characters:', err);
      setError(err.message);


      try {
        const fallbackResponse = await fetch('https://dragon-ball-super-api.herokuapp.com/api/characters');
        if (fallbackResponse.ok) {
          const fallbackData = await fallbackResponse.json();
          setCharacters(fallbackData || []);
        }
      } catch (fallbackErr) {
        console.error('Fallback API also failed:', fallbackErr);
      }

      // Simple timeout even on error
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };


  const fetchPlanets = async () => {
    try {
      const response = await fetch('https://dragonball-api.com/api/planets');
      if (response.ok) {
        const data = await response.json();
        setPlanets(data.items || data || []);
      }
    } catch (err) {
      console.error('Error fetching planets:', err);
    }
  };

  // Search characters by name
  const searchCharacters = (searchTerm) => {
    if (!searchTerm) return characters;

    return characters.filter(character =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (character.race && character.race.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  // Get character by ID
  const getCharacterById = (id) => {
    return characters.find(character => character.id === id);
  };

  // Refresh data
  const refreshData = () => {
    fetchCharacters();
    fetchPlanets();
  };

  // Fetch data when component mounts
  useEffect(() => {
    fetchCharacters();
    fetchPlanets();
  }, []);

  // Context value
  const value = {

    characters,
    planets,


    loading,
    error,


    searchCharacters,
    getCharacterById,
    refreshData,


    totalCharacters: characters.length,
  };

  return (
    <DragonBallContext.Provider value={value}>
      {loading && <LoadingAnimation />}
      {children}
    </DragonBallContext.Provider>
  );
};

export default DragonBallContext;