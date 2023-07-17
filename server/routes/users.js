const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get(`/`, async (req, res) => {

    const userList = await User.find().select('-passwordHash');

    if (!userList) {
        res.status(500).json({ success: false })
    }
    res.send(userList);
})


router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id).select('-passwordHash');

    if (!user) {
        res.status(500).json({ message: 'The user with the given ID was not found.' })
    }
    res.status(200).send(user);
})


router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    const secret = process.env.SECRET;
    if (!user) {
        return res.status(400).send('The user not found');
    }
    else if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const token = jwt.sign(
            {
                userId: user.id,
            },
            secret,
            { expiresIn: '1d' }
        )
        const resuser = await User.findOne({ email: req.body.email }).select('-passwordHash');
        res.status(200).send({ user: resuser, token: token })
    }
    else {
        res.status(400).send('password is wrong!');
    }
})


router.post('/register', async (req, res) => {

    const userExist = await User.findOne({ email: req.body.email })

    if (userExist) {
        return res.status(400).send('The user already Exists');
    } else {
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            passwordHash: bcrypt.hashSync(req.body.password, 10),
        })

        user = await user.save();

        if (!user)
            return res.status(400).send('the user cannot be created!')

        res.send(user);
    }

})



module.exports = router;