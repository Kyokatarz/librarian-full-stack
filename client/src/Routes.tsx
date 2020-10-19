import React from 'react'
import { Switch, Route } from 'react-router-dom'
import BorrowedBooks from './pages/BorrowedBooks'
import Footer from './components/Footer'
import NavBar from './components/NavBar'
import AllBooks from './pages/AllBooks'

import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import UserInfo from './pages/UserInfo'
import UIOverlay from './components/UIOverlay'
import NotFound from './pages/NotFound'

const Routes = () => (
  <>
    <NavBar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/allbooks" component={AllBooks} />
      <Route exact path="/user/info" component={UserInfo} />
      <Route exact path="/user/books" component={BorrowedBooks} />
      <Route exact component={NotFound} />
    </Switch>
    <Footer />
    <UIOverlay />
  </>
)

export default Routes
