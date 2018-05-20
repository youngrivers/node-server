var fn_index = async(ctx, next) => {
    ctx.response.body = `<h1>hello</h1>\
    <form action="/login" method="post">\
        <p>Name: <input name="name" value="koa"></p>\
        <p>Password: <input name="password" type="password"></p>\
        <p><input type="submit" value="Submit"></p>\
    </form>`;
}
var fn_login = async(ctx, next) => {
    console.log('fn_login--------');
    let name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(`${name},${password}`);
    if (name === 'koa' && password === '1234') {
        ctx.response.body = `<h1>登录成功:${name}</h1>`
    } else {
        ctx.response.body = `<h1>登录失败</h1>\
        <p><a href="/">返回</a></p>`

    }
}
module.exports = {
    'GET /': fn_index,
    'POST /login': fn_login
}