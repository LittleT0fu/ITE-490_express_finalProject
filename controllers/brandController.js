const Brand = require("../models/brandModel");
const { validationResult } = require('express-validator');

exports.index = async (req, res, next) => {
  try {
    const data = await Brand.find();
    res.status(200).json({
      Data: data
    })
  } catch (error) {
    next(error);
  }
};


exports.add = async (req, res, next) => {
  try {
    const { brand_name } = req.body;
    console.log(brand_name)

    // if(brand_name === ""){
    //   const error = new Error("กรุณาใส่ชื่อ")
    //   error.statusCode = 422  // common validation
    //   error.validation = errors.array()
    //   throw error
    // }


    //check input empty
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("อะไรสักอย่างผิดแหละ")
      error.statusCode = 422  // common validation
      error.validation = errors.array()
      throw error
    }

    //check exist brand name
    const brandName = await Brand.findOne({ brand_name: brand_name })
    if (brandName) {
      const error = new Error('มีชื่อแบรนด์นี้อยู่ในระบบอยู่แล้ว');
      error.statusCode = 400;
      throw error
    }

    //save
    let brand = new Brand({
      brand_name: brand_name
    });
    await brand.save();

    res.status(201).json({
      messege: "ลงทะเบียนเรียบร้อย",
    });

  } catch (error) {
    next(error);
  }
}


exports.destroy = async (req, res, next) => {
  try {
    const { id } = req.params

    const deletedBrand = await Brand.deleteOne({ _id: id })
    if (deletedBrand.deletedCount === 0) {
      const error = new Error("ไม่พบข้อมูลผู้ใช้งาน")
      error.statusCode = 404
      throw error
    } else {
      res.status(200).json({
        message: "ลบข้อมูลเรียบร้อย",
      });
    }

  } catch (error) {
    next(error);
  }
};

