'use client'

import styles from './dashboard.module.css'
import TopBar from '@/components/topBar/TopBar'
import { useTranslation, Trans } from 'react-i18next'

const Dashboard = () => {
  const { t } = useTranslation()

  return (
    <>
      <TopBar />
      <main className={styles.main}>
        <aside className={styles.addBanner}>
          <img className={styles.addImg} src="/img/add-example-1.png" alt={t('Cripto Add')} />
        </aside>
        <h1 className={styles.title}>
          <Trans 
            i18nKey="homepage title" 
            components={[<span className={styles.highlight} key="highlight" />]}
          />
        </h1>
      </main>
    </>
  )
}

export default Dashboard
