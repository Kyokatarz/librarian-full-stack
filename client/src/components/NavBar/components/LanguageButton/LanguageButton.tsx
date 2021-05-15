import React, { useContext } from 'react'
import { GrGlobe } from 'react-icons/gr'
import Dropdown from 'react-bootstrap/Dropdown'

import { LanguageContext } from '../../../../context/langContext'

const LanguageButton = () => {
  const { language, switchLanguage } = useContext(LanguageContext)

  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary">
        <GrGlobe />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => switchLanguage('vi')}>
          Tiếng Việt
        </Dropdown.Item>
        <Dropdown.Item onClick={() => switchLanguage('en')}>
          English
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default LanguageButton
