const mongoose = require("mongoose");
const validator = require("validator");

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        immutable: true,
        unique: [true, "email id already exists"],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email");
            }
        }
    },
    mobile: {
        type: Number,
        min: 10,
        unique: true
    },
    age: {
        type: Number,
        immutable: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

// creating new collection using models
const Customer = new mongoose.model('Customer', customerSchema);
module.exports = Customer;