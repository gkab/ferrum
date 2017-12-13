const { mergeFlags } = require('../languages/CCFlags');
const languages = require('../config/languages');

try
{
    console.log(mergeFlags(languages.C.cflags_blacklist, languages.C.cflags, '-m32 -Iinclude -isystemtest'));
    console.log(mergeFlags(languages.C.cflags_blacklist, languages.C.cflags, '-m32 -Iinclude -isystemtest  --std=c99'));
}
catch (err) {}
