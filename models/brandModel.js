const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const clothes = require('./clothesModel')

const brandSchema = new Schema({
    brand_name: { type: String, require: true, trim: true }
}, {
    toJSON: { virtuals: true },//อนุญาติให้ส่งข้อมูลเป็นประเภท json ได้
    timestamps: true,
    collection: "brand"
})


brandSchema.virtual('clothes', {
    ref: 'Clothes', //ชื่อเดียวกับชื่อ Shema ที่ Export
    localField: '_id',
    foreignField: 'brand_name', //ต้องเป็นชื่เดียวกับฟิลด์ที่จะอ้างอิง
});

const brand = mongoose.model("brand", brandSchema);
module.exports = brand;