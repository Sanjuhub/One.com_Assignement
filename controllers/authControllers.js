const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function registerUser(req, res) {
  const { userName, name, password } = req.body;

  try {
    const saltRounds = 12;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      userName,
      name,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    return res.json(savedUser);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

async function loginUser(req, res) {
  const { userName, password } = req.body;

  try {
    const userExist = await UserModel.findOne({ userName });
    if (!userExist) {
      return res.status(404).json({ message: 'User not found.' });
    }
    console.log(userExist);

    const validPassword = await bcrypt.compare(password, userExist.password);
    console.log(validPassword);

    if (!validPassword) {
      return res
        .status(422)
        .json({ message: 'Username or password is incorrect.' });
    }

    const jwtToken = jwt.sign(
      { _id: userExist._id },
      process.env.JWT_SECRET_TOKEN,
      { expiresIn: '1d' }
    );

    res.cookie('TOKEN', jwtToken, {
      httpOnly: true,
      sameSite: true,
      expires: new Date(Date.now() + 60 * 60 * 1000 * 24),
    });

    return res.json({ jwtToken, userExist });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

async function logoutUser(req, res) {
  const jwtToken = req.cookies.TOKEN;
  console.log(jwtToken);

  if (!jwtToken) {
    return res.json({ message: 'User already logged out.' });
  }

  res.cookie('TOKEN', '', { maxAge: 1 });
  return res.json({ message: 'Logged out successfully' });
}

module.exports = { loginUser, registerUser, logoutUser };
