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

  const exchangeData = { // assuming the structure of the exchange...
    name: 'Binance',
    logo: '/img/binance-logo-example.png',
    foundedIn: '2017',
    place: 'Cayman Islands',
    employees: '12,000',
    kyc: 'KYC',
    users: '128M+',
    countries: '140+',
    xUrl: 'https://x.com/binance',
    instagramUrl: 'https://instagram.com/binance',
    linkedinUrl: 'https://linkedin.com/binance',
    reviewAverage: 4.4,
    reviewCounter: 320,
    networks: ['Polygon (MATIC)', 'Ethereum (ETH)', 'Binance (BSC)', 'Avalanche (AVAX)', 'Solana (SOL)', 'Cardano (ADA)', 'Polkadot (DOT)', 'Chainlink (LINK)'],
    paymentMethods: ["credit_card", "debit_card", "bank_transfer", "crypto_wallet"],
    commission: {
      buying: '0.1%',
      selling: '0.1%'
    }
  }

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

      <ExchangeDetailsPopup showPopup={showPopup} setShowPopup={setShowPopup} exchangeData={exchangeData}/>

      <Footer />
    </>
  )
}

export default Dashboard
