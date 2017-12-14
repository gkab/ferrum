const SolutionBuilder = require('../ferrum/SolutionBuilder');

let config = require('./TestSolution/build.json');
console.log(config);

let sb = new SolutionBuilder('TestSolution', config);

async function test()
{
    await sb.build();
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
