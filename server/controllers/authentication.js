const jwt = require('jsonwebtoken'),
    crypto = require('crypto'),
    User = require('../models').user,
    config = require('../config/main');

function generateToken(user) {
    return jwt.sign(user, config.secret, {
        expiresIn: 10080 // in seconds
    });
}

// Set user info from request
function setUserInfo(user) {
    return {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
    };
}

exports.login = function(req, res, next) {
    let reqUser = req.body.user;
    var isValidPassword = function(userpass, password){
        // return bCrypt.compareSync(password, userpass);
    }
    User.findOne({ where : { email: reqUser.email}}).then(function (user) {
        if (!user) {
            return next(new Error('not exist'));
        }
        if (!isValidPassword(user.password, reqUser.password)) {
            return next(new Error('password missmatch'));
        }
        var userinfo =setUserInfo(req.body.user);
        res.status(200).json({
            token: 'JWT ' + generateToken(userInfo),
        });
    }).catch(function(err){
        console.log("Error:",err);
        return done(null, false, { message: 'Something went wrong with your Signin' });
    });



// let userInfo = setUserInfo(req.body.user);
//
//     res.status(200).json({
//         token: 'JWT ' + generateToken(userInfo),
//         user: userInfo
//     });
}

exports.register = function(req, res, next) {
    // Check for registration errors
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;

    // Return error if no email provided
    if (!email) {
        return res.status(422).send({ error: 'You must enter an email address.'});
    }

    // Return error if full name not provided
    if (!firstName || !lastName) {
        return res.status(422).send({ error: 'You must enter your full name.'});
    }

    // Return error if no password provided
    if (!password) {
        return res.status(422).send({ error: 'You must enter a password.' });
    }

    User.findOne({
        where: {
            email: email
        }
    }).then(function(existingUser) {
        if (existingUser) {
            return res.status(422).send({ error: 'That email address is already in use.' });
        }
        let newUser = {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName
        };
        User.build(newUser)
            .save()
            .then(anotherUser => {
                let userInfo = setUserInfo(anotherUser);

                res.status(201).json({
                    token: 'JWT ' + generateToken(userInfo)
                });
            })
            .catch(error => {
                return next(err);
            })

    }).catch(function(err) {
        console.log("Error:", err);
        return next(err);
    });


    // User.findOne({ email: email }, function(err, existingUser) {
    //     if (err) {
    //         return next(err);
    //     }
    //
    //     // If user is not unique, return error
    //     if (existingUser) {
    //         return res.status(422).send({ error: 'That email address is already in use.' });
    //     }
    //
    //     // If email is unique and password was provided, create account
    //     let user = new User({
    //         email: email,
    //         password: password,
    //         firstName: firstName,
    //         lastName: lastName
    //     });
    //
    //     user.save(function(err, user) {
    //         if (err) { return next(err); }
    //
    //         // Subscribe member to Mailchimp list
    //         // mailchimp.subscribeToNewsletter(user.email);
    //
    //         // Respond with JWT if user was created
    //
    //         let userInfo = setUserInfo(user);
    //
    //         res.status(201).json({
    //             token: 'JWT ' + generateToken(userInfo),
    //             user: userInfo
    //         });
    //     });
    // });
}

exports.roleAuthorization = function(role) {
    return function(req, res, next) {
        const user = req.user;

        User.findById(user._id, function(err, foundUser) {
            if (err) {
                res.status(422).json({ error: 'No user was found.' });
                return next(err);
            }

            // If user is found, check role.
            if (foundUser.role == role) {
                return next();
            }

            res.status(401).json({ error: 'You are not authorized to view this content.' });
            return next('Unauthorized');
        })
    }
}