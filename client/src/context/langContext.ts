import React from 'react'

export type Languages = 'vi' | 'en'
export type LangContextObj = {
  language: Languages
  switchLanguage: (lang: Languages) => void
}
export default React.createContext<LangContextObj>({
  language: 'en',
  switchLanguage: () => {},
})
