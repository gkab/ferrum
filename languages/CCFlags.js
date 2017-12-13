module.exports = {
    mergeFlags: function mergeFlags(blacklist, flags_default, flags_user)
    {
        var result = [].concat(flags_default.split(' '));
        for (let flag of flags_user.split(' '))
        {
            if (!flag.length)
                continue;
            for (let fflag of blacklist)
            {
                let star = fflag.indexOf('*');
                if (star > 0)
                {
                    if (flag.indexOf(fflag.substr(0, star)) > 0)
                        throw new Error(`Blacklisted flag ${fflag}`);
                }
                else
                {
                    if (flag == fflag)
                        throw new Error(`Blacklisted flag ${fflag}`);
                }
            }
            result.push(flag);
        }
        return result;
    }
};
