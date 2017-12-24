class FerrumError extends Error
{
    constructor(message, status)
    {
        super(message);

        this.status = status || 500;

        Error.captureStackTrace(this, FerrumError);
    }
}

module.exports = FerrumError;
