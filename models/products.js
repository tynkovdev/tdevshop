const { Decimal128 } = require("bson");
const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const productsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Decimal128,
        required: true
    },
    urlToImage: {
        type: String,
        required: true
    }
});

const Products = mongoose.model(`Products`, productsSchema);

// Export
module.exports = Products;