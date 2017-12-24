class NotFoundError extends require('./FerrumError')
{
    constructor(message)
    {
        super(message || 'Resource not found', 404);
    }
}
