import React from 'react'
import { useDragonBall } from '../../context/DragonBallContext'
import Cards from '../../components/Cards'
import './CharactersPage.css'

const CharactersPage = () => {
  const { totalCharacters, loading } = useDragonBall()

  const handleGoBack = () => {
    window.history.back()
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

        {/* Go Back Button */}
        <div className="characters-actions">
          <button
            onClick={handleGoBack}
            className="go-back-button"
          >
            Go Back
          </button>
        </div>
      </div>

      {/* Cards component with search enabled */}
      <Cards showSearch={true} />
    </div>
  )
}

export default CharactersPage
