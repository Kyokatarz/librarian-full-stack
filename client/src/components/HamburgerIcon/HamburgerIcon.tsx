import React from 'react'

import './HamburgerIcon.scss'

const HamburgerIcon: React.FC = () => {
  const onCLickHandler = () => {
    document.querySelector('.NavbarLinkContainer')?.classList.toggle('active')
    for (let i = 1; i <= 3; i++) {
      document
        .querySelector('.Hamburger__Line-' + i)
        ?.classList.toggle('active')
    }
  }

  return (
    <div className="Hamburger" onClick={() => onCLickHandler()}>
      <div className="Hamburger__Line-1"></div>
      <div className="Hamburger__Line-2"></div>
      <div className="Hamburger__Line-3"></div>
    </div>
  )
}

export default HamburgerIcon
