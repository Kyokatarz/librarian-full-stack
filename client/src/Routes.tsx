import React from 'react'
import { Switch, Route } from 'react-router-dom'

import AllAuthor from './pages/AllAuthor/'
import AllBooks from './pages/AllBooks/'
import BorrowedBooks from './pages/BorrowedBooks/'
import ChangePassword from './pages/ChangePassword/'
import Footer from './components/Footer'
import ForgetPassword from './pages/ForgetPassword/'
import Home from './pages/Home/'
import NavBar from './components/NavBar'
import NotFound from './pages/NotFound/'
import SignIn from './pages/SignIn/'
import SignUp from './pages/SignUp/'
import UserInfo from './pages/UserInfo/'

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
      <Route exact path="/user/changepassword" component={ChangePassword} />
      <Route exact path="/forgetpassword" component={ForgetPassword} />
      <Route exact path="/author" component={AllAuthor} />
      <Route exact component={NotFound} />
    </Switch>
    <Footer />
  </>
)

export default Routes
