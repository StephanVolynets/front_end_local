'use client'

import styles from './LoggedDropdown.module.css'

import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import UserIcon from '@/components/icons/userIcon'
import LogoutIcon from '@/components/icons/logoutIcon'

const LoggedDropdown = () => {
  const { t } = useTranslation()

  const [isOpen, setIsOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const dropdownRef = useRef(null)

  const username = 'Ignacio Prados'

  const handleToggle = () => {
    if (isOpen) {
      setIsClosing(true)
      setTimeout(() => {
        setIsOpen(false)
        setIsClosing(false)
      }, 150) // animation duration
    } else {
      setIsOpen(true)
    }
  }

  const handleLogout = () => {
    // logout logic
    console.log('logout')
    handleToggle()
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
        onClick={handleToggle}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <UserIcon />
        {username}
      </button>
      {(isOpen || isClosing) && (
        <ul className={`${styles.dropdownContent} ${isClosing ? styles.disabledDropdownContent : ''}`} role="listbox">
          <li role="option" className={styles.dropdownSelectContainer}>
            <button
              className={styles.dropdownSelect}
              onClick={handleLogout}
            >
              <LogoutIcon />
              {t('logout')}
            </button>
          </li>
        </ul>
      )}
    </div>
  )
}

export default LoggedDropdown