class JobQueue
{
    constructor()
    {
        this.current = 0;
        this.jobs = {};
        this.queue = [];
        this.nextID = 1;
    }
    push(job)
    {
        const id = this.nextID;
        this.nextID++;
        job.setID(id);
        this.jobs[id] = job;
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
            result.jobStatus = this.jobs[this.current].status();
        }
        return result;
    }
    jobStatus(id)
    {
        if (this.jobs[id])
        {
            return this.jobs[id].status();
        }
        return null;
    }
    cleanup()
    {
        // TODO
    }
    next()
    {
        if (this.queue.length)
        {
            this.current = this.queue.shift();
            this.jobs[this.current].start();
        }
        else
        {
            this.current = 0;
        }
    }
    onJobDone(id)
    {
        this.next();
    }
}

module.exports = JobQueue;
