import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { LanguageContext } from '../../context/langContext'
import { languages } from '../../languages/languages'
import './Introduction.scss'

const Introduction = () => {
  const { language } = useContext(LanguageContext)
  return (
    <div className="Introduction">
      <div className="Introduction__Bg-img"></div>
      <h1>Introduction</h1>
      <div className="Introduction__Content">
        <h2 className="text-white">{languages[language].introduction.title}</h2>
        <p>
          {languages[language].introduction.line1} <br />
          {languages[language].introduction.line2} <br />
          {languages[language].introduction.line3} <br />
          {languages[language].introduction.line4}
        </p>
        <Link to="/allbooks">
          <Button className="Introduction__Button">
            {languages[language].goToLibrary} &gt;&gt;
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default Introduction
