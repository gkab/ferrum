const fs = require('fs-extra');
const path = require('path')
const sha1file = require('sha1-file');

class DiffHelper
{
    static listGenerate(dir)
    {
        let result = {};

        function listFill(folder)
        {
            let files = fs.readdirSync(folder);
            for (let file of files)
            {
                if (path.basename(file) == '.git')
                    return;

                file = path.join(folder, file);

                let stats = fs.statSync(file);
                if (stats.isDirectory())
                {
                    listFill(file);
                }
                else
                {
                    result[path.relative(dir, file)] = sha1file(file);
                }
            }
        }
        listFill(dir);

        return result;
    }
    static diffGenerate(path1, path2)
    {
        let list1 = DiffHelper.listGenerate(path1);
        let list2 = DiffHelper.listGenerate(path2);

        let diff = {
            added: [],
            removed: [],
            changed: []
        };

        for (let name in list1)
        {
            if (!list2[name])
                diff.removed.push(name);
            else if (list1[name] !== list2[name])
                diff.changed.push(name);
        }
        for (let name in list2)
        {
            if (!list1[name])
                diff.added.push(name);
        }

        return diff;
    }
}

module.exports = DiffHelper;
