const User = require("../models/userModel");

exports.index = (req, res, next) => {
  // res.send('Hello with a resource');
  res.status(200).json({
    fullname: "Kraiwit Chinchanathavorn",
  });
};

exports.show = async (req , res ,next) => { 
  const data = await User.find();
  res.status(200).json({
    Data : data
  })
}