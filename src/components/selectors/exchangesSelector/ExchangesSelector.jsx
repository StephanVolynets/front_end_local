'use client'

import styles from './ExchangesSelector.module.css'

const ExchangesSelector = ({selectedExchanges, setSelectedExchanges}) => {

  const exchanges = [
    "Binance", "BingX", "OKX", "Crypto.com", "Gemini", "Bitstamp",
    "Kraken", "Coinbase", "Changelly", "Gate.io", "Bitrue", "HTX"
  ]

  const toggleExchange = (exchange) => {
    setSelectedExchanges(prev => 
      prev.includes(exchange)
        ? prev.filter(e => e !== exchange)
        : [...prev, exchange]
    )
  }

  return (
    <div className={styles.selector}>
      <label className={styles.label} htmlFor="exchanges">Exchanges</label>
      <div className={styles.exchanges}>
        {exchanges.map((exchange, index) => (
          <ExchangeCapsule 
            key={index} 
            name={exchange} 
            isSelected={selectedExchanges.includes(exchange)}
            onClick={() => toggleExchange(exchange)}
          />
        ))}
      </div>
    </div>
  )
}

export default ExchangesSelector

const ExchangeCapsule = ({ name, isSelected, onClick }) => {
  return (
    <div 
      className={`${styles.exchangeCapsule} ${isSelected ? styles.selected : ''}`}
      onClick={onClick}
    >
      <span>{name}</span>
    </div>
  )
}
