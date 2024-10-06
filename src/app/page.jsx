'use client'

import styles from './dashboard.module.css'

import { useState, useEffect } from 'react'
import { useTranslation, Trans } from 'react-i18next'
import { formatThousands } from '@/utils/formatThousands'

import TopBar from '@/components/topBar/TopBar'
import Carrousel from '@/components/carrousel/Carrousel'
import Footer from '@/components/footer/Footer'
import ExchangeDetailsPopup from '@/components/popups/exchangeDetailsPopup/ExchangeDetailsPopup'
import CryptoCard from '@/components/cards/cryptoCard/CryptoCard'
import PlusIcon from '@/components/icons/plusIcon'
import CryptoFilterDropdown from '@/components/dropdowns/cryptoFilterDropdown/CryptoFilterDropdown'
import FiatFilterDropdown from '@/components/dropdowns/fiatFilterDropdown/FiatFilterDropdown'
import DollarIcon from '@/components/icons/dollarIcon'
import FilterIcon from '@/components/icons/filterIcon'

const Dashboard = () => {
  const { t } = useTranslation()

  const [showPopup, setShowPopup] = useState(false)
  const [selectedCrypto, setSelectedCrypto] = useState(1)
  const [selectedFiat, setSelectedFiat] = useState(1)
  const [amount, setAmount] = useState('')

  const exchangesData =    { 
    name: 'Binance',
    logo: '/img/binance-logo-example.png',
    foundedIn: '2017',
    place: 'Cayman Islands',
    employees: '12,000',
    kyc: 'KYC',
    users: '128M+',
    countries: '140+',
    actualprice: 65286.4,
    lastprice: 65750.6,
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

  const cryptos = [
    { 
      name: 'Bitcoin',
      symbol: 'BTC',
      logo: '/img/bitcoin-logo.png',
      currentPrice: 65286.4,
      lastPrice: 65750.6,
    },
    { 
      name: 'Ethereum',
      symbol: 'ETH',
      logo: '/img/ethereum-logo.png',
      currentPrice: 3456.78,
      lastPrice: 3400.21,
    },
    { 
      name: 'Stellar',
      symbol: 'XLM',
      logo: '/img/stellar-logo.png',
      currentPrice: 0.1234,
      lastPrice: 0.1234,
    }
  ]

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/,/g, '')
    
    // handle case when there for example user sets a point after some numbers there arent any numbers yet
    if (value === '' || /^\d*\.?\d*$/.test(value) || /^\d+\.$/.test(value)) {
      setAmount(formatThousands(value))
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
        <div className={styles.cryptoCardsContainer}>
          {cryptos.map((crypto, index) => (
            <CryptoCard key={index} crypto={crypto} />
          ))}
          <button className={styles.addCardButton}>
            <PlusIcon />
          </button>
        </div>
        <div className={styles.filters}>
          <CryptoFilterDropdown 
            selectedCrypto={selectedCrypto} 
            setSelectedCrypto={setSelectedCrypto} 
          />
          <FiatFilterDropdown 
            selectedFiat={selectedFiat} 
            setSelectedFiat={setSelectedFiat} 
          />
          <div className={styles.amountFilterContainer}>
            <DollarIcon className={styles.dollarIcon}/>
            <input 
              type="text" 
              inputMode="decimal" 
              className={styles.amountFilter} 
              placeholder='1,247.45'
              value={amount}
              onChange={handleAmountChange}
            />
          </div>
          <button className={styles.filterButton}>{t('filter')} <FilterIcon/></button>
        </div>
        <Carrousel />
      </main>
      <button onClick={() => setShowPopup(!showPopup)}>Exchange Details Popup</button>

      <ExchangeDetailsPopup showPopup={showPopup} setShowPopup={setShowPopup} exchangeData={exchangesData[0]}/>
      <Footer />
    </>
  )
}

export default Dashboard
