const express = require('express');
const Joi = require('joi');

const app = express();

app.use(express.json());

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

app.get('/', (req, res) => {
    return res.send('Welcome to Vidly API');
});

app.get('/api/genres', (req, res) => {
    return res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(x => x.id == parseInt(req.params.id));

    if ( !genre ) {
        return res.status(404).send('Genres not found');
    }

    return res.send(genre);
});

app.post('/api/genres', (req, res) => {
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

app.put('/api/genres/:id', (req, res) => {

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

app.delete('/api/genres/:id', (req, res) => {

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

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));