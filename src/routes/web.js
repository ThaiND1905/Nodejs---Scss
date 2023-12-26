const express = require('express');
const homeController = require('../controllers/homeController');
const authController = require('../controllers/authControllers')
const router = express.Router();

// Get Method Router
router.get('/',homeController.getSignUp)
router.get('/home',homeController.getHomepage);
router.get('/test',homeController.getTest);
router.get('/test_2',homeController.getTest2);
router.get('/create',homeController.getCreateUser);
router.get('/edit/:userID',homeController.getEditUser);
router.get('/users',homeController.getUser);
router.get('/recover',authController.getRecoverAccount);

// Post Method Router
router.post('/edit-user',homeController.postEditUser);
router.post('/create-user',homeController.postCreateUser);
router.post('/singup',homeController.postAccount);
router.post('/login',homeController.postLogin);
router.post('/delete-user',homeController.postDeleteUser);
router.post('/reset',authController.postRecoverAccount);


module.exports = router;