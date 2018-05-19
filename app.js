const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
app.use(async(ctx, next) => {
    // await next();
    // ctx.response.type = 'text/html';
    // ctx.response.body = '<h1>njkkkh</h1>'
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});
router.get('/', async(ctx, next) => {
    ctx.response.body = `<h1>hello</h1>\
        <form action="/login" method="post">\
            <p>Name: <input name="name" value="koa"></p>\
            <p>Password: <input name="password" type="password"></p>\
            <p><input type="submit" value="Submit"></p>\
        </form>`;
})
router.post('/login', async(ctx, next) => {
    let name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(`${name},${password}`);
    if (name === 'koa' && password === '1234') {
        ctx.response.body = `<h1>登录成功:${name}</h1>`
    } else {
        ctx.response.body = `<h1>登录失败</h1>\
            <p><a href="/">返回</a></p>`

    }
})
router.get('/hello/:name', async(ctx, next) => {
    let name = ctx.params.name;
    ctx.response.body = `<h1>hello:${name}</h1>`;
})
app.use(bodyParser());
app.use(router.routes());
app.listen(1234);
console.log('服务器打开：1234');