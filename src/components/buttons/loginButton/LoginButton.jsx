'use client'

import styles from './LoginButton.module.css'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

import LoginPopup from '@/components/popups/loginPopup/LoginPopup'

const LoginButton = () => {
  const { t } = useTranslation()
  const [showPopup, setShowPopup] = useState(false)

  return (
    <>
      <button className={styles.button} onClick={() => setShowPopup(!showPopup)}>
        {t('login')}
      </button>
      <LoginPopup showPopup={showPopup} setShowPopup={setShowPopup} />
    </>
  )
}

export default LoginButton
