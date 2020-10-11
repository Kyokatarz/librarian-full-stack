import React from 'react'

import Featured from '../Featured'
import Footer from '../Footer'
import Introduction from '../Introduction'
import Navbar from '../NavBar'

const LibraryHomePage: React.FC = () => {
  return (
    <>
      <Navbar />
      <Introduction />
      <Featured />
      <Footer />
    </>
  )
}

export default LibraryHomePage
