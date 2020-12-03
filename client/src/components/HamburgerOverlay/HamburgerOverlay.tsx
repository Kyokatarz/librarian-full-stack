import React from 'react'

import './HamburgerOverlay.scss'

const HamburgerOverlay = () => {
  const closeSideNav = () => {
    document.querySelector('.HamburgerOverlay')?.classList.remove('active')
    document.querySelector('.NavbarLinkContainer')?.classList.remove('active')
    for (let i = 1; i <= 3; i++) {
      document
        .querySelector('.Hamburger__Line-' + i)
        ?.classList.remove('active')
    }
  }

  return <div className="HamburgerOverlay" onClick={closeSideNav}></div>
}

export default HamburgerOverlay
