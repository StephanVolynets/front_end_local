'use client'

import styles from './NoResults.module.css'

import SadFaceIcon from '@/components/icons/sadFaceIcon'

const NoResults = ({ title, subtitle, style }) => {
  return (
    <div className={styles.noActivity} style={style}>
      <SadFaceIcon className={styles.noActivityIcon} />
      <p className={styles.noActivityTitle}>{title}</p>
      <p className={styles.noActivitySubtitle}>{subtitle}</p>
    </div>
  )
}

export default NoResults
