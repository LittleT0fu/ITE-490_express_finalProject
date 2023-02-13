const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const clothes = require('./clothesModel')

const brandSchema = new Schema({
    brand_name: { type: String, require: true, trim: true }
}, {
    toJSON: { virtuals: true },
    timestamps: true,
    collection: "brand"
})


brandSchema.virtual('clothes', {
    ref: 'Clothes', //ชื่อเดียวกับชื่อ Shemaที่่ Export
    localField: '_id',
    foreignField: 'brand_name', //ต้องเป็นชื่เดียวกับฟิลด์ที่จะอ้างอิง
});

const brand = mongoose.model("brand", brandSchema);
module.exports = brand;