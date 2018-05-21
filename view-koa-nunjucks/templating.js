const nunjucks = require('nunjucks');

function createEnv(path, opts) {
    var
        autoescape = opts.autoescape === undefined ? true : opts.autoescape,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader('views', {
                noCache: noCache,
                watch: watch,
            }), {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            });
    if (opts.filters) {
        for (var f in opts.filters) {
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}

function templating(path, opts) {
    let env = createEnv(path, opts); // 创建Nunjucks的env对象
    return async(ctx, next) => {
        ctx.render = function(view, model) { // 给ctx绑定render函数
            ctx.response.body = env.render(view, Object.assign({}, ctx.state || {}, model || {})); // 把render后的内容赋值给response.body
            ctx.response.type = 'text/html'; // 设置Content-Type
        };
        await next(); // 继续处理请求
    }
}
module.exports = templating;