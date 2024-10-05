'use client'

import SimpleArrowIcon from '@/components/icons/simpleArrowIcon'
import styles from './ReviewsFilterDropdown.module.css'

import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

const ReviewsFilterDropdown = () => {
  const { t } = useTranslation()

  const [reverseAnimation, setReverseAnimation] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const allFilters = [
    { id: 1, name: t('most recent')},
    { id: 2, name: t('highest rating')},
    { id: 3, name: t('lowest rating')}
  ]
  const [selectedFilter, changeFilter] = useState(allFilters[0])

  const availableFilters = allFilters.filter(c => c.id !== selectedFilter?.id)

  const handleOptionClick = (filter) => {
    changeFilter(filter)
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
        onClick={() => setIsOpen(!isOpen)} 
        aria-haspopup="listbox"
        aria-expanded={isOpen} 
        className={`${styles.dropButton} 
        ${isOpen ? styles.dropButtonOpen : ''}`}
      >
        <span>{selectedFilter?.name}</span>
        <SimpleArrowIcon className={styles.simpleArrowIcon}/>
      </button>
      {isOpen && (
        <ul className={`${styles.dropdownContent} ${reverseAnimation ? styles.disabledDropdownContent : ''}`} role="listbox">
          {availableFilters.map((filter) => (
            <li key={filter.id} role="option" className={styles.dropdownSelectContainer} aria-selected={selectedFilter?.id === filter.id}>
              <button
                className={styles.dropdownSelect}
                onClick={() => handleOptionClick(filter)}
                disabled={reverseAnimation}
              >
                {filter.flag}
                <span>{filter.name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ReviewsFilterDropdown