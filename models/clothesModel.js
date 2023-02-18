const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clothesSchema = new Schema({
    clothesName: { type: String, require: true, },
    clothesType: { type: String, require: true,  },
    brand_name: { type: Schema.Types.ObjectId, ref: 'brand' }

},
    {
        toJSON: { virtuals: true },
        timestamps: true,
        collection: "clothes"
    })

const clothes = mongoose.model("Clothes", clothesSchema);
module.exports = clothes;