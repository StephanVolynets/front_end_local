'use client'

import styles from './CountryFilterDropdown.module.css'

import { useTranslation } from 'react-i18next'
import React, { useState, useEffect, useRef } from 'react'

import SimpleArrowIcon from '@/components/icons/simpleArrowIcon'

const CountryFilterDropdown = ({ selectedCountry, setSelectedCountry }) => {
  const { t } = useTranslation()

  const [reverseAnimation, setReverseAnimation] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const countries = [
    { id: 1, code: 'United States' },
    { id: 2, code: 'Argentina' },
    { id: 3, code: 'Mexico' },
    { id: 4, code: 'Spain' },
  ]
  const [selectedCountryLocal, setSelectedCountryLocal] = useState(
    countries.find(c => c.id === selectedCountry) || countries[0]
  )
  const [searchTerm, setSearchTerm] = useState('')

  const availableCountries = countries.filter(c => c.id !== selectedCountryLocal.id)

  const filteredCountries = availableCountries.filter(country =>
    country.code.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleOptionClick = (country) => {
    setSelectedCountryLocal(country)
    setSelectedCountry(country.id)
    setReverseAnimation(true)
    setTimeout(() => {
      setReverseAnimation(false)
      setIsOpen(false)
    }, 150)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
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
        <span className={styles.countryCode}>{selectedCountryLocal.code}</span>
        <SimpleArrowIcon className={`${styles.arrowIcon} ${isOpen ? styles.arrowIconOpen : ''}`} />
      </button>
      {isOpen && (
        <ul className={`${styles.dropdownContent} ${reverseAnimation ? styles.disabledDropdownContent : ''}`} role="listbox">
          <li className={styles.searchContainer}>
            <input
              type="text"
              placeholder={t('search by country')}
              value={searchTerm}
              onChange={handleSearchChange}
              className={styles.searchInput}
            />
          </li>
          {filteredCountries.map((country) => (
            <li key={country.id} role="option" className={styles.dropdownSelectContainer} aria-selected={selectedCountryLocal.id === country.id}>
              <button
                className={styles.dropdownSelect}
                onClick={() => handleOptionClick(country)}
                disabled={reverseAnimation}
              >
                <span className={styles.countryCode}>{country.code}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CountryFilterDropdown