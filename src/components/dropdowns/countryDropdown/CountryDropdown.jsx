'use client'

import styles from './CountryDropdown.module.css'

import React, { useState, useEffect, useRef } from 'react'

import UnitedStatesFlag from '@/components/icons/flags/UnitedStatesFlag'
import ArgentinaFlag from '@/components/icons/flags/ArgentinaFlag'
import SpainFlag from '@/components/icons/flags/SpainFlag'
import MexicoFlag from '@/components/icons/flags/MexicoFlag'
  
// when you press in a country, selectedCountry.string allows to identify the selected country to set lenguage or other functions
const CountryDropdown = () => {
  const [reverseAnimation, setReverseAnimation] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const allCountries = [
    { name: 'United States', flag: <UnitedStatesFlag />, string: 'united-states' },
    { name: 'Argentina', flag: <ArgentinaFlag />, string: 'argentina' },
    { name: 'Spain', flag: <SpainFlag />, string: 'spain' },
    { name: 'México', flag: <MexicoFlag />, string: 'mexico' },
  ]
  const [selectedCountry, setSelectedCountry] = useState(allCountries[0]) // sets the first country as the default selected country
  const [availableCountries, setAvailableCountries] = useState(allCountries.slice(1)) // sets the rest of the countries as available countries


  const handleOptionClick = (country) => {
    setSelectedCountry(country)
    setAvailableCountries(allCountries.filter(c => c.name !== country.name)) // removes the selected country from the available countries
    setReverseAnimation(true)
    setTimeout(() => {
      setReverseAnimation(false)
      setIsOpen(false)
    }, 150)
  }

  // close dropdown when clicking outside, UX feature...
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
          {availableCountries.map((country, index) => (
            <li key={index} role="option" className={styles.dropdownSelectContainer} aria-selected={selectedCountry?.name === country.name}>
              <button
                className={styles.dropdownSelect}
                onClick={() => handleOptionClick(country)}
                disabled={reverseAnimation}
              >
                {country.flag}
                <span>{country.name}</span>
              </button>
            </li>
            ))
          }
        </ul>
        )
      }
    </div>
  )
}

export default CountryDropdown
