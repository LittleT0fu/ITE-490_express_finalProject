const mongoose = require('mongoose');
const { schema } = require('./userModel');
const Schema = mongoose.Schema;

const clothesSchema = new schema({
    clothesName : {type: String, require: true ,},
    clothesType : {type: String, require: true ,},
    brand : {type: Schema.Types.ObjectId , ref:"brand"}

},
{toJSON:{virtuals: true},
timestamps: true,
collection : "clothes"})

const clothes = mongoose.model("Clothes", clothesSchema);
module.exports = clothes;