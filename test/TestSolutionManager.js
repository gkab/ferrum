const SolutionManager = require('../ferrum/SolutionManager')

let sm = new SolutionManager(0, 'ferrum-testing');

async function test()
{
    await sm.init();
    await sm.processStudentSolution(1, process.stdout, process.stderr);
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
