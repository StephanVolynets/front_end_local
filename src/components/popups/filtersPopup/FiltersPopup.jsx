'use client'

import styles from './FiltersPopup.module.css'

import { useTranslation } from 'react-i18next'

import PopupSkeleton from '@/components/popups/popupSkeleton/PopupSkeleton.jsx'

import { useState } from 'react'
import CountryFilterDropdown from '@/components/dropdowns/countryFilterDropdown/CountryFilterDropdown'
import StateFilterDropdown from '@/components/dropdowns/stateFilterDropdown/StateFilterDropdown'
import ExchangesSelector from '@/components/selectors/exchangesSelector/ExchangesSelector'

const FiltersPopup = ({ showPopup, setShowPopup }) => {
  const { t } = useTranslation()

  const [closePopup, setClosePopup] = useState(false)

  const [selectedCountry, setSelectedCountry] = useState(1)
  const [selectedState, setSelectedState] = useState('')
  const [selectedExchanges, setSelectedExchanges] = useState('') // returns array of excluded exchanges

  const handleFilters = () => {
    // logic here
    setClosePopup(true)
  }

  if (showPopup) {
    return (
      <PopupSkeleton setShowPopup={setShowPopup} closePopup={closePopup} setClosePopup={setClosePopup} title={t('filters')}>
        <div className={styles.middle}>
          <div className={styles.dropdownFilters}>
            <div className={styles.dropdown}>
              <label className={styles.label} htmlFor="country">{t('country')}</label>
              <CountryFilterDropdown selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} />
            </div>
            <div className={styles.dropdown}>
              <label className={styles.label} htmlFor="state">{t('state')}</label>
              <StateFilterDropdown selectedState={selectedState} setSelectedState={setSelectedState} selectedCountry={selectedCountry}/>
            </div>
          </div>
          <div className={styles.exchangesSelector}>
            <ExchangesSelector selectedExchanges={selectedExchanges} setSelectedExchanges={setSelectedExchanges}/>
          </div>
        </div>
        <div className={styles.bottom}>
          <button
            className={`${styles.button}`}
            onClick={handleFilters}
          >
            {t('filter')}
          </button>
        </div>
      </PopupSkeleton>
    )
  }

  return null
}

export default FiltersPopup
