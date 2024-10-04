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
import ExchangeReviewsPopup from '../exchangeReviewsPopup/ExchangeReviewsPopup'
import RateExchangePopup from '../rateExchangePopup/RateExchangePopup'



const ExchangeDetailsPopup = ({ showPopup, setShowPopup }) => {
  const { t } = useTranslation()

  const [showReviewsPopup, setShowReviewsPopup] = useState(false)
  const [showRateExchangePopup, setShowRateExchangePopup] = useState(false)

  const exchange = 'Binance'

  const foundedIn = '2017'
  const place = 'Cayman Islands'
  const employees = '12,000'
  const kyc = 'KYC'
  const users = '128M+'
  const countries = '140+'

  const reviewAverage = 4.4
  const reviewCounter = 320

  const networks = ['Polygon (MATIC)', 'Ethereum (ETH)', 'Binance (BSC)', 'Avalanche (AVAX)', 'Solana (SOL)', 'Cardano (ADA)', 'Polkadot (DOT)', 'Chainlink (LINK)']

  const paymentMethods = ["credit_card", "debit_card", "bank_transfer", "crypto_wallet"] // this is also being translated (see en.json && es.json)

  if (showPopup) {
    return (
      <PopupSkeleton 
        setShowPopup={setShowPopup}
        logo={<img src='/img/binance-logo-example.png'></img>}
        title={exchange}
        hide={showReviewsPopup || showRateExchangePopup}
      >
        <>
          <div className={styles.middle}>
            <div className={styles.info}>
              {foundedIn && <p className={styles.infoValue}><CalendarIcon aria-hidden="true" />{t('founded in')} {foundedIn}</p>}
              {place && <p className={styles.infoValue}><PointerIcon aria-hidden="true" />{place}</p>}
              {users && <p className={styles.infoValue}><UsersIcon aria-hidden="true" />{users} {t('monthly users')}</p>}
              {employees && <p className={styles.infoValue}><BuildingIcon aria-hidden="true" />{employees} {t('employees')}</p>}
              {countries && <p className={styles.infoValue}><WorldIcon aria-hidden="true" />{countries} {t('countries')}</p>}
              {kyc && <p className={styles.infoValue}><FingerprintIcon aria-hidden="true" />{t('has')} {kyc}</p>}
            </div>
            <div className={styles.reviewsContainer}>
              <div className={styles.reviews}>
                <p className={styles.reviewsAverage}>{reviewAverage}</p>
                <StarsViewer reviewAverage={reviewAverage} />
                <p className={styles.reviewsCounter}>({reviewCounter})</p>
              </div>
              <button onClick={() => setShowReviewsPopup(true)} className={styles.reviewsButton}>{t('see reviews')}</button>
            </div>
            <div className={styles.sliderContainer}>
              <p className={styles.label}>{t('networks')}</p>
              <Slider elements={networks} />
            </div>
            <div className={styles.comission}>
              <p className={styles.label}>{t('commission')}</p>
              <div className={styles.comissionValues}>
                <p className={styles.comissionValue}>
                  <span className={styles.comissionValueHighlight}>0.1%</span> {t('buying')}
                </p>
                <p className={styles.comissionValue}>
                  <span className={styles.comissionValueHighlight}>0.1%</span> {t('selling')}
                </p>
              </div>
            </div>
            <div className={styles.sliderContainer} style={{ paddingBottom: '0' }}>
              <p className={styles.label}>{t('payment methods')}</p>
              <Slider elements={paymentMethods.map(paymentMethod => t(`payment_methods.${paymentMethod}`))} />
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.socialMedia}>
              <XIcon />
              <InstagramIcon />
              <LinkedinIcon />
            </div>
            <div className={styles.buttons}>
              <button onClick={() => setShowRateExchangePopup(true)} className={styles.rateExchange}>{t('rate exchange')}</button>
              <a href={'https://binance.com'} target="_blank" rel="noopener noreferrer" className={styles.openExchange}>
                {t('open')} {exchange}
              </a>
            </div>
          </div>
          <ExchangeReviewsPopup showPopup={showReviewsPopup} setShowPopup={setShowReviewsPopup} />
          <RateExchangePopup showPopup={showRateExchangePopup} setShowPopup={setShowRateExchangePopup}/>
        </>
      </PopupSkeleton>
    )
  }
}

export default ExchangeDetailsPopup
