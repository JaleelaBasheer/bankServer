const express = require('express')
const userController = require('../controllers/usercontroller')
const middleware = require('../middlewares/authMiddleware')
const router = new express.Router()

// request for register-http://localhost:3000/register
router.post("/register",userController.register)

// login -http://localhost:3000/login
router.post("/login",userController.login)

// get-balance 
router.get("/get-balance/:acno",middleware.jwtMiddleware,userController.getbalance)

// fund-transfer
router.post("/fund-transfer",middleware.jwtMiddleware,userController.fundtransfer)

// get transactions
router.get("/get-transaction",middleware.jwtMiddleware,userController.gettransactions)

// Delete Account
router.delete("/delete-my-account",middleware.jwtMiddleware,userController.deleteAcno)


module.exports=router
