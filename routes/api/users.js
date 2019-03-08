const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticator = require('authenticator');

const keys = require('../../config/keys');


const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');


router.post('/register', async (req, res, next) => {
    const {errors, isValid} = validateRegisterInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    try {
        let user = await User.findOne({
            email: req.body.email
        });

        if (user) {
            return res.status(400).json({email: "User with that Email already exist"});
        } else {
            const secret = authenticator.generateKey();
            const newUser = new User({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password,
                secret: secret
            });
            let salt = await (bcrypt.genSalt(10));
            // encrypting password
            newUser.password = await bcrypt.hash(newUser.password, salt);
            // saving user to db
            let user = await newUser.save();
            // testing with postman
            res.status(201).json(user);
        }
    } catch (e) {
        (!e.statusCode) ? (e.statusCode = 500) : next(e);
    }
});

router.post('/login', async (req, res) => {
    const {errors, isValid} = validateLoginInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    const token = req.body.token;
    //Finding user email
    try {
        const user = await User.findOne({
            email
        });
        // User with that email doesn't exist
        if (!user) {
            errors.email = "User not found!";
            return res.status(404).json(errors);
        }
        //Check for user password
        else {
            const isMatch = await bcrypt.compare(password, user.password);
            const verify = authenticator.verifyToken(user.secret, token);
            if (verify) {
                if (isMatch) {
                    const payload = {id: user.id, name: user.name, avatar: user.avatar};//create jwt payload
                    //Sign token
                    const token = await jwt.sign(payload, keys.secretOrKey, {expiresIn: 3600});
                    res.json({
                        success: true,
                        token: 'Bearer ' + token
                    });
                }else
                {
                    errors.password = "Invalid password";
                    return res.status(400).json(errors);
                }
            } else {
                errors.token = "Invalid token";
                return res.status(400).json(errors);
            }
        }
        // User Entered Email and Password Correct
    } catch
        (err) {
        console.log(err);
    }
});


router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
        id: req.user.id,
        firstname: req.user.firstname,
        lastname: req.user.lastname,
        email: req.user.title
    });
});

module.exports = router;