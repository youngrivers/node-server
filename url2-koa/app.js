const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const controllers = require('./controller')
app.use(async(ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});
app.use(bodyParser());
app.use(controllers()); //使用middilware
app.listen(1234);
console.log('服务器打开：1234');