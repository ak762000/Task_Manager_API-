const express = require('express');
const {registerController,loginController, getUsers} = require('../controllers/userController')
const auth = require('../middlewares/auth')
const router = express.Router()


// Basic Test
router.get('/', (req, res) => {
    res.status(200).send("User Routes are working.....");
});

//Swagger Api Documentation for Register
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Register]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             schema:
 *             type: object
 *             properties:
 *               name :
 *                 type : string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             example:
 *               user: 
 *                 name: 'John Doe'
 *                 email: 'john@example.com'
 *               message: User created successfully!
 *       409:
 *         description: Email already registered
 *         content:
 *           application/json:
 *             example:
 *               error: 'Email already registered'
 */


// Register a user
router.post('/register', registerController)


//Swagger Api Documentation for Login 
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Logs in a user
 *     description: Use this route to log in a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             example:
 *               accessToken: 'your-access-token'
 *               message: 'Logged In successfully!'
 *       401:
 *         description: User not registered or password does not match
 *         content:
 *           application/json:
 *             example:
 *               message: 'User not registered!'
 *     tags:
 *       - Login
 */


// Login a user
router.post('/login', loginController);

//Retrieve users
router.get('/users', getUsers)

module.exports = router;
