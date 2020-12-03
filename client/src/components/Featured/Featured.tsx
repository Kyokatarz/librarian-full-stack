import React from 'react'

import FeaturedCarousel from '../FeaturedCarousel/index'

import './Featured.scss'

const Featured = () => {
  return (
    <div className="Featured">
      <h1>Featured Books</h1>
      <div className="Featured__Bg-img"></div>
      <div className="Featured__Content">
        <h2 className="text-white">This Month Featured Books</h2>
        <FeaturedCarousel />
      </div>
    </div>
  )
}

export default Featured
