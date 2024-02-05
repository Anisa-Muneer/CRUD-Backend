const express = require('express')
const AdminRoute = express()
const adminController = require('../Controller/AdminController')

AdminRoute.post('/login', adminController.AdminLogin)
AdminRoute.get('/getallusers',adminController.userDatas)
AdminRoute.post('/addUser',adminController.addUser)
AdminRoute.post('/deleteUser/:id',adminController.deleteUser)
AdminRoute.get('/editUser/:id',adminController.editUserDetails); 
AdminRoute.post('/updateuser',adminController.updateUserDetails); 


module.exports=AdminRoute
