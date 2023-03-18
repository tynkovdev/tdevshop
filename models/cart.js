const { Decimal128 } = require("bson");
const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    id: {
        type: Decimal128,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Decimal128,
        required: true
    }
});

const Cart = mongoose.model(`Cart`, cartSchema);

module.exports = Cart;