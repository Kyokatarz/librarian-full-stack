import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Footer from './components/Footer'
import NavBar from './components/NavBar'

import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

const Routes = () => (
  <>
    <NavBar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
    </Switch>
    <Footer />
  </>
)

export default Routes
