'use client'

import styles from './not-found.module.css'

import SilicoreLogoAndText from "@/components/icons/silicoreLogoAndText"
import Link from 'next/link'

const NotFound = () => {
  return (
    <div className={styles.main}>
      <SilicoreLogoAndText className={styles.logo} />
      <div className={styles.notFound}>
        <p className={styles.title}>4<span className={styles.accent}>0</span>4</p>
        <p className={styles.subtitle}>It looks like the page you’re trying to access doesn’t exist.</p>
        <Link href='/' className={styles.button}>Back to home</Link>
      </div>
    </div>
  )
}

export default NotFound
