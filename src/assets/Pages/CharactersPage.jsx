import React, { useState } from 'react'
import { useDragonBall } from '../../context/DragonBallContext'
import Cards from '../../components/Cards'
import './CharactersPage.css'

const CharactersPage = () => {
  const { totalCharacters, loading } = useDragonBall()
  const [sortOrder, setSortOrder] = useState('none') // 'none', 'asc', 'desc'

  const handleGoBack = () => {
    window.history.back()
  }

  const handleSort = (order) => {
    setSortOrder(order)
  }


  return (
    <div className="characters-page">
      <div className="characters-header">
        <h1>Dragon Ball Characters</h1>
        <p>Explore the complete roster of Dragon Ball warriors and fighters</p>
        {!loading && (
          <div className="character-count">
            Total Characters: {totalCharacters}
          </div>
        )}

        {/* Go Back Button and Sort Controls */}
        <div className="characters-actions">
          <button
            onClick={handleGoBack}
            className="go-back-button"
          >
            Go Back
          </button>
          
          <div className="sort-controls">
            <label htmlFor="sort-select">Sort by name:</label>
            <select 
              id="sort-select"
              value={sortOrder} 
              onChange={(e) => handleSort(e.target.value)}
              className="sort-dropdown"
            >
              <option value="none">Default Order</option>
              <option value="asc">A to Z</option>
              <option value="desc">Z to A</option>
              <option value="maxKiDesc">Highest Max Ki</option>
              <option value="maxKiAsc">Lowest Max Ki</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cards component with search enabled and sorting */}
      <Cards showSearch={true} sortOrder={sortOrder} />
    </div>
  )
}

export default CharactersPage
