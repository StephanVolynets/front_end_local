'use client'

import Link from 'next/link'
import styles from './Footer.module.css'

import { useTranslation, Trans } from 'react-i18next'
import { usePathname } from 'next/navigation'

import SilicoreText from '@/components/icons/silicoreText'

const Footer = () => {
  const { t } = useTranslation()

  const pathname = usePathname()

  return (
    <footer className={styles.footer}>
      <p className={styles.about}>{t('footer about')}</p>
      <nav className={styles.navigation} aria-label="Footer Navigation">
        <div className={styles.links}>
          {pathname !== '/' && <Link className={styles.link} href='/'>{t('home')}</Link>}
          {pathname !== '/privacy-policy' && <Link className={styles.link} href='/privacy-policy'>{t('privacy policy')}</Link>}
        </div>
        <div className={styles.contact}>
          <p className={styles.contactText}>{t('contact')}</p>
          <a className={styles.mailto} href="mailto:brooks@silicore.io">brooks@silicore.io</a>
        </div>
      </nav>
      <SilicoreText className={styles.silicoreText} alt="Silicore Logo" />
      <section className={styles.info}>
        <p className={styles.infoText}>{t('copyright')}</p>
        <p className={styles.infoText}>
          <Trans 
            i18nKey="ignacio prados" 
            components={[<a href='https://www.linkedin.com/in/ignaprados/' className={styles.highlight} key="highlight" />]}
          />
        </p>
      </section>
    </footer>
  )
}

export default Footer
