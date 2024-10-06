'use client'

import styles from './MainCryptosPopup.module.css'

import { useTranslation } from 'react-i18next'

import PopupSkeleton from '@/components/popups/popupSkeleton/PopupSkeleton.jsx'
import MainCryptoButton from '@/components/buttons/mainCryptoButton/MainCryptoButton'

import { useState } from 'react'

const MainCryptosPopup = ({ showPopup, setShowPopup }) => {
  const { t } = useTranslation()

  const [closePopup, setClosePopup] = useState(false)

  const cryptos = [
    { id: 1, logo: '/img/bitcoin-logo.png', name: 'Bitcoin' },
    { id: 2, logo: '/img/ethereum-logo.png', name: 'Ethereum' },
    { id: 3, logo: '/img/stellar-logo.png', name: 'Stellar' },
    { id: 4, logo: '/img/bitcoin-logo.png', name: 'Bitcoin' },
    { id: 5, logo: '/img/ethereum-logo.png', name: 'Ethereum' },
    { id: 6, logo: '/img/stellar-logo.png', name: 'Stellar' },
    { id: 7, logo: '/img/bitcoin-logo.png', name: 'Bitcoin' },
    { id: 8, logo: '/img/ethereum-logo.png', name: 'Ethereum' },
    { id: 9, logo: '/img/stellar-logo.png', name: 'Stellar' },
  ]

  const [selectedCryptos, setSelectedCryptos] = useState([])

  const handleMainCryptos = () => {
    // logic here
    setClosePopup(true)
  }

  const handleSelect = (id) => {
    setSelectedCryptos((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((cryptoId) => cryptoId !== id)
      } else {
        if (prevSelected.length < 3) {
          return [...prevSelected, id]
        }
        return prevSelected
      }
    })
  }

  const isSaveDisabled = selectedCryptos.length < 1 || selectedCryptos.lenght > 3

  if (showPopup) {
    return (
      <PopupSkeleton setShowPopup={setShowPopup} closePopup={closePopup} setClosePopup={setClosePopup} title={'Main cryptos'}>
        <div className={styles.middle}>
          <div className={styles.cryptos}>
            {cryptos.map((crypto) => (
              <MainCryptoButton
                key={crypto.id}
                id={crypto.id}
                logo={crypto.logo}
                name={crypto.name}
                isSelected={selectedCryptos.includes(crypto.id)}
                onSelect={handleSelect}
                disableSelect={
                  !selectedCryptos.includes(crypto.id) && selectedCryptos.length >= 3
                }
              />
            ))}
          </div>
        </div>
        <div className={styles.bottom}>
          <p className={styles.info}>{t('you can choose up to 3 cryptos.')}</p>
          <button
            className={`${styles.button} ${isSaveDisabled ? styles.disabled : ''}`}
            disabled={isSaveDisabled}
            onClick={handleMainCryptos}
          >
            {t('save')}
          </button>
        </div>
      </PopupSkeleton>
    )
  }

  return null
}

export default MainCryptosPopup
