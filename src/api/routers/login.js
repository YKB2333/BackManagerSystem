const Router = require('koa-router');
const db = require('../db');
const token = require('../utils/token');
// 创建路由
var router = new Router();

router.post('/',async (ctx,next)=>{
    // ctx.body = 'denglu';
    let {username,password} = ctx.request.body;

    let res = await db.find('user',{username,password});

    res = res[0];

    if(res){
        let _token = token.create(username);
        ctx.body = {
            _id:res._id,
            username:res.username,
            gender:res.gender,
            regtime:res.regtime,
            token:_token,
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