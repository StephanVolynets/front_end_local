'use client'

import styles from './TopBar.module.css'

import Link from 'next/link'

import SilicoreLogo from '@/components/icons/silicoreLogo'
import CountryDropdown from '@/components/dropdowns/countryDropdown/CountryDropdown'
import LoginButton from '@/components/buttons/loginButton/LoginButton'
import LoggedDropdown from '@/components/dropdowns/loggedDropdown/LoggedDropdown'

const TopBar = () => {
  const isLogged = false
  
  return (
    <nav className={styles.topbar}>
      <Link href="/">
        <SilicoreLogo withText={true}/>
      </Link>
      <div className={styles.buttons}>
        <CountryDropdown />
        {isLogged ? <LoggedDropdown /> : <LoginButton />}
      </div>
    </nav>
  )
}

export default TopBar
