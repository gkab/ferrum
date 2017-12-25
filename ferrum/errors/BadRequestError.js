class BadRequestError extends require('./FerrumError')
{
    constructor(message)
    {
        super(message || 'Bad request', 400);
    }
}

module.exports = BadRequestError;
