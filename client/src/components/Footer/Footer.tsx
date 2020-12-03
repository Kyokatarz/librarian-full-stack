import React from 'react'
import { FaGithubSquare } from 'react-icons/fa'

import './Footer.scss'

const Footer = () => {
  return (
    <div className="Footer">
      <p>Librarian &#169; 2020</p>

      <a
        href="https://github.com/Kyokatarz/librarian-full-stack"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div>
          <FaGithubSquare fontSize={32} /> Github
        </div>
      </a>
    </div>
  )
}

export default Footer
