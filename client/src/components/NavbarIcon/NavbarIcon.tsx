import React from 'react'
import { Link } from 'react-router-dom'

import './NavbarIcon.scss'

const NavbarIcon = () => {
  return (
    <Link to="/">
      <svg
        width="40"
        height="40"
        viewBox="0 0 490 402"
        xmlns="http://www.w3.org/2000/svg"
        className="Navbar__Icon"
      >
        <g id="NavbarIcon">
          <path
            id="Vector"
            d="M483 387.259H402.025L430.693 378.296C435.446 376.816 439.336 373.573 441.646 369.167C443.956 364.762 444.41 359.719 442.925 354.969L336.088 13.077C333.65 5.255 326.518 0 318.336 0C316.451 0 314.578 0.288001 312.776 0.853001L247.099 21.373C246.469 21.569 245.859 21.799 245.266 22.055V19.351C245.266 9.088 236.92 0.738003 226.662 0.738003H157.422C153.03 0.738003 148.996 2.277 145.811 4.832C142.62 2.277 138.578 0.738003 134.178 0.738003H64.855C54.586 0.738003 46.23 9.088 46.23 19.351V387.259H7C3.134 387.259 0 390.393 0 394.259C0 398.125 3.134 401.259 7 401.259H483C486.866 401.259 490 398.125 490 394.259C490 390.393 486.866 387.259 483 387.259ZM429.247 362.667C428.675 363.759 427.71 364.563 426.522 364.932L360.852 385.463C360.404 385.604 359.944 385.674 359.484 385.674C357.481 385.674 355.664 384.337 355.066 382.423L276.306 130.359L350.798 107.092L429.562 359.145C429.932 360.325 429.819 361.576 429.247 362.667ZM346.623 93.73L272.131 116.997L263.613 89.737L338.103 66.466L346.623 93.73ZM251.271 34.738L316.958 14.215C317.41 14.073 317.874 14.001 318.336 14.001C320.356 14.001 322.117 15.303 322.723 17.248L333.928 53.104L259.438 76.375L248.243 40.545C247.484 38.1 248.842 35.496 251.271 34.738ZM341.939 387.259H245.265V77.959L341.939 387.259ZM152.817 163.235H231.265V182.727H152.817V163.235ZM231.266 149.235H152.818V80.724H231.266V149.235ZM138.817 99.312H60.23V80.724H138.817V99.312ZM60.23 113.312H138.817V131.911H60.23V113.312ZM152.817 196.727H231.265V387.26H152.817V196.727ZM157.422 14.738H226.662C229.2 14.738 231.266 16.807 231.266 19.351V66.723H152.818V19.352C152.817 16.808 154.883 14.738 157.422 14.738ZM64.855 14.738H134.177C136.736 14.738 138.817 16.807 138.817 19.351V66.723H60.23V19.352C60.23 16.808 62.306 14.738 64.855 14.738ZM60.23 145.911H138.817V387.26H60.23V145.911Z"
          />
        </g>
      </svg>
    </Link>
  )
}

export default NavbarIcon