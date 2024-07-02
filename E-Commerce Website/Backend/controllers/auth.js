const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const JWT_SECRET = 'this_is_a_secret_test';
const REFRESH_TOKEN_SECRET = 'this_is_a_secret_test';

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    function generateToken(user) {
      console.log(user);
      return jwt.sign(
        { userId: user._id, username: user.username },
        JWT_SECRET,
        {
          expiresIn: '55m',
        }
      );
    }
    const token = generateToken(user);

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Error during login' });
  }
};

exports.signUp = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(200).json({ message: 'User added successfully' });
  } catch (error) {
    console.error('Error saving product:', error);
    res.status(500).json({ message: 'Error adding product' });
  }
};
