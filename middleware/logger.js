function log(req, res, next) {
    console.log('Logger function call');
    next();
}

module.exports = log;
