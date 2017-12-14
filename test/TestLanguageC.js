const LanguageController = require('../ferrum/LanguageController');

let lc = new LanguageController();
let cc = lc.createSolutionContext('C', 'TestSolution', {
    sources: [ 'fun.c', 'hello.c' ],
    cflags: '-DDEBUG=1',
    lflags: '-lm'
});

async function test()
{
    console.log('CContext:', cc);
    await cc.compile();
    await cc.link();
}

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

async function main()
{
    try
    {
        await test();
    }
    catch (error)
    {
        console.log(error);
    }
    finally
    {
        cc.cleanup();
    }
}

main();
