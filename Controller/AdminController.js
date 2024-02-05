const User = require('../Models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const AdminLogin = async(req,res)=>{
    try {
        const {email,password} = req.body
        const exists = await User.findOne({email:email})
        
        if(exists){
            if(exists.is_admin===true){
               const sPassword = await bcrypt.compare(password,exists.password)
                if(sPassword){

                    const token = jwt.sign({adminId:exists._id},"itsNewToken", {expiresIn:'1m'})
                    console.log(token,"Token");
                    return res.status(200).json({admin:exists, token:token, message:"login",status:true})
                }else{
                    return res.status(404).json({alert:'Password is wrong',status:false})
                }

            }else{
                return res.status(404).json({alert:"Not an admin",status:false})
            }
           
        }else{
            return res.status(201).json({alert:"No account in this Email",status:false})
        }
        
    } catch (error) {
        console.log(error.message);
    }
}

const userDatas = async(req,res)=>{
    try {
        const data = await User.find({})
        if(data){
            res.status(200).json({status:true,data:data})
        }else{
            res.status(200).json({status:false,data:data})
        }
    } catch (error) {
        console.log(error.message);
    }
}

const addUser = async(req,res)=>{
    try {
        console.log("Add user");
        const {name,email,mobile,password} = req.body
        const exists = await User.findOne({email:email})
        if(exists){
            console.log("Email is already exist");
            return res.status(200).json({alert:"Email Already exist",status:true})
        }else{
            const hashPassword = await bcrypt.hash(password,10)
            const newUser = await User.create({
                name:name,
                email:email,
                mobile:mobile,
                password:hashPassword
            })
            const token = jwt.sign({userId:newUser._id},"jwtSecret",{expiresIn:"1m"})
            return res.status(200).json({token:token,user:newUser,alert:"Registered",status:true})
        }

    } catch (error) {
        console.log(error.message);
        res.status(500).json({error:'Internal server error'})
        
    }
}

const deleteUser = async(req,res)=>{
    try {
        console.log("Deleted fn");
        const id = req.params.id
        const deleted = await User.deleteOne({_id:id})
        if(deleted){
            res.status(200).json({deleted:true})
        }else{
            res.status(200).json({deleted:false})
        }
    } catch (error) {
        console.log(error.message);
        
    }
}

const editUserDetails = async(req,res)=>{
    try {
        console.log("fn edit");
        const userId = req.params.id
        console.log(userId,"lllllllll");
        const userData = await User.findOne({_id:userId})
        if(userData){
            res.json({userData,status:true,message:'data found'})
        }else{
            res.json({status:false,message:'data not found'})
        }
    } catch (error) {
        console.log(error);
    }

}

const updateUserDetails = async(req,res)=>{
    try {
       const {id,name,mobile,email} = req.body
       const updateUserData = await User.updateOne({_id:id},{$set:{name,mobile,email}}) 
       if(updateUserData){
        res.json({userData:updateUserData,status:true,alert:'updation completed'})
       }else{
        res.json({status:false,alert:'the updation not complete'})
       }
    } catch (error) {
        
    }
}

module.exports={
    AdminLogin,
    userDatas,
    addUser,
    deleteUser,
    editUserDetails,
    updateUserDetails
}