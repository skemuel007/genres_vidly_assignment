const { Customer, validate } = require('../models/customer')
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    return res.send(customers);
});

router.get('/:id',async (req, res) => {
    const customer = await Customer.findById(req.params.id);

    if( !customer) 
        return res.status(404).send('Customer with ID not found')
    
    return res.send(customer);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    
    if ( error ) {
        return res.status(400).send(error.details[0].message);
    }

    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });

    // genres.push(genre);
    customer = await customer.save();

    return res.status(200).send(customer);
});

router.put('/:id', async (req, res) => {

    const { error } = validate(req.body);
    
    if ( error ) {
        return res.status(400).send(error.details[0].message);
    }

    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    }, { new: true});

    if ( !customer ) {
        return res.status(404).send('Customer not found');
    }

    return res.status(200).send(customer);
});

router.delete('/:id', async (req, res) => {
    try
    {
        const customer = await Customer.findByIdAndRemove(req.params.id);
        if ( !customer) return res.status(404).send('The customer with the given Id was not found')
    
        return res.status(200).send(customer);
    } catch(err) {
        return res.status(500).send('Internal server error');
    }
});

module.exports = router;