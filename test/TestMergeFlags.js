const { mergeFlags } = require('../languages/CCHelper');
const languages = require('../config/languages');

try { console.log(mergeFlags(languages.C.cflags_blacklist, languages.C.cflags, '-m32 -Iinclude -isystemtest')); } catch (error) { console.log(error.message); }
try { console.log(mergeFlags(languages.C.cflags_blacklist, languages.C.cflags, '-m32 -Iinclude -isystemtest -w -Wno-error')); } catch (error) { console.log(error.message); }
try { console.log(mergeFlags(languages.C.cflags_blacklist, languages.C.cflags, '   --std=c99')); } catch (error) { console.log(error.message); }
