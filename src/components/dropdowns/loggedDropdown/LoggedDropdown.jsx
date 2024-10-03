'use client'

import styles from './LoggedDropdown.module.css'

import React, { useState, useEffect, useRef } from 'react'

import UserIcon from '@/components/icons/userIcon'
import LogoutIcon from '@/components/icons/logoutIcon'

const LoggedDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const handleLogout = () => {
    // logout logic
    console.log('logout')
    setIsOpen(false)
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
        <UserIcon />
        Ignacio Prados
      </button>
      {isOpen && (
        <ul className={styles.dropdownContent} role="listbox">
          <li role="option" className={styles.dropdownSelectContainer}>
            <button
              className={styles.dropdownSelect}
              onClick={handleLogout}
            >
              <LogoutIcon />
              Logout
            </button>
          </li>
        </ul>
      )}
    </div>
  )
}

export default LoggedDropdown