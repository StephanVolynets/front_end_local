'use client'

import styles from './StateFilterDropdown.module.css'

import { useTranslation } from 'react-i18next'
import React, { useState, useEffect, useRef } from 'react'

import SimpleArrowIcon from '@/components/icons/simpleArrowIcon'

const StateFilterDropdown = ({ selectedState, setSelectedState }) => {
  const { t } = useTranslation()

  const [reverseAnimation, setReverseAnimation] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const states = [
    { id: 1, code: 'All' },
    { id: 2, code: 'Florida' },
    { id: 3, code: 'Washington' },
    { id: 4, code: 'Texas' },
  ]
  const [selectedStateLocal, setSelectedStateLocal] = useState(
    states.find(c => c.id === selectedState) || states[0]
  )
  const [searchTerm, setSearchTerm] = useState('')

  const availableStates = states.filter(c => c.id !== selectedStateLocal.id)

  const filteredStates = availableStates.filter(state =>
    state.code.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleOptionClick = (state) => {
    setSelectedStateLocal(state)
    setSelectedState(state.id)
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
        <span className={styles.stateCode}>{selectedStateLocal.code}</span>
        <SimpleArrowIcon className={`${styles.arrowIcon} ${isOpen ? styles.arrowIconOpen : ''}`} />
      </button>
      {isOpen && (
        <ul className={`${styles.dropdownContent} ${reverseAnimation ? styles.disabledDropdownContent : ''}`} role="listbox">
          <li className={styles.searchContainer}>
            <input
              type="text"
              placeholder={t('search by state')}
              value={searchTerm}
              onChange={handleSearchChange}
              className={styles.searchInput}
            />
          </li>
          {filteredStates.map((state) => (
            <li key={state.id} role="option" className={styles.dropdownSelectContainer} aria-selected={selectedStateLocal.id === state.id}>
              <button
                className={styles.dropdownSelect}
                onClick={() => handleOptionClick(state)}
                disabled={reverseAnimation}
              >
                <span className={styles.stateCode}>{state.code}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default StateFilterDropdown