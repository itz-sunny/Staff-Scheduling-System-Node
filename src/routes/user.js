const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.js');
const { authenticate, authorizeAdmin } = require('../middlewares/security.js');

// router.get('/fetch/all', userController.fetchAllUsers)

// router.get('/fetch/:userId', userController.fetchUser)

router.use(authenticate, authorizeAdmin);

router.put('/role/update', userController.updateRole);

router.put('/update', userController.updateUser);

router.delete('/delete/:userId', userController.deleteUser);

router.get('/fetch/sorted', userController.fetchAllUsersSorted);

module.exports = router;
