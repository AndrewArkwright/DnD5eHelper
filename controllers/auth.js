const passport = require('passport')
const validator = require('validator')
const User = require('../models/User')
const Token = require("../models/token")
const crypto = require("crypto")
const { token } = require('morgan')
const nodemailer = require("nodemailer")

 exports.getLogin = (req, res) => {
    if (req.user) {
      return res.redirect('/character') //character?
    }
    res.render('login', {
      title: 'Login'
    })
  }

  exports.forgotPassword = async (req, res) => {
    const validation = []

    //Check if email exists
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })

    let emailUser = await User.findOne({email: req.body.email})
    if (!emailUser) {
      console.log("User with email not found")
      validation.push({ msg: 'User with email address was not found.' })
      req.flash("errors", validation)
      return res.redirect("/")
    }

    console.log("Email Exists")

    //if token exists, then we do not create a new one
    let tokenAlreadyExists = await Token.findOne({email: req.body.email})
    if (tokenAlreadyExists) {
      //maybe we just update the token
      console.log("Token exists already") //works, but still get an error that crashes the server: Cannot set headers after they are sent to the client
      validation.push({ msg: 'A password reset email has previously been sent and is still active, please use the link in that email to reset your password.' })
      req.flash("errors", validation)
      return res.redirect('/')
    }

    console.log("Token not found so creating a new one")
    const token = new Token({
      Token: crypto.randomBytes(20).toString("hex"),
      email: req.body.email,
    })

    token.save()

    console.log(process.env.MAIL_USER, process.env.MAIL_PASS)
    //Send email
    const transporter = await nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
      }
    });

    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log("Mail transporter is working");
      }
    });

    const resetURL = `http://${req.headers.host}.passwordReset/${token.Token}`

    let msg = await transporter.sendMail({
      from: `D&D 5e Charactor Creator <${process.env.MAIL_USER}`,
      to: req.body.email,
      subject: "D&D 5e Character Creator Password Reset",
      text: `A password reset request was sent for your account. Please click the following link to reset your password and this link will expired in one hour: ${resetURL}.`
    })

    validation.push({ msg: 'An email with a password reset link has been sent!' })
    req.flash("success", validation)
    console.log("Email was sent")

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

  exports.getResetForm = async (req, res) => {
    const token = await Token.findOne({Token: req.params.token}) 
    if(!token) {
      req.flash("errors", [{msg: "Reset password link has expired, please try again."}])
      console.log("Cannot find token in db")
      return res.redirect('/')
    }
    res.render("newPassword.ejs", {  //is it because i don't go to /newPassword and instead just render it?
      tokenObj: token, //to pass it so resetPassword can use it, info is passed through a EJS variable
    })
  }

  exports.resetPassword = async (req, res)=> {

    const validation = []
    if (!validator.isLength(req.body.password, { min: 8 })) validation.push({ msg: 'Password must be at least 8 characters long' })
    if (req.body.password !== req.body.confirmPassword) validation.push({ msg: 'Passwords do not match' })

    const token = await Token.findOne({Token: req.params.token})
    const user = await User.findOne({email: token.email})

    if (!user) { //make sure we can still grab the email in order to update it since the GET could have a while ago.
      validation.push({ msg: 'Reset password link has expired, please try again.' })
      req.flash("errors", validation)
      console.log("Error finding email")
      return res.redirect('/')
    }
    console.log("Old Password: ", user.password)

    user.password = req.body.password

    User.findOneAndUpdate({$or: [
      {email: user.email}
    ]}, (err) => {
      if (err) { return next(err) }
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

    user.updateOne({password: req.body.password}) //this and or below is required
    user.save()

    console.log("Found email and resetting password")
    //const user = await User.findOneAndUpdate({email: token.email}, {password: req.body.password}, {new: true}) //new is used to basically save it.

    console.log("New Password: ", user.password)
    res.redirect('/')
  }
  
  exports.postLogin = (req, res, next) => {

    const validationErrors = []
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
    if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' })
    if (validationErrors.length) {
      req.flash('errors', validationErrors)
    }
  
    if (validationErrors.length) {
      req.flash('errors', validationErrors)
      return res.redirect('/')
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
        req.flash('success', [{ msg: 'Success! You are logged in.' }])
        res.redirect(req.session.returnTo || '/character')
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