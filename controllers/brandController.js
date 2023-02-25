const Brand = require("../models/brandModel");
const Clothes = require("../models/clothesModel");
const { validationResult } = require('express-validator');

//get brand name
exports.getBrand = async (req, res, next) => {
  try {
    const data = await Brand.find();
    res.status(200).json({
      Data: data
    })
  } catch (error) {
    next(error);
  }
};

//get all clothes
exports.getClothes = async (req, res, next) => {
  try {
    const data = await Clothes.find().populate('brand_name'); //populate ไปที่ field ที่เราต้องการ populate
    res.status(200).json({
      Data: data
    })
  } catch (error) {
    next(error);
  }
};

exports.findClothestype = async (req, res, next) => {
  try {
    const { id } = req.params
    const data = await Clothes.find({ clothesType: id.toLowerCase() }).populate('brand_name'); //populate ไปที่ field ที่เราต้องการ populate
    res.status(200).json({
      Data: data
    })
  } catch (error) {
    next(error)
  }
}

//get 1 brand all clothes
exports.getBrandClothes = async (req, res, next) => {
  try {
    const { id } = req.params
    const data = await Brand.findOne({ brand_name: id.toLowerCase() }).populate('clothes'); //populate ไปที่ field ที่เราต้องการ populate
    res.status(200).json({
      Data: data
    })
  } catch (error) {
    next(error);
  }
}

//add brand name
exports.addbrand = async (req, res, next) => {
  try {
    const { brand_name } = req.body;

    //check validate อยู่ในหน้า route
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



//add clothes
exports.addclothes = async (req, res, next) => {
  try {

    //destructure
    const { clothesName, clothesType, brand_name } = req.body;

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
    if (!brandName) {
      const error = new Error('ไม่พบชื่อแบรนด์นี้ในระบบ');
      error.statusCode = 400;
      throw error
    }

    //save
    let clothes = new Clothes({
      clothesName: clothesName,
      clothesType: clothesType,
      brand_name: brandName._id
    });
    clothes.save();

    //response
    res.status(201).json({
      messege: "ลงทะเบียนเรียบร้อย",
    });

  } catch (error) {
    next(error);
  }
}




//destroy brand
exports.destroybrand = async (req, res, next) => {
  try {
    const { id } = req.params

    //Delete Brand one by id
    const deletedBrand = await Clothes.deleteOne({ _id: id })
    //check delete complete
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

//destroy brand
exports.destroyclothes = async (req, res, next) => {
  try {
    const { id } = req.params

    //Delete Brand one by id
    const deletedClothes = await Clothes.deleteOne({ _id: id })
    //check delete complete
    if (deletedClothes.deletedCount === 0) {
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