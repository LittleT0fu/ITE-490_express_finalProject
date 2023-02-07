const User = require("../models/userModel");
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
const config = require('../config/index')


exports.index = (req, res, next) => {
  // res.send('Hello with a resource');
  res.status(200).json({
    register : "/register",
    login : "/login"
  });
};


// get users
exports.show = async (req , res ,next) => { 
 try {
  const data = await User.find();
    res.status(200).json({
      Data : data
    })
 } catch (error) {
  next(error);
 }
}


//register
exports.register = async (req , res ,next )=>{
  try {
    const { name, email, password } = req.body;

    //เช็คการใส่ข้อมูล
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("มีบางข้อมูลใส่ไม่ครบ")
      error.statusCode = 422  // common validation
      error.validation = errors.array()
      throw error
    }

    //check email exist
    const existemail = await User.findOne({ email: email });
    if (existemail) {
      const error = new Error("อีเมลล์นี้มีผู้ใช้แล้ว")
      error.statusCode = 400
      throw error
    }
    let user = new User();
    user.name = name;
    user.email = email;
    user.password = await user.encryptPassword(password);  //encrypt password

    await user.save();

    res.status(201).json({
      messege: "ลงทะเบียนเรียบร้อย",
    });
  } catch (error) {
    next(error)
  }
}

//login
exports.login = async (req,res,next) => {
  try {
    const { email, password } = req.body;



    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("อะไรสักอย่างผิดแหละ")
      error.statusCode = 422  // common validation
      error.validation = errors.array()
      throw error
    }
    //check user
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("ไม่มีผู้ใช้นี้")
      error.statusCode = 400
      throw error
    }

    //check password
    const isValid = await user.checkPassword(password)
    if(!isValid){
      const error = new Error("รหัสผ่านไม่ถูกต้อง")
      error.statusCode = 401
      throw error
    }

    //create token
    const token = await jwt.sign({
      id:user._id,
      role:user.role
    },config.SECRET_KEY,{expiresIn: "5 days"})
    const expire_in = jwt.decode(token)

    res.status(201).json({
      access_token:token,
      expire_in: expire_in.exp,
      token_type: 'Bearer'
    });
  } catch (error) {
    next(error)
  }
}


//delete
exports.deleteByID = async ( req , res ,next )=> {
  try {
    const { id } = req.params
    const user = await User.deleteOne({
        _id: id,
      });
    if(user.deletedCount === 0 ){
      const error = new Error("ไม่พบข้อมูลผู้ใช้งาน")
      error.statusCode = 404
      throw error
    }else{
        res.status(200).json({
            message: "ลบข้อมูลเรียบร้อย",
          });
    }


  } catch (error) {
    next(error)
  }
 }

 exports.rolechange = async ( req , res ,next )=> {
  try {
    const { id } = req.params
    const { role } = req.body
    console.log(role)
    const user = await User.findById({
        _id: id,
      });
    if(!user){
        const error = new Error("ไม่พบข้อมูลผู้ใช้งาน / ไม่พบข้อมูลผู้ใช้งาน")
        error.statusCode = 404
        throw error
    }
    const data = await User.findByIdAndUpdate({_id:id},{
       role : role
    }) 
    res.status(200).json({
      message : "อัพเดตข้อมูลเรียบร้อย"
    })


  } catch (error) {
    next(error)
  }
 }