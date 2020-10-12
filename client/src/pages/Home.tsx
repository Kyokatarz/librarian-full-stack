import React, { useEffect, useState } from 'react'
import { Redirect, useHistory, useLocation } from 'react-router-dom'

import axios from 'axios'
import LibraryHomePage from '../components/LibraryHomePage/index'

type JWTToken = {
  token: string
}

const GOOGLE_CLIENT_ID =
  '966391822521-16klvao4ikgokq93vhvs0h6i58encvgk.apps.googleusercontent.com'

export default function Home() {
  return (
    <>
      <LibraryHomePage />
    </>
  )
}
