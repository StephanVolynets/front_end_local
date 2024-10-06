'use client'

import styles from './ExchangeDetailsPopup.module.css'

import { useTranslation } from 'react-i18next'
import { useState } from 'react'

import PopupSkeleton from '@/components/popups/popupSkeleton/PopupSkeleton.jsx'
import StarsViewer from '@/components/stars/starsViewer/StarsViewer'
import Slider from '@/components/slider/Slider'

import WorldIcon from '@/components/icons/worldIcon'
import FingerprintIcon from '@/components/icons/fingerprintIcon'
import UsersIcon from '@/components/icons/usersIcon'
import BuildingIcon from '@/components/icons/buildingIcon'
import PointerIcon from '@/components/icons/pointerIcon'
import CalendarIcon from '@/components/icons/calendarIcon'
import XIcon from '@/components/icons/xIcon'
import InstagramIcon from '@/components/icons/instagramIcon'
import LinkedinIcon from '@/components/icons/linkedinIcon'
import ExchangeReviewsPopup from '@/components/popups/exchangeReviewsPopup/ExchangeReviewsPopup'
import RateExchangePopup from '@/components/popups/rateExchangePopup/RateExchangePopup'

const ExchangeDetailsPopup = ({ showPopup, setShowPopup, exchangeData }) => {
  const { t } = useTranslation()

  const [showReviewsPopup, setShowReviewsPopup] = useState(false)
  const [showRateExchangePopup, setShowRateExchangePopup] = useState(false)

  if (showPopup) {
    return (
      <PopupSkeleton 
        setShowPopup={setShowPopup}
        logo={exchangeData.logo}
        title={exchangeData.name}
        hide={showReviewsPopup || showRateExchangePopup}
      >
        <>
          <div className={styles.middle}>
            <div className={styles.info}>
              {exchangeData.foundedIn && <p className={styles.infoValue}><CalendarIcon aria-hidden="true" />{t('founded in')} {exchangeData.foundedIn}</p>}
              {exchangeData.place && <p className={styles.infoValue}><PointerIcon aria-hidden="true" />{exchangeData.place}</p>}
              {exchangeData.users && <p className={styles.infoValue}><UsersIcon aria-hidden="true" />{exchangeData.users} {t('monthly users')}</p>}
              {exchangeData.employees && <p className={styles.infoValue}><BuildingIcon aria-hidden="true" />{exchangeData.employees} {t('employees')}</p>}
              {exchangeData.countries && <p className={styles.infoValue}><WorldIcon aria-hidden="true" />{exchangeData.countries} {t('countries')}</p>}
              {exchangeData.kyc && <p className={styles.infoValue}><FingerprintIcon aria-hidden="true" />{t('has')} {exchangeData.kyc}</p>}
            </div>
            <div className={styles.reviewsContainer}>
              <div className={styles.reviews}>
                <p className={styles.reviewsAverage}>{exchangeData.reviewAverage}</p>
                <StarsViewer reviewAverage={exchangeData.reviewAverage} />
                <p className={styles.reviewsCounter}>({exchangeData.reviewCounter})</p>
              </div>
              <button onClick={() => setShowReviewsPopup(true)} className={styles.reviewsButton}>{t('see reviews')}</button>
            </div>
            <div className={styles.sliderContainer}>
              <p className={styles.label}>{t('networks')}</p>
              <Slider elements={exchangeData.networks} />
            </div>
            <div className={styles.comission}>
              <p className={styles.label}>{t('commission')}</p>
              <div className={styles.comissionValues}>
                <p className={styles.comissionValue}>
                  <span className={styles.comissionValueHighlight}>{exchangeData.commission.buying}</span> {t('buying')}
                </p>
                <p className={styles.comissionValue}>
                  <span className={styles.comissionValueHighlight}>{exchangeData.commission.selling}</span> {t('selling')}
                </p>
              </div>
            </div>
            <div className={styles.sliderContainer} style={{ paddingBottom: '0' }}>
              <p className={styles.label}>{t('payment methods')}</p>
              <Slider elements={exchangeData.paymentMethods.map(paymentMethod => t(`payment_methods.${paymentMethod}`))} />
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.socialMedia}>
              <p className={styles.hiddenLabel}>Socials</p>
              <div className={styles.icons}>
                <a href={exchangeData.xUrl}><XIcon /></a>
                <a href={exchangeData.instagramUrl}><InstagramIcon /></a>
                <a href={exchangeData.linkedinUrl}><LinkedinIcon /></a>
              </div>
            </div>
            <div className={styles.buttons}>
              <button onClick={() => setShowRateExchangePopup(true)} className={styles.rateExchange}>{t('rate exchange')}</button>
              <a href={'https://binance.com'} target="_blank" rel="noopener noreferrer" className={styles.openExchange}>
                {t('open')} {exchangeData.name}
              </a>
            </div>
          </div>
          <ExchangeReviewsPopup 
            showPopup={showReviewsPopup} 
            setShowPopup={setShowReviewsPopup} 
            exchange={exchangeData}
          />
          <RateExchangePopup 
            showPopup={showRateExchangePopup} 
            setShowPopup={setShowRateExchangePopup}
            logo={exchangeData.logo}
            exchange={exchangeData.name}
          />
        </>
      </PopupSkeleton>
    )
  }
}

export default ExchangeDetailsPopup