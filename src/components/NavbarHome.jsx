import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './NavbarHome.css'

const NavbarHome = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogoClick = () => {
    navigate('/')
    setIsMenuOpen(false)
  }

  return (
    <header className="navbar">
      <div className="navbar__container">
        {/* Logo Section */}
        <div className="navbar__logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          <img
            className="navbar__logo-img"
            src="/assets/dragon-ball-logo.png"
            alt="Dragon Ball Logo"
          />
          <span className="navbar__brand">Dragon Ball Universe</span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="navbar__nav">
          <ul className="navbar__menu">
            <li className="navbar__item">
              <Link to="/" className="navbar__link">Home</Link>
            </li>
            <li className="navbar__item">
              <Link to="/characters" className="navbar__link">Characters</Link>
            </li>
            <li className="navbar__item">
              <a href="#contact" className="navbar__link navbar__link--cta">Contact</a>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="navbar__toggle" onClick={toggleMenu}>
          <span className={`navbar__hamburger ${isMenuOpen ? 'navbar__hamburger--open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile ${isMenuOpen ? 'navbar__mobile--open' : ''}`}>
        <ul className="navbar__mobile-menu">
          <li className="navbar__mobile-item">
            <Link to="/" className="navbar__mobile-link" onClick={toggleMenu}>Home</Link>
          </li>
          <li className="navbar__mobile-item">
            <Link to="/characters" className="navbar__mobile-link" onClick={toggleMenu}>Characters</Link>
          </li>
          <li className="navbar__mobile-item">
            <a href="#contact" className="navbar__mobile-link" onClick={toggleMenu}>Contact</a>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default NavbarHome
