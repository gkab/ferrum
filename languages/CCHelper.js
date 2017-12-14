const tassert = require('assert-types');

module.exports = {
    mergeFlags: function mergeFlags(blacklist, defaults, user)
    {
        // Clone the array
        let result = defaults.slice(0);

        for (let flag of user)
        {
            tassert.string(flag);

            if (!flag.length)
                continue;

            for (let blackflag of blacklist)
            {
                let star = blackflag.indexOf('*');
                if (star > 0)
                {
                    if (flag.indexOf(blackflag.substr(0, star)) >= 0)
                        throw new Error(`Blacklisted flag ${blackflag}`);
                }
                else
                {
                    if (flag == blackflag)
                        throw new Error(`Blacklisted flag ${blackflag}`);
                }
            }
            result.push(flag);
        }

        // Remove all flags of length 0
        return result.filter(f => f.length);
    }
};
