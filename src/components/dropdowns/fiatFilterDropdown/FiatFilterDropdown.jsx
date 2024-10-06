'use client'

import styles from './FiatFilterDropdown.module.css'

import { useTranslation } from 'react-i18next'
import React, { useState, useEffect, useRef } from 'react'

import SimpleArrowIcon from '@/components/icons/simpleArrowIcon'

const FiatFilterDropdown = ({ selectedFiat, setSelectedFiat }) => {
  const { t } = useTranslation()

  const [reverseAnimation, setReverseAnimation] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const currencies = [
    { id: 1, code: 'USD' },
    { id: 2, code: 'EUR' },
    { id: 3, code: 'ARS' },
    { id: 4, code: 'GBP' },
    { id: 5, code: 'JPY' },
    { id: 6, code: 'CAD' },
    { id: 7, code: 'AUD' },
    { id: 8, code: 'CHF' },
    { id: 9, code: 'CNY' },
    { id: 10, code: 'MXN' },
  ]
  const [selectedCurrencyLocal, setSelectedCurrencyLocal] = useState(currencies.find(c => c.id === selectedFiat))
  const [searchTerm, setSearchTerm] = useState('')

  const availableCurrencies = currencies.filter(c => c.id !== selectedCurrencyLocal.id)

  const filteredCurrencies = availableCurrencies.filter(currency =>
    currency.code.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleOptionClick = (currency) => {
    setSelectedCurrencyLocal(currency)
    setSelectedFiat(currency.id)
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
        <span className={styles.currencyCode}>{selectedCurrencyLocal.code}</span>
        <SimpleArrowIcon className={`${styles.arrowIcon} ${isOpen ? styles.arrowIconOpen : ''}`} />
      </button>
      {isOpen && (
        <ul className={`${styles.dropdownContent} ${reverseAnimation ? styles.disabledDropdownContent : ''}`} role="listbox">
          <li className={styles.searchContainer}>
            <input
              type="text"
              placeholder={t('search fiat currency')}
              value={searchTerm}
              onChange={handleSearchChange}
              className={styles.searchInput}
            />
          </li>
          {filteredCurrencies.map((currency) => (
            <li key={currency.id} role="option" className={styles.dropdownSelectContainer} aria-selected={selectedCurrencyLocal.id === currency.id}>
              <button
                className={styles.dropdownSelect}
                onClick={() => handleOptionClick(currency)}
                disabled={reverseAnimation}
              >
                <span className={styles.currencyCode}>{currency.code}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default FiatFilterDropdown