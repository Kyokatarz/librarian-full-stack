import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './Introduction.scss'

const Introduction = () => {
  return (
    <div className="Introduction">
      <div className="Introduction__Bg-img"></div>
      <h1>Introduction</h1>
      <div className="Introduction__Content">
        <h2 className="text-white">Your personal book keeper</h2>
        <p>
          Large database of books. <br />
          Update daily. <br />
          Personal favorites. <br />
          Built by book enthusiasts.
        </p>
        <Link to="/allbooks">
          <Button className="Introduction__Button">
            See all books &gt;&gt;
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default Introduction
