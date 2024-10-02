'use client'

import styles from './TopBar.module.css'

import Link from 'next/link'

import SilicoreLogo from '@/components/icons/silicoreLogo'
import CountryButton from '@/components/dropdowns/countryDropdown/CountryDropdown'
import LoginButton from '@/components/buttons/loginButton/LoginButton'

const TopBar = () => {
  
  return (
    <nav className={styles.topbar}>
      <Link href="/">
        <SilicoreLogo />
      </Link>
      <div className={styles.buttons}>
        <CountryButton />
        <LoginButton />
      </div>
    </nav>
  )
}

export default TopBar
