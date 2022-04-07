const { Router } = require('express');

const router = Router();

const {
  loginUser,
  registerUser,
  logoutUser,
} = require('../controllers/authControllers');

router.post('/v1/auth/login', loginUser);
router.post('/v1/auth/register', registerUser);
router.get('/v1/auth/logout', logoutUser);

module.exports = router;
