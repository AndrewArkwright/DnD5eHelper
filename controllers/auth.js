const passport = require('passport')
const validator = require('validator')
const User = require('../models/User')
const Token = require("../models/token")
const crypto = require("crypto")

 exports.getLogin = (req, res) => {
    if (req.user) {
      return res.redirect('/character') //character?
    }
    res.render('login', {
      title: 'Login'
    })
  }

  exports.forgotPassword = (req, res) => {
    //Check if email exists
    if (!User.findOne(req.body.email)) {
      req.flash("errors", "User with email address does not exist")
      res.redirect('/')
    }
    //Set token, may need a way to not infinately do this and cause the DB to be overwhelmed
    const token = new Token({
      Token: crypto.randomBytes(20).toString("hex"),
    })

    token.save()

    //Send email
    const resetURL = `http://${req.headers.host}.passwordReset/${token.Token}`
    req.flash("success", "An email with a password reset link has been sent!")
    //Redirect to login
    res.redirect('/')
  }

  exports.getReset = (req, res) => {
    if (req.user) {
      return res.redirect('/')
    }
    res.render('passwordReset', {
      title: 'Password Reset'
    })
  }
  
  exports.postLogin = (req, res, next) => {
    const validationErrors = []
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
    if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' })
  
    if (validationErrors.length) {
      req.flash('errors', validationErrors)
      return res.redirect('/signup')
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
  
    passport.authenticate('local', (err, user, info) => {
      if (err) { return next(err) }
      if (!user) {
        req.flash('errors', info)
        return res.redirect('/')
      }
      req.logIn(user, (err) => {
        if (err) { return next(err) }
        req.flash('success', { msg: 'Success! You are logged in.' })
        res.redirect(req.session.returnTo || '/character') // '/character'?
      })
    })(req, res, next)
  }
  
  exports.logout = (req, res) => {
    req.logout(() => {
      console.log('User has logged out.')
    })
    req.session.destroy((err) => {
      if (err) console.log('Error : Failed to destroy the session during logout.', err)
      req.user = null
      res.redirect('/')
    })
  }
  
  exports.getSignup = (req, res) => {
    if (req.user) {
      return res.redirect('/')
    }
    res.render('signup', {
      title: 'Create Account'
    })
  }
  
  exports.postSignup = (req, res, next) => {
    const validationErrors = []
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
    if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' })
    if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' })
  
    if (validationErrors.length) {
      req.flash('errors', validationErrors)
      return res.redirect('../signup')
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
  
    const user = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password
    })
  
    User.findOne({$or: [
      {email: req.body.email},
      {userName: req.body.userName}
    ]}, (err, existingUser) => {
      if (err) { return next(err) }
      if (existingUser) {
        req.flash('errors', { msg: 'Account with that email address or username already exists.' })
        return res.redirect('../signup')
      }
      user.save((err) => {
        if (err) { return next(err) }
        req.logIn(user, (err) => {
          if (err) {
            return next(err)
          }
          res.redirect('/')
        })
      })
    })
  }