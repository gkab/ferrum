const LanguageContextAbstract = require('../ferrum/LanguageContextAbstract.js');
const { NotImplementedMethodCall } = require('../ferrum/Builtin');
const { mergeFlags } = require('./CCHelper');

const fs = require('fs');
const os = require('os');
const path = require('path');
const Promise = require('promise');
const randomstring = require('randomstring');
const child_process = require('child_process');

class LanguageContextCXX extends LanguageContextAbstract
{
    constructor(cwd, config, options)
    {
        super('CXX', cwd, config, options);

        NotImplementedMethodCall();
    }
}

module.exports = LanguageContextCXX;
