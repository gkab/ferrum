module.exports = {
    C: {
        cc: 'gcc',
        ld: 'gcc',
        cflagsDefault: [ '-Wall', '-Werror', '--std=c89' ],
        cflagsBlacklist: [ '-w', '-Wno-*', '-fpermissive', '-o', '--std=*' ],
        lflagsDefault: [],
        lflagsBlacklist: [ '-o' ]
    },
    CXX: {
        cc: 'g++',
        ld: 'g++',
        cflagsDefault: [ '-Wall', '-Werror' ],
        cflagsBlacklist: [ '-w', '-Wno-*', '-fpermissive', '-o' ],
        lflagsDefault: [],
        lflagsBlacklist: [ '-o' ]
    }
}
