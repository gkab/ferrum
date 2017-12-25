const FerrumError = require('./errors/FerrumError');

function errorHandler(error, req, res, next)
{
    if (error instanceof FerrumError)
    {
        res.status(error.status).end(error.message);
    }
    else
    {
        res.status(500).end('Internal server error');
        console.log(error);
    }
}

module.exports = errorHandler;
