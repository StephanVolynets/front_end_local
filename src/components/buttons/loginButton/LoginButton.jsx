'use client'

import styles from './LoginButton.module.css'
import { useTranslation } from 'react-i18next'

const LoginButton = () => {
  const { t } = useTranslation()

  return (
    <button className={styles.button}>
      {t('login')}
    </button>
  )
}

export default LoginButton
