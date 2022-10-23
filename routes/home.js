const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    return res.render('index', {
        title: "Vidly Api",
        message: "Welcome to the Vidly API"
    });
});

module.exports = router;