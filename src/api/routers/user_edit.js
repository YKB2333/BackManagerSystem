const Router = require('koa-router');
const db = require('../db');
// 创建路由
var router = new Router();

//修改用户信息
router.post('/update',async (ctx,next)=>{
    // console.log(ctx.request.body);
    let username = (ctx.request.body).username;
    let res = await db.update('user',{"username":username},ctx.request.body);
    // console.log(res.result.ok);
    if(res.result.ok){
        ctx.body = {
            code:200,
            msg:'修改成功'
        }
    }
    

});

module.exports = router;