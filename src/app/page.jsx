'use client'

import styles from './dashboard.module.css'

import { useState } from 'react'
import { useTranslation, Trans } from 'react-i18next'

import TopBar from '@/components/topBar/TopBar'
import Carrousel from '@/components/carrousel/Carrousel'
import Footer from '@/components/footer/Footer'
import ExchangeDetailsPopup from '@/components/popups/exchangeDetailsPopup/ExchangeDetailsPopup'

const Dashboard = () => {
  const { t } = useTranslation()

  const [showPopup, setShowPopup] = useState(false)

  return (
    <>
      <TopBar />
      <main className={styles.main}>
        <Carrousel />
        <h1 className={styles.title}>
          <Trans 
            i18nKey="homepage title" 
            components={[<span className={styles.highlight} key="highlight" />]}
          />
        </h1>
        <h2 className={styles.subtitle}>{t('homepage subtitle')}</h2>
      </main>
      <button onClick={() => setShowPopup(!showPopup)}>Exchange Details Popup</button>

      <ExchangeDetailsPopup showPopup={showPopup} setShowPopup={setShowPopup}/>

      <Footer />
    </>
  )
}

export default Dashboard
