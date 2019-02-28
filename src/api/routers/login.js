const Router = require('koa-router');
const db = require('../db');
// 创建路由
var router = new Router();

router.post('/',async (ctx,next)=>{
    // ctx.body = 'denglu';
    let {username,password} = ctx.request.body;

    let res = await db.find('user',{username,password});

    res = res[0];

    if(res){
        ctx.body = {
            _id:res._id,
            username:res.username,
            gender:res.gender,
            regtime:res.regtime,
            code:200
        }
    }else{
        ctx.body = {
            code:100,
            msg:'fail'
        }
    }
});

module.exports = router;