const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/login');

exports.postLogin = async (req, res) => {
    const { username, password } = req.body;

    if (!username) {
        return res.json({ error: true, message: 'Please enter username' });
    }

    if (!password) {
        return res.json({ error: true, message: 'Please enter password' });
    }


    try {
        const isUser = await User.findOne({ username });

        if (!isUser) {
            return res.json({ error: true, message: 'Username does not exist' });
        }

        const doMatch = await bcrypt.compare(password, isUser.password);
        if (doMatch) {
            const user = { username: isUser.username, userID: isUser._id.toString() };
            let token = jwt.sign(
                user,
                process.env.ACCESS_SECRET_TOKEN,
                { expiresIn: '1h' },
            );
            return res.json({ error: false, message: 'Login successful', token, user });
        }
        return res.json({ error: true, message: 'Invalid Password' })

    }
    catch (error) {
        return res.json({ error: true, message: 'Unexpected error occurred, please try again.' })
    }

}

exports.postSignup = async (req, res) => {
    const { username, password } = req.body;

    if (!username) {
        return res.json({ error: true, message: 'Please enter username' });
    }

    if (!password) {
        return res.json({ error: true, message: 'Please enter password' });
    }

    try {
        const isUser = await User.findOne({ username });

        if (isUser) {
            return res.json({ error: true, message: 'Username already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            password: hashedPassword,
        });

        await user.save();

        return res.json({ error: false, message: 'User created successfully' });
    }
    catch (error) {
        return res.json({ error: true, error: 'Unexpected error occurred, please try again.' });
    }
}