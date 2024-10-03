'use client'

import styles from './template.module.css'

import '../i18n'
import { LanguageProvider, LanguageContext } from '@/context/LanguageContext'
import React, { useContext, useEffect } from 'react'

export default function Template ({ children }) {
  return (
    <LanguageProvider>
      <HtmlLanguage>
        <main className={styles.main}>
          {children}
        </main>
      </HtmlLanguage>
    </LanguageProvider>
  )
}

const HtmlLanguage = ({ children }) => {
  const { selectedCountry } = useContext(LanguageContext)

  useEffect(() => {
    if (document && selectedCountry) {
      document.documentElement.lang = selectedCountry.language
    }
  }, [selectedCountry])

  return <>{children}</>
}