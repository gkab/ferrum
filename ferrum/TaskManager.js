const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const AlreadyExistsError = require('./errors/AlreadyExistsError');
const NotFoundError = require('./errors/NotFoundError');

class TaskManager
{
    constructor()
    {
        let adapter = new FileSync('data/tasks.json');
        this.db = low(adapter);
        this.db.defaults({ tasks: [] }).write();
    }
    get(id)
    {
        return this.db.get('tasks').find({ id: id }).value();
    }
    create(id, options)
    {
        if (get(id))
            throw new AlreadyExistsError(`Task ${id} already exists`);

        this.db.get('tasks').push({
            id: id
        });
    }
    delete(id)
    {
        if (!get(id))
            throw new Error(`Task ${id} does not exist`);

    }
}

module.exports = TaskManager;
