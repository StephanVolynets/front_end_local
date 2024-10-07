'use client'

import styles from './ExchangeTable.module.css'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import ExchangeRow from '@/components/tables/rows/Exchange'
import NoResults from '@/components/tables/noResults/NoResults'
import SortArrow from '@/components/icons/sortArrow'
import ExchangeDetailsPopup from '@/components/popups/exchangeDetailsPopup/ExchangeDetailsPopup'


const ExchangeTable = ({ exchanges }) => {
  const { t } = useTranslation();

  const [sortState, setSortState] = useState({ // sort state for table
    rating: null,
    buyPrice: null,
    spread: null,
    sellPrice: null
  });

  const [selectedExchangeIndex, setSelectedExchangeIndex] = useState(null);

  const handleSort = (column, direction) => {
    setSortState(prevState => ({
      ...prevState,
      [column]: prevState[column] === direction ? null : direction
    }));
  };

  const goToPreviousExchange = () => {
    setSelectedExchangeIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const goToNextExchange = () => {
    setSelectedExchangeIndex(prevIndex => 
      prevIndex < exchanges.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.headerTable}>
              <div className={styles.headerContent}>
                <SortArrows column="rating" sortState={sortState} handleSort={handleSort} />
                Rating
              </div>
            </th>
            <th className={styles.headerTable}>
              <div className={styles.headerContent}>
                <SortArrows column="buyPrice" sortState={sortState} handleSort={handleSort} />
                Buy price
              </div>
            </th>
            <th className={styles.headerTable}>
              <div className={styles.headerContent}>
                <SortArrows column="spread" sortState={sortState} handleSort={handleSort} />
                Spread
              </div>
            </th>
            <th className={styles.headerTable}>
              <div className={styles.headerContent}>
                <SortArrows column="sellPrice" sortState={sortState} handleSort={handleSort} />
                Sell price
              </div>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {exchanges?.length === 0 ? (
            <tr>
              <td colSpan="5">
                <NoResults
                  title={t('no exchanges found')}
                  subtitle={t('sorry, we couldn’t find any exchanges matching your criteria right now.')}
                />
              </td>
            </tr>
          ) : (
            exchanges.map((exchange, index) => (
              <ExchangeRow 
                key={exchange.name + index} 
                exchange={exchange}
                onClick={() => setSelectedExchangeIndex(index)}
              />
            ))
          )}
        </tbody>
      </table>

      {selectedExchangeIndex !== null && (
        <ExchangeDetailsPopup 
          showPopup={selectedExchangeIndex !== null}
          setShowPopup={() => setSelectedExchangeIndex(null)}
          exchange={exchanges[selectedExchangeIndex]}
          goToPreviousExchange={goToPreviousExchange}
          goToNextExchange={goToNextExchange}
          isFirstExchange={selectedExchangeIndex === 0}
          isLastExchange={selectedExchangeIndex === exchanges.length - 1}
        />
      )}
    </>
  )
}

const SortArrows = ({ column, sortState, handleSort }) => (
  <div className={styles.arrows}>
    <SortArrow 
      className={`${styles.sortArrowUp} ${sortState[column] === 'asc' ? styles.activeUp : ''}`} 
      onClick={() => handleSort(column, 'asc')}
    />
    <SortArrow 
      className={`${styles.sortArrowDown} ${sortState[column] === 'desc' ? styles.activeDown : ''}`} 
      onClick={() => handleSort(column, 'desc')}
    />
  </div>
);

export default ExchangeTable