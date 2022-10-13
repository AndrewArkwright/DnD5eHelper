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

    //Check if email exists
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
    if (!User.findOne(req.body.email)) {
      console.log("User with email not found")
      req.flash("errors", "User with email address does not exist")
      res.redirect('/')
    }

    let tokenAlreadyExists = await Token.findOne({email: req.body.email})
    if (tokenAlreadyExists) {
      //maybe we just update the token
      console.log("Token exists already") //works, but still get an error that crashes the server: Cannot set headers after they are sent to the client
      req.flash("errors", "A password reset email has already been sent, please check your email.")
      res.redirect('/')
    }
    //Set token, may need a way to not infinately do this and cause the DB to be overwhelmed
    const token = new Token({
      Token: crypto.randomBytes(20).toString("hex"),
      email: req.body.email,
    })

    token.save()

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
        console.log("Server is ready to take our messages");
      }
    });

    const resetURL = `http://${req.headers.host}.passwordReset/${token.Token}`

    let msg = await transporter.sendMail({
      from: "D&D 5e Charactor Creator <dndcharcreator@outlook.com>",
      to: req.body.email,
      subject: "D&D 5e Character Creator Password Reset",
      text: `A password reset request was sent for your account. Please click the following link to reset your password: ${resetURL}`
    })

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

  exports.getResetForm = async (req, res) => {
    console.log("Token: ", req.params.token) //works
    const token = await Token.findOne({Token: req.params.token}) 
    console.log("Token values: ",token.Token, token.email)
    if(!token) {
      req.flash("errors", "Reset password link has expired, please try again.")
      console.log("Cannot find token in db")
      return res.redirect('/')
    }
    res.render("newPassword.ejs", {  //is it because i don't go to /newPassword and instead just render it?
      tokenObj: token, //to pass it so resetPassword can use it, info is passed through a EJS variable
    })
  }
  /*
    Should be able to render req.params.token if I pass it through the render request in the GET request like we render viewCharacters. If not, we should be able to automatically asign a part of the form as that variable and use hidden to hide it from the user.
  */

  exports.resetPassword = async (req, res)=> {
    console.log("New pw: ", req.body.password) //works
    console.log("Token val: ", req.params.token) //works now

    const validationErrors = []
    if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' })
    if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' })

    const token = await Token.findOne({Token: req.params.token})
    console.log("Token test: ", token.Token, token.email)
    const user = await User.findOne({email: token.email})

    if (!user) { //make sure we can still grab the email in order to update it since the GET could have a while ago.
      req.flash("errors", "Reset password link has expired, please try again.")
      console.log("Error finding email")
      return res.redirect('/')
    }

    // UserSchema.pre('save', function save(next)
    console.log("Old Password: ", user.password)

    user.password = req.body.password

    //it all works, but we need to encrypt

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
        /*

https://codesandbox.io/s/u3557?file=/views/contact.ejs

    "action from form",
    [
      check("name of input or textarea")
        .isLength({ min: 1 })
        .withMessage("Message is required")
        .trim(),
      check("email")
        .isEmail()
        .withMessage("That email doesn‘t look right")
        .bail()
        .trim()
        .normalizeEmail()
    ],
    (req, res) => {
      console.log(req.body);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.render("action stated at top because you reload the page with the error.", {
          data: req.body,
          errors: errors.mapped()
        });
      }
  
      const data = matchedData(req);
      console.log("Sanitized: ", data);
  
      req.flash("success", "Some message");
      res.redirect("/");
    }
    */

    const validationErrors = []
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
    if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' })
    if (validationErrors.length) {
      req.flash('errors', validationErrors)
    }
  
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