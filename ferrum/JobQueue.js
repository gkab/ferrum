const _ = require('lodash');
const Ferrum = require('./Ferrum');

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
        Ferrum.logger.info(`Pushed a new job "${job.constructor.name}" with ID ${id}`);
        if (this.current == 0)
            this.next();
        return id;
    }
    filter(fn)
    {
        let filtered = [];
        for (let i of this.queue.concat(this.current))
        {
            if (fn(this.jobs[i]))
                filtered.push(i);
        }
        return filtered;
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
    cancel(id)
    {
        if (id == this.current)
            throw new Error('cannot cancel running job');
        if (this.jobs[id])
        {
            _.remove(this.queue, n => n == id);
        }
        else
            throw new Error(`no job with id ${id}`);
    }
    jobStatus(id)
    {
        if (this.jobs[id])
        {
            return this.jobs[id].getStatus();
        }
        return null;
    }
    cleanup()
    {
        // TODO
    }
    next()
    {
        Ferrum.logger.debug(`Ready to execute next job`);
        if (this.queue.length)
        {
            this.current = this.queue.shift();
            let job = this.jobs[this.current];
            Ferrum.logger.info(`Making job "${job.constructor.name}" with ID ${this.current} current`);
            this.jobs[this.current].start();
        }
        else
        {
            this.current = 0;
        }
    }
    onJobDone(id)
    {
        Ferrum.logger.info(`Job "${this.jobs[id].constructor.name}" with ID ${this.current} is done`);
        this.next();
    }
}

module.exports = JobQueue;
