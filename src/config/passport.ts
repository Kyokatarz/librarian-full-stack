import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import passportFacebook from 'passport-facebook';
import passportLocal from 'passport-local';

const LocalStrategy = passportLocal.Strategy
const FacebookStrategy = passportFacebook.Strategy
