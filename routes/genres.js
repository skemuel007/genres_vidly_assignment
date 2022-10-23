const express = require('express');
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');


const genres = [
    {
        id: 1,
        name: "pop"
    },
    {
        id: 2,
        name: "classic"
    },
    {
        id: 3,
        name: "R & B"
    },
    {
        id: 4,
        name: "Soul"
    }
]

router.get('/', (req, res) => {
    return res.send(genres);
});

router.get('/:id', (req, res) => {
    const genre = genres.find(x => x.id == parseInt(req.params.id));

    if ( !genre ) {
        return res.status(404).send('Genres not found');
    }

    return res.send(genre);
});

router.post('/', (req, res) => {
    const { error } = validateGenre(req.body);
    
    if ( error ) {
        return res.status(400).send(error.details[0].message);
    }

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };

    genres.push(genre);

    return res.status(200).send(genre);
});

router.put('/:id', (req, res) => {

    const genre = genres.find(x => x.id == parseInt(req.params.id));

    if ( !genre ) {
        return res.status(404).send('Genres not found');
    }

    const { error } = validateGenre(req.body);
    
    if ( error ) {
        return res.status(400).send(error.details[0].message);
    }

    genre.name = req.body.name;

    return res.status(200).send(genre);
});

router.delete('/:id', (req, res) => {

    const genre = genres.find(x => x.id == parseInt(req.params.id));

    if ( !genre ) {
        return res.status(404).send('Genres not found');
    }

    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    return res.status(200).send(genre);
});

function validateGenre(genre)
{
    const schema = Joi.object({
        name: Joi.string().min(5).required()
    })

    return schema.validate(genre);
}

module.exports = router;