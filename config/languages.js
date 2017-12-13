module.exports = {
    C: {
        cflags: [ '--std=c89', '-Wall', '-Werror' ],
        cflags_blacklist: [ '-w', '-Wno-*', '--std=*', '-fpermissive' ],
        lflags: []
    },
    CXX: {
        cflags: [ '-Wall', '-Werror' ],
        cflags_blacklist: [ '-w', '-Wno-*', '-fpermissive' ],
        lflags: []
    }
}
