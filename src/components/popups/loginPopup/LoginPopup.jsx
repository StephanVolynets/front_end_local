'use client'

import styles from './LoginPopup.module.css'

import { useTranslation } from 'react-i18next'

import PopupSkeleton from '@/components/popups/popupSkeleton/PopupSkeleton.jsx'
import AwardIcon from '@/components/icons/awardIcon'
import ReviewIcon from '@/components/icons/reviewIcon'
import ShieldIcon from '@/components/icons/shieldIcon'
import GoogleButton from '@/components/buttons/googleButton/GoogleButton'
import SilicoreLogo from '@/components/icons/silicoreLogo'

const LoginPopup = ({ showPopup, setShowPopup }) => {
  const { t } = useTranslation()
  if (showPopup) {
    return (
      <PopupSkeleton setShowPopup={setShowPopup} width={365} logo={<SilicoreLogo className={styles.logo}/>}>
        <div className={styles.middle}>
          <h2 className={styles.title}>{t('login-title')}</h2>
          <p className={styles.subtitle}>{t('login-subtitle')}</p>
          <ul className={styles.features}>
            <li className={styles.feature}><AwardIcon aria-hidden="true" /> {t('login-features-1')}</li>
            <li className={styles.feature}><ReviewIcon aria-hidden="true" /> {t('login-features-2')}</li>
            <li className={styles.feature}><ShieldIcon aria-hidden="true" /> {t('login-features-3')}</li>
          </ul>
        </div>
        <div className={styles.bottom}>
          <GoogleButton />
        </div>
      </PopupSkeleton>
    )
  }
}

export default LoginPopup
