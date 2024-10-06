'use client'

import styles from './TopBar.module.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'

import SilicoreLogo from '@/components/icons/silicoreLogo'
import CountryDropdown from '@/components/dropdowns/countryDropdown/CountryDropdown'
import LoginButton from '@/components/buttons/loginButton/LoginButton'
import LoggedDropdown from '@/components/dropdowns/loggedDropdown/LoggedDropdown'

import HamburgerIcon from '@/components/icons/hamburgerIcon'
import CloseIcon from '@/components/icons/closeIcon'

const TopBar = () => {
  const { t } = useTranslation()
  const pathname = usePathname()

  const [showButtons, setShowButtons] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const isLogged = false

  const handleToggleMenu = () => {
    if (showButtons) {
      setIsClosing(true)
      setTimeout(() => {
        setShowButtons(false)
        setIsClosing(false)
      }, 200) // animation duration
    } else {
      setShowButtons(true)
    }
  }

  return (
    <nav className={styles.topbar}>
      <div className={styles.navigation}>
        <Link href="/">
          <SilicoreLogo withText={true}/>
        </Link>
        {pathname === '/privacy-policy' &&
         <Link className={styles.link} href='/'>{t('home')}</Link>
        }
      </div>
      <div className={styles.buttons}>
        <CountryDropdown />
        {isLogged ? <LoggedDropdown /> : <LoginButton />}
      </div>
      <button onClick={handleToggleMenu} className={styles.hamburger}>
        {showButtons || isClosing
          ? <CloseIcon />
          : <HamburgerIcon />
        }
      </button>
      {(showButtons || isClosing) &&
        <div className={`${styles.mobileButtons} ${isClosing ? styles.closing : ''}`}>
          <CountryDropdown />
          {!isLogged ? <LoggedDropdown /> : <LoginButton />}
        </div>
      }
    </nav>
  )
}

export default TopBar
