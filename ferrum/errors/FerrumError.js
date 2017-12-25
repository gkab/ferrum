class FerrumError extends Error
{
    constructor(message, status)
    {
        super(message);

        this.status = status || 500;
        this.message = message || 'Internal server error';

        Error.captureStackTrace(this, FerrumError);
    }
}

module.exports = FerrumError;
