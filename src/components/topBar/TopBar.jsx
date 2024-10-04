'use client'

import styles from './TopBar.module.css'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'

import SilicoreLogo from '@/components/icons/silicoreLogo'
import CountryDropdown from '@/components/dropdowns/countryDropdown/CountryDropdown'
import LoginButton from '@/components/buttons/loginButton/LoginButton'
import LoggedDropdown from '@/components/dropdowns/loggedDropdown/LoggedDropdown'

import HamburgerIcon from '@/components/icons/hamburgerIcon'

const TopBar = () => {
  const isLogged = false
  const { t } = useTranslation()

  const pathname = usePathname()
  
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
      <button className={styles.hamburger}><HamburgerIcon /></button>
    </nav>
  )
}

export default TopBar
