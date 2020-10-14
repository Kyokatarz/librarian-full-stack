import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Footer from './components/Footer'
import NavBar from './components/NavBar'
import AllBooks from './pages/AllBooks'

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
      <Route exact path="/allbooks" component={AllBooks} />
    </Switch>
    <Footer />
  </>
)

export default Routes
