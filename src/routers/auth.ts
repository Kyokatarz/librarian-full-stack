import express, { NextFunction, Request, Response } from 'express'
import passport from 'passport'

const router = express.Router()

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
  })
)

router.get('/test', async (req: Request, res: Response, next: NextFunction) => {
  console.log('Test route')
})

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/' }),
  function (req, res) {
    // Successful authentication, redirect home.
    console.log('req:', req.user)
    res.redirect('http://localhost:5000/')
  }
)

export default router
