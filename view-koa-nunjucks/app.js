const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const controllers = require('./controller');
const static = require('./static-file');
const templating = require('./templating');
const isProduction = process.env.NODE_ENV === 'production';
app.use(async(ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});
app.use(static('/static/', __dirname + '/static')); //URL前缀和一个目录，然后返回一个async函数
app.use(bodyParser());
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));
app.use(controllers()); //使用middilware
app.listen(1111);
console.log('服务器启动端口：1111');