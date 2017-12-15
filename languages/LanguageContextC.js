const LanguageContextAbstract = require('../ferrum/LanguageContextAbstract.js');
const { NotImplementedMethodCall } = require('../ferrum/Builtin');
const { mergeFlags } = require('./CCHelper');

const fs = require('fs-extra');
const os = require('os');
const path = require('path');
const Promise = require('promise');
const randomstring = require('randomstring');
const tassert = require('assert-types');
const child_process = require('child_process');

class LanguageContextC extends LanguageContextAbstract
{
    constructor(cwd, config)
    {
        super('C', cwd, config);

        this.objects = [];
        let tmppath = path.join(os.tmpdir(), `ferrum-${Date.now()}`);
        fs.mkdirSync(tmppath);
        // If fs.mkdirSync fails, we won't reach this statement
        // Meaning that cleanup() won't try to delete anything
        this.objectPath = tmppath;
    }
    applyBuildOptions(options, streamStdout, streamStderr)
    {
        tassert.array(options.files);
        tassert.array(options.cflags);
        tassert.array(options.lflags);

        this.streamStdout = streamStdout;
        this.streamStderr = streamStderr;

        this.sources = this.parseSources(options.files);
        this.cflags = mergeFlags(this.config.cflagsBlacklist, this.config.cflagsDefault, options.cflags);
        this.lflags = mergeFlags(this.config.lflagsBlacklist, this.config.lflagsDefault, options.lflags);
    }
    parseSources(sources)
    {
        let result = [];
        for (let i of sources)
        {
            i = path.join(this.cwd, i);
            if (path.extname(i) != '.c')
                throw new Error(`Source file does not have .c extension: ${i}`);
            if (!fs.existsSync(i))
                throw new Error(`Source file does not exist: ${i}`);
            result.push(i);
        }
        return result;
    }
    getObjectPath(source)
    {
        return path.join(this.objectPath, path.basename(source, '.c')) + '.o';
    }
    cleanup()
    {
        if (this.objectPath)
            fs.removeSync(this.objectPath);
    }
    getStatus()
    {
        NotImplementedMethodCall();
    }
    compileSource(source)
    {
        return new Promise((resolve, reject) => {
            let object = this.getObjectPath(source);
            let cc = child_process.spawn(this.config.cc, this.cflags.concat([source, '-c', '-o', object]));
            // TODO redirect to log files
            cc.stdout.pipe(this.streamStdout);
            cc.stderr.pipe(this.streamStderr);
            let exited = false;
            cc.on('exit', (code) => {
                if (!exited)
                {
                    if (code == 0)
                    {
                        resolve(object);
                    }
                    else
                    {
                        reject(new Error(`Compiler ${this.config.cc} exited with code ${code}`));
                    }
                }
                exited = true;
            });
            cc.on('error', (error) => {
                if (!exited)
                {
                    reject(new Error(`Compiler ${this.config.cc} emitted error: ${error}`));
                }
                exited = true;
            });
        });
    }
    async compile()
    {
        // TODO parallel compiling?
        try
        {
            for (let i of this.sources)
            {
                let object = await this.compileSource(i);
                console.log('compiled object', object);
                this.objects.push(object);
            }
        }
        catch (error)
        {
            throw error;
        }
        return true;
    }
    async link()
    {
        return new Promise((resolve, reject) => {
            let cc = child_process.spawn(this.config.ld, this.objects.concat(this.lflags), {
                cwd: this.objectPath
            });
            // TODO redirect to log files
            cc.stdout.pipe(this.streamStdout);
            cc.stderr.pipe(this.streamStderr);
            let exited = false;
            cc.on('exit', (code) => {
                if (!exited)
                {
                    if (code == 0)
                    {
                        resolve();
                    }
                    else
                    {
                        reject(new Error(`Linker ${this.config.ld} exited with code ${code}`));
                    }
                }
                exited = true;
            });
            cc.on('error', (error) => {
                if (!exited)
                {
                    reject(new Error(`Linker ${this.config.ld} emitted error: ${error}`));
                }
                exited = true;
            });
        });
    }
}

module.exports = LanguageContextC;
