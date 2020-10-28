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
import NotFound from './pages/NotFound'
import ChangePassword from './pages/ChangePassword'
import AllAuthor from './pages/AllAuthor'
import ForgetPassword from './pages/ForgetPassword'

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
