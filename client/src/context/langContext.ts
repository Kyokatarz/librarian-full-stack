import React from 'react'

export type Languages = 'vi' | 'en'
export type LangContextObj = {
  language: Languages
  switchLanguage: (lang: Languages) => void
}
export const LanguageContext = React.createContext<LangContextObj>({
  language: 'en',
  switchLanguage: () => {},
})
