'use client'

import styles from './GoogleButton.module.css'

import { useTranslation } from 'react-i18next'

import GoogleIcon from '@/components/icons/googleIcon'

const GoogleButton = () => {
  const { t } = useTranslation()

  return (
    <button className={styles.googleButton} type="button">
      <GoogleIcon className={styles.googleIcon} aria-hidden="true" />
      <span>{t('login-google')}</span>
    </button>
  )
}

export default GoogleButton
