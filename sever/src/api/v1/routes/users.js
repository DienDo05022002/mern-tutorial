var express = require('express');
var router = express.Router();
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../model/User')
const verifyToken = require('../middleware/verifytoken')

//MONGOOSE
mongoose.connect('mongodb://localhost:27017/mern');

router.get('/mongoose', async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(400).json({ error: { name: err.name, messgae: err.message } });
  }
});
//----------------------------------------------------------
//Kiểm tra người dùng đã đăng nhập chưa
//@access Public
router.get('/',verifyToken, async (req, res, next) => {
  try {
		const user = await User.findById(req.userId).select('-password')
		if (!user)
			return res.status(400).json({ success: false, message: 'User not found' })
		res.json({ success: true, user })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
});
//------------------------------------------------------------------------------------------------------------------------------
//   ĐĂNG KÝ
//------------------------------------------------------------------------------------------------------------------------------
// POST: register user
router.post('/register', async (req, res, next) => {
  //get data from client
  const { username, password } = req.body
  //Validation
  if (!username || !password)
    return res.status(400).json({ error: { name: err.name, messgae: err.message } })
  //Check existing user  
  try {
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ success: false, messagae: 'Account already exists' })
    }
    //if all good to register

    const hashPassword = await argon2.hash(password)
    const newUser = new User({ username, password: hashPassword })
    await newUser.save()

    //return token
    const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN)

    res.json({ success: true, message: 'User created successfully', accessToken })

  } catch (err) { res.status(400).json({ error: { name: err.name, messgae: err.message } }); }
});

//------------------------------------------------------------------------------------------------------------------------------
//   ĐĂNG NHẬP
//------------------------------------------------------------------------------------------------------------------------------
// POST: login user
router.post('/login', async (req, res) => {
  console.log(' đã vô' )
  //get data from client
  const { username, password } = req.body
  //Validation(nhập tài khoản)
  if (!username || !password)
    return res.status(400).json({ error: { success: false, messgae: "plesae input" } })
  //Check user  
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ success: false, messagae: 'enter incorrect user' })
    }
    //Check password
    const checkPassword = await argon2.verify(user.password, password)
    if (!checkPassword) {
      return res.status(400).json({ success: false, messagae: 'enter incorrect password' })
    }
    //If check user-password true => NEXT
    const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN)

    res.json({ success: true, message: 'User logging successfully', accessToken })
  } catch (err) 
  { res.status(400).json({ error: { name: err.name, messgae: err.message } }); }
});

router.get('/users', function (req, res, next) {
  res.send('v1/users');
});

module.exports = router;