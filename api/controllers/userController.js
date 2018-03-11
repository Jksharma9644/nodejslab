'use strict';
var mongoose = require('mongoose');
// mongoose.connect('mongodb://13.127.56.24:27017/test');
var jsonwebToken = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var User = mongoose.model('User');
var Token = mongoose.model('Token');
var Admin = mongoose.model('Admin');
var crypto = require('crypto');
var nodemailer = require('nodemailer');






/*******************Signup********************************/

exports.sign_up = function (req, res, next) {
    // Make sure this account doesn't already exist

    User.findOne({ email: req.body.email }, function (err, user) {
        // Make sure user doesn't already exist
        if (user) return res.status(200).send('The email You have Enteered is already Registered');
        // Create and save the user
        user = new User({ name: req.body.name, email: req.body.email, password: req.body.password });
        user.password = bcrypt.hashSync(req.body.password, 10);
        user.save(function (err) {
            if (err) { return res.status(200).send({ msg: err.message }); }
            // Create a verification token for this user
            var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });


            // Save the verification token
            token.save(function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }

                // Send the email
                var transporter = nodemailer.createTransport({
                    service: "Gmail",
                    auth: {
                        user: "jaycareer1989@gmail.com",
                        pass: "zxcvbnm7330"
                    }
                });
                var mailOptions = { from: 'jaycareer1989@gmail.com', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + 'localhost:4200/auth/activated/' + token.token + '.\n' };
                transporter.sendMail(mailOptions, function (err) {
                    if (err) { return res.status(500).send({ msg: err.message }); }
                    res.status(200).send('A verification email has been sent to ' + user.email + '.');
                });
            });
        })

    })
}

/***********Login handlers***************/

exports.sign_in = function (req, res) {
    User.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err) throw err;
        if (!user) {
            res.status(401).json({ message: 'Authentication Failed .user Not found' })
        } else if (user) {
            if (!user.comparePassword(req.body.password)) {
                res.status(200).send('Authentication Failed Wrong password')
            } else {
                if (!user.isVerified) {
                    res.status(200).send('Your account has not been verified.')
                }
                return res.json({ status: true, email: user.email, name: user.name, user_id: user._id })
            }
        }
    });
};
exports.confirmationPost = function (req, res) {
    Token.findOne({ token: req.body.token }, function (err, token) {
        if (!token) return res.status(200).send("We were unable to find a valid token. Your token my have expired");

        // If we found a token, find a matching user
        User.findOne({ _id: token._userId }, function (err, user) {
            if (!user) return res.status(200).send("We were unable to find a user for this token");

            if (user.isVerified) return res.status(200).send("this user has already verified Please login");

            // Verify and save the user
            user.isVerified = true;
            user.save(function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                res.status(200).send("The account has been verified. Please log in.");
            });
        });
    });
};

/********************Resend Token*************/
exports.resend = function (req, res) {
    User.findOne({ email: req.body.email }, function (err, user) {
        if (!user) return res.status(400).send({ msg: 'We were unable to find a user with that email.' });
        if (user.isVerified) return res.status(400).send({ msg: 'This account has already been verified. Please log in.' });

        // Create a verification token, save it, and send email
        var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });

        // Save the token
        token.save(function (err) {
            if (err) { return res.status(500).send({ msg: err.message }); }

            // Send the email
            var transporter = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                    user: "jaycareer1989@gmail.com",
                    pass: "rutherford"
                }
            });
            var mailOptions = { from: 'jaycareer1989@gmail.com', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + 'localhost:4200/auth/activated/' + token.token + '.\n' };
            transporter.sendMail(mailOptions, function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                res.status(200).send('A verification email has been sent to ' + user.email + '.');
            });
        });

    });
}

/************Login  Required handlers*/

exports.loginRequired = function (req, res) {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorised User' })
    }
}


/*****************Admin login and Registraion**********/

exports.adminSignup = function (req, res) {
    Admin.findOne({ email: req.body.email }, function (err, user) {
        // Make sure user doesn't already exist
        if (user) return res.status(400).send({ msg: 'The email You have Enteered is already Registered' });
        // Create and save the user
        user = new User({ name: req.body.name, email: req.body.email, password: req.body.password });
        user.password = bcrypt.hashSync(req.body.password, 10);
        user.save(function (err) {
            if (err) { return res.status(500).send({ msg: err.message }); }
            // Create a verification token for this user
            return res.status(200).json({ token: jsonwebToken.sign({ email: user.email, name: user.name, _id: user._id }, 'RESTFULAPIs'), email: user.email, name: user.name, user_id: user._id })
        })

    })
}
exports.adminSignin = function (req, res) {
    Admin.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err) throw err;
        if (!user) {
            res.status(401).json({ message: 'Authentication Failed .user Not found' })
        } else if (user) {
            if (!user.comparePassword(req.body.password)) {
                res.status(401).json({ message: 'Authentication Failed Wrong password' })
            } else {
                return res.json({ status: true, token: jsonwebToken.sign({ email: user.email, name: user.name, _id: user._id }, 'RESTFULAPIs'), email: user.email, name: user.name, user_id: user._id })
            }
        }
    });
}

