module.exports = {
    C: {
        cc: 'gcc',
        ld: 'gcc',
        cflags: '--std=c89 -Wall -Werror',
        cflags_blacklist: '-w -Wno-* --std=* -fpermissive -o',
        lflags: '',
        lflags_blacklist: '-o'
    },
    CXX: {
        cc: 'g++',
        ld: 'g++',
        cflags: '-Wall -Werror',
        cflags_blacklist: '-w -Wno-* -fpermissive -o',
        lflags: '',
        lflags_blacklist: '-o'
    }
}
