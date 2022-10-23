const Joi = require('joi');
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    phone: {
        type: String,
        required: true,
        min: 11
    },
    isGold: {
        type: Boolean,
        default: false
    }
});

const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(customer)
{
    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        phone: Joi.string().min(11).required(),
        isGold: Joi.boolean().optional()
    })

    return schema.validate(customer);
}

module.exports.Customer = Customer;
module.exports.validate = validateCustomer;