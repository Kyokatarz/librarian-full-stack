import React from 'react'

import './Footer.scss'

const Footer = () => {
  return (
    <div className="Footer">
      <p>Librarian &#169; 2020</p>
      <p>
        Developed and Design by
        <a
          href="https://github.com/Kyokatarz/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {' '}
          Kyo Tran
        </a>
      </p>
    </div>
  )
}

export default Footer
