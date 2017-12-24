class AlreadyExistsError extends require('./FerrumError')
{
    constructor(message)
    {
        super(message || 'Resource already exists', 400);
    }
}
