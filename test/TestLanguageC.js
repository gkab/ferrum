const LanguageController = require('../ferrum/LanguageController');

async function test()
{
    let lc = new LanguageController();
    let cc = lc.createSolutionContext('C', 'TestSolution', {
        sources: [ 'fun.c', 'hello.c' ],
        cflags: '',
        lflags: ''
    });
    console.log('CContext:', cc);
    await cc.compile();
    await cc.link();
}

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

try
{
    test();
}
catch (error)
{
    console.log(error);
}
