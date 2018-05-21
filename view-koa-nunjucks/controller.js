const fs = require('fs');

function addMaps(router, maps) {
    for (const url in maps) {
        if (url.startsWith('GET')) {
            let path = url.substring(4);
            console.log(maps[url]);
            router.get(path, maps[url]);
            console.log(`GET---${path}`);
        } else if (url.startsWith('POST')) {
            let path = url.substring(5);
            console.log(maps[url]);
            router.post(path, maps[url]);
            console.log(`POST---${path}`);
        } else if (url.startsWith('PUT ')) {
            var path = url.substring(4);
            router.put(path, mapping[url]);
            console.log(`register URL mapping: PUT ${path}`);
        } else if (url.startsWith('DELETE ')) {
            var path = url.substring(7);
            router.del(path, mapping[url]);
            console.log(`register URL mapping: DELETE ${path}`);
        } else {
            console.log(`---${url}`);
        }
    }
}

function addControllers(router, dir) {
    fs.readdirSync(__dirname + '/' + dir).filter((f) => {
        return f.endsWith('.js'); //得到所有js文件
    }).forEach((f) => {
        console.log(`js文件------${f}`);
        let maps = require(__dirname + '/' + dir + '/' + f);
        addMaps(router, maps);
    });
}
module.exports = function(dir) {
    let controllers_dir = dir || 'controllers';
    const router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
}