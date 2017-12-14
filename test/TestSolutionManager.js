const Ferrum = require('../ferrum/Ferrum');

let sm = Ferrum.solutionManager;

async function test()
{
    await sm.setupMasterRepo('https://github.com/gkab/ferrum-testing');
    await sm.processStudentSolution('ferrum-test-student', 'ferrum-testing');
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
}

main();
