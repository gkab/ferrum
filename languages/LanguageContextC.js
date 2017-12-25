const LanguageContextAbstract = require('../ferrum/LanguageContextAbstract.js');
const { NotImplementedMethodCall } = require('../ferrum/Builtin');
const { mergeFlags } = require('./CCHelper');
const { asyncSpawn } = require('../ferrum/ProcessPromise');

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

        this.buildPath = path.join(os.tmpdir(), 'ferrum-build', '' + Date.now());
        fs.emptyDirSync(this.buildPath);
    }
    parseSources(sources)
    {
        let result = [];
        for (let i of sources)
        {
            if (path.extname(i) != '.c')
                throw new Error(`Source file does not have .c extension: ${i}`);
            if (!fs.existsSync(path.join(this.cwd, i)))
                throw new Error(`Source file does not exist: ${i}`);
            result.push(i);
        }
        return result;
    }
    getObjectPath(source)
    {
        return path.join(this.buildPath, path.basename(source, '.c')) + '.o';
    }
    cleanup()
    {
        if (this.buildPath)
            fs.removeSync(this.buildPath);
    }
    getStatus()
    {
        NotImplementedMethodCall();
    }
    async compileSource(source)
    {
        let object = this.getObjectPath(source);

        let status = await asyncSpawn(this.config.cc, this.cflags.concat([source, '-c', '-o', object]), {
            cwd: this.cwd
        }, this.streamStdout, this.streamStderr);

        if (status != 0)
            throw new Error(`Compiler ${this.config.cc} exited with code ${status}`);

        return object;
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
        let status = await asyncSpawn(this.config.ld, this.objects.concat(this.lflags), {
            cwd: this.buildPath
        }, this.streamStdout, this.streamStderr);

        if (status != 0)
            throw new Error(`Linker ${this.config.ld} exited with code ${status}`);
    }
}

module.exports = LanguageContextC;
