import React from 'react'
import './HomePage.css'
import backgroundImage from '../homepage-bg.jpg'

import Cards from '../../components/Cards'

const HomePage = () => {
  return (
    <div className="homepage-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="homepage-content">
        {/* Hero Section */}
        <section className="hero-section">
          <div className='hero-box'>
            <h1 className="hero-title">Dragon Ball Universe</h1>
            <p className="hero-subtitle">
              Explore the epic world of Dragon Ball! Discover legendary characters,
              epic battles, and incredible transformations in the ultimate anime experience.
            </p>
            <a href="/characters" className="hero-button">
              Explore Characters
            </a>

          </div>
        </section>

        {/* Additional homepage content can go here */}
        <main className="homepage-main">
          <div className='section-box'>
            <h2 className="section-title">Featured Characters</h2>
            <p className="section-subtitle">
              Discover some of the most powerful warriors in the Dragon Ball universe
            </p>

            {/* Display first 6 characters from API */}
            <Cards limit={6} />

            <div className="view-all-section">
              <a href="/characters" className="hero-button">
                View All Characters
              </a>
            </div>
          </div>
          {/* Add more sections here as needed */}
        </main>
      </div>
    </div>
  )
}

export default HomePage
