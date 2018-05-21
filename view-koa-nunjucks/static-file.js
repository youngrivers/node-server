const path = require('path');
const mime = require('mime');
const fs = require('mz/fs');
module.exports = function staticFiles(url, dir) {
    return async(ctx, next) => {
        let r_path = ctx.request.path;
        if (r_path.startsWith(url)) { // 判断是否以指定的url开头:
            let full_path = path.join(dir, r_path.substring(url.length)); // 获取文件完整路径
            if (await fs.exists(full_path)) { // 判断文件是否存在
                ctx.response.type = mime.getType(r_path); // 查找文件的mime
                ctx.response.body = await fs.readFile(full_path); // 读取文件内容并赋值给response.body
            } else {
                ctx.response.status = 404; // 文件不存在
            }
        } else {
            await next(); // 不是指定前缀的URL，继续处理下一个middleware
        }
    };
}