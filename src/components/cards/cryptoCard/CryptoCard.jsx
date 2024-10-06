'use client'

import styles from './CryptoCard.module.css'

import { formatThousands } from '@/utils/formatThousands'

import TriangleIcon from '@/components/icons/triangleIcon'

const CryptoCard = ({crypto}) => {

  const percentage = ((crypto.currentPrice - crypto.lastPrice) / crypto?.lastPrice) * 100

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <img className={styles.logo} src={crypto?.logo} alt="" />
        <p className={styles.name}>{crypto?.name}</p>
      </div>
      <div className={styles.bottom}>
        <p className={styles.price}>US$ {formatThousands(crypto.currentPrice)}</p>
        <p className={`${percentage > 0 ? styles.green : percentage < 0 ? styles.red : styles.grey}`}>
          <TriangleIcon className={`${percentage > 0 ? styles.green : percentage < 0 ? styles.red : styles.grey}`}/>
          {Math.abs(percentage).toFixed(2)}%
        </p>
      </div>
    </div>
  )
}

export default CryptoCard
