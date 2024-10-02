'use client'

import React, { useState, useEffect, useRef, useContext } from 'react'
import styles from './CountryDropdown.module.css'

// here is where the logic of the change of language is implemented
import { LanguageContext } from '@/context/LanguageContext'

const CountryDropdown = () => {
  const { selectedCountry, changeCountry, allCountries } = useContext(LanguageContext)
  const [reverseAnimation, setReverseAnimation] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const availableCountries = allCountries.filter(c => c.id !== selectedCountry.id)

  const handleOptionClick = (country) => {
    changeCountry(country)
    setReverseAnimation(true)
    setTimeout(() => {
      setReverseAnimation(false)
      setIsOpen(false)
    }, 150)
  }

  // close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button
        className={`${styles.dropButton} ${isOpen ? styles.dropButtonOpen : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selectedCountry.flag}
        <span>{selectedCountry.name}</span>
      </button>
      {isOpen && (
        <ul className={`${styles.dropdownContent} ${reverseAnimation ? styles.disabledDropdownContent : ''}`} role="listbox">
          {availableCountries.map((country) => (
            <li key={country.id} role="option" className={styles.dropdownSelectContainer} aria-selected={selectedCountry.id === country.id}>
              <button
                className={styles.dropdownSelect}
                onClick={() => handleOptionClick(country)}
                disabled={reverseAnimation}
              >
                {country.flag}
                <span>{country.name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CountryDropdown