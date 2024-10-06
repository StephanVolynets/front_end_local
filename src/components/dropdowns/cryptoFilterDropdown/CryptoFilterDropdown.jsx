'use client'

import styles from './CryptoFilterDropdown.module.css'

import { useTranslation } from 'react-i18next'
import React, { useState, useEffect, useRef } from 'react'

import SimpleArrowIcon from '@/components/icons/simpleArrowIcon'

const CryptoFilterDropdown = ({ selectedCrypto, setSelectedCrypto }) => {
  const { t } = useTranslation()

  const [reverseAnimation, setReverseAnimation] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const cryptos = [
    { id: 1, abbr: 'btc', name: 'Bitcoin', logo: '/img/bitcoin-logo.png' },
    { id: 2, abbr: 'eth', name: 'Ethereum', logo: '/img/ethereum-logo.png' },
    { id: 3, abbr: 'xlm', name: 'Stellar', logo: '/img/stellar-logo.png' }
  ]
  const [selectedCryptoLocal, setSelectedCryptoLocal] = useState(cryptos.find(c => c.id === selectedCrypto))
  const [searchTerm, setSearchTerm] = useState('')

  const availableCryptos = cryptos.filter(c => c.id !== selectedCrypto)

  const filteredCryptos = availableCryptos.filter(crypto =>
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crypto.abbr.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleOptionClick = (crypto) => {
    setSelectedCryptoLocal(crypto)
    setSelectedCrypto(crypto.id)
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
        <div className={styles.criptoInfo}>
          <img className={styles.criptoLogo} src={selectedCryptoLocal.logo} alt="" />
          <span className={styles.criptoName}>{selectedCryptoLocal.name}</span>
          <span className={styles.criptoAbbr}>{selectedCryptoLocal.abbr.toUpperCase()}</span>
        </div>
        <SimpleArrowIcon className={`${styles.arrowIcon} ${isOpen ? styles.arrowIconOpen : ''}`} />
      </button>
      {isOpen && (
        <ul className={`${styles.dropdownContent} ${reverseAnimation ? styles.disabledDropdownContent : ''}`} role="listbox">
          <li className={styles.searchContainer}>
            <input
              type="text"
              placeholder={t('search cryptocurrency')}
              value={searchTerm}
              onChange={handleSearchChange}
              className={styles.searchInput}
            />
          </li>
          {filteredCryptos.map((crypto) => (
            <li key={crypto.id} role="option" className={styles.dropdownSelectContainer} aria-selected={selectedCrypto.id === crypto.id}>
              <button
                className={styles.dropdownSelect}
                onClick={() => handleOptionClick(crypto)}
                disabled={reverseAnimation}
              >
                <img className={styles.criptoLogo} src={crypto.logo} alt="" />
                <span>{crypto.name}</span>
                <span className={styles.criptoAbbr}>{crypto.abbr.toUpperCase()}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CryptoFilterDropdown