class TaskQueue
{
    constructor()
    {
        this.current = 0;
        this.tasks = {};
        this.queue = [];
        this.nextID = 1;
    }
    push(task)
    {
        const id = this.nextID;
        this.nextID++;
        task.setID(id);
        this.tasks[id] = task;
        this.queue.push(id);
        if (this.current == 0)
            this.next();
        return id;
    }
    status()
    {
        const result = {
            current: this.current,
            queueLength: this.queue.length,
            nextID: this.nextID
        };
        if (this.current !== 0)
        {
            result.taskStatus = this.tasks[this.current].status();
        }
        return result;
    }
    taskStatus(id)
    {
        if (this.tasks[id])
        {
            return this.tasks[id].status();
        }
        return null;
    }
    cleanup()
    {
        // TODO
    }
    next()
    {
        if (task.queue.length)
        {
            this.current = task.queue.shift();
            this.tasks[this.current].start();
        }
        else
        {
            this.current = 0;
        }
    }
    onTaskDone(id)
    {
        this.next();
    }
}

module.exports = TaskQueue;
