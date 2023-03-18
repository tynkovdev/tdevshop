const { Decimal128 } = require(`bson`);
const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    title1: {
        type: String,
    },
    title2: {
        type: String,
    },
    title3: {
        type: String,
    },
    title4: {
        type: String,
    },
    title5: {
        type: String,
    },
    title6: {
        type: String,
    },
    title7: {
        type: String,
    },
    title8: {
        type: String,
    },
    title9: {
        type: String,
    },
    title10: {
        type: String,
    },
    totalPrice: {
        type: Decimal128,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    status_waiting: {
        type: Boolean,
        required: true
    }
});

const Order = mongoose.model(`Order`, orderSchema);

module.exports = Order;