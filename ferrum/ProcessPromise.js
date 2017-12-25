const child_process = require('child_process');

module.exports = {
    asyncSpawn: async function asyncSpawn(command, args, options, ostream, estream)
    {
        console.log('DEBUG:', command, args, options);
        return new Promise((resolve, reject) => {
            let proc = child_process.spawn(command, args, options);
            let done = false;

            if (ostream)
                proc.stdout.pipe(ostream);
            if (estream)
                proc.stderr.pipe(estream);

            proc.on('error', (error) => {
                if (done)
                    return;
                done = true;
                reject(error);
            });
            proc.on('exit', (status) => {
                if (done)
                    return;
                done = true;
                resolve(status);
            });
        });
    }
}
