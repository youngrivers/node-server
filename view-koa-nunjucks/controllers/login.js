module.exports = {
    'POST /login': async(ctx, next) => {
        console.log('dknlnilnln');
        var
            email = ctx.request.body.name || '',
            password = ctx.request.body.password || '';
        if (email === 'admin@qq.com' && password === '123456') {
            // 登录成功:
            ctx.render('login-ok.html', {
                title: 'Sign In OK',
                name: 'Mr Node'
            });
        } else {
            // 登录失败:
            ctx.render('login-failed.html', {
                title: 'Sign In Failed'
            });
        }
    }
}