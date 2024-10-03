'use client'

import React, { createContext, useState, useEffect, useCallback } from 'react'
import i18n from '../i18n'

import UnitedStatesFlag from '@/components/icons/flags/UnitedStatesFlag'
import ArgentinaFlag from '@/components/icons/flags/ArgentinaFlag'
import SpainFlag from '@/components/icons/flags/SpainFlag'
import MexicoFlag from '@/components/icons/flags/MexicoFlag'

export const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
  // list of all available countries, add more countries if needed, the id is used to identify the country
  const allCountries = [
    { name: 'United States', flag: <UnitedStatesFlag />, language: 'en', id: 1 },
    { name: 'Argentina', flag: <ArgentinaFlag />, language: 'es', id: 2 },
    { name: 'Spain', flag: <SpainFlag />, language: 'es', id: 3 },
    { name: 'México', flag: <MexicoFlag />, language: 'es', id: 4 },
  ]

  const [selectedCountry, setSelectedCountry] = useState(allCountries[0])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const storedCountryId = localStorage.getItem('countryId')
    const initialCountry = allCountries.find(c => c.id === Number(storedCountryId)) || allCountries[0]
    setSelectedCountry(initialCountry)
    i18n.changeLanguage(initialCountry.language).then(() => {
      if (document) {
        document.documentElement.lang = initialCountry.language
      }
    })
  }, [])

  const changeCountry = useCallback((country) => {
    setSelectedCountry(country)
    i18n.changeLanguage(country.language).then(() => {
      if (document) {
        document.documentElement.lang = country.language
      }
      localStorage.setItem('countryId', country.id.toString())
    })
  }, [])

  return (
    <LanguageContext.Provider value={{ selectedCountry, changeCountry, allCountries, isClient }}>
      {children}
    </LanguageContext.Provider>
  )
}