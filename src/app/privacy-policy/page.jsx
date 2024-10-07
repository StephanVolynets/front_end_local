'use client'

import styles from './privacy-policy.module.css'

import { useTranslation, Trans } from 'react-i18next'

import TopBar from '@/components/topBar/TopBar'
import Footer from '@/components/footer/Footer'

const Dashboard = () => {
  const { t } = useTranslation()

  return (
    <>
      <TopBar />
      <main className={styles.main}>
        <h1 className={styles.title}>{t('privacy policy title')}</h1>
        <h2 className={styles.subtitle}>{t('privacy policy subtitle')}</h2>
        <div className={styles.content}>
          <p className={styles.paragraph}>
            <Trans 
              i18nKey="privacy policy paragraph one" 
              components={[<span className={styles.highlight} key="highlight" />]}
            />
          </p>
          <br />
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <Trans 
                i18nKey="privacy policy bullet one" 
                components={[<a href='https://silicore.io' className={styles.underline} key="underline" target="_blank" rel="noopener noreferrer" />]}
              />
            </li>
            <li className={styles.listItem}>{t('privacy policy bullet two')}</li>
          </ul>
          <br />
          <p className={styles.paragraph}>
            <Trans 
              i18nKey="privacy policy paragraph two" 
              components={[<span className={styles.highlight} key="highlight" />]}
            />
          </p>
        </div>
        <div className={styles.content2}>
          <h2 className={styles.titleTwo}>{t('privacy policy title two')}</h2>
          <p className={styles.paragraph}>
            <Trans 
              i18nKey="privacy policy paragraph three" 
              components={[<span className={styles.highlight} key="highlight" />]}
            />
          </p>
          <p className={styles.paragraph}>
            <Trans 
              i18nKey="privacy policy paragraph four" 
              components={{
                1: <a href='https://silicore.io/privacy-policy'
                  className={styles.underline} key="underline" 
                  target="_blank" rel="noopener noreferrer"
                />,
                2: <span className={styles.highlight} key="highlight" />
              }}
            />
          </p>
          <p className={styles.paragraph}>
            <Trans 
              i18nKey="privacy policy paragraph five" 
              components={[<span className={styles.highlight} key="highlight" />]}
            />
          </p>
          <p className={styles.paragraph}>
            <Trans 
              i18nKey="privacy policy paragraph six" 
              components={{
                1: <a href='https://silicore.io/privacy-policy#othersources'
                  className={styles.underline} key="underline" 
                  target="_blank" rel="noopener noreferrer"
                />,
                2: <span className={styles.highlight} key="highlight" />
              }}
            />
          </p>
          <p className={styles.paragraph}>
            <Trans 
              i18nKey="privacy policy paragraph seven" 
              components={{
                1: <a href='https://silicore.io/privacy-policy#infouse' 
                  className={styles.underline} key="underline" 
                  target="_blank" rel="noopener noreferrer"
                />,
                2: <span className={styles.highlight} key="highlight" />
              }}
            />
          </p>
          <p className={styles.paragraph}>
            <Trans 
              i18nKey="privacy policy paragraph eight" 
              components={{
                1: <a href='https://silicore.io/privacy-policy#whoshare'
                  className={styles.underline} key="underline" 
                  target="_blank" rel="noopener noreferrer"
                />,
                2: <span className={styles.highlight} key="highlight" />
              }}
            />
          </p>
          <p className={styles.paragraph}>
            <Trans 
              i18nKey="privacy policy paragraph nine" 
              components={{
                1: <a href='https://silicore.io/privacy-policy#infosafe'
                  className={styles.underline} key="underline" 
                  target="_blank" rel="noopener noreferrer"
                />,
                2: <span className={styles.highlight} key="highlight" />
              }}
            />
          </p>
          <p className={styles.paragraph}>
            <Trans 
              i18nKey="privacy policy paragraph ten" 
              components={{
                1: <a href='https://silicore.io/privacy-policy#privacyrights'
                  className={styles.underline} key="underline" 
                  target="_blank" rel="noopener noreferrer"
                />,
                2: <span className={styles.highlight} key="highlight" />
              }}
            />
          </p>
          <p className={styles.paragraph}>
            <Trans 
              i18nKey="privacy policy paragraph eleven" 
              components={{
                1: <a href='https://app.termly.io/notify/16ad9433-8337-48bc-b202-5ed7d5af4160' 
                  className={styles.underline} key="underline" 
                  target="_blank" rel="noopener noreferrer"
                />,
                2: <span className={styles.highlight} key="highlight" />
              }}
            />
          </p>
          <p className={styles.paragraph}>
            <Trans 
              i18nKey="privacy policy paragraph twelve" 
              components={{
                1: <a href='https://silicore.io/privacy-policy#toc' 
                  className={styles.underline} key="underline" 
                  target="_blank" rel="noopener noreferrer"
                />,
                2: <span className={styles.highlight} key="highlight" />
              }}
            />
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Dashboard
