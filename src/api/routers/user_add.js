const Router = require('koa-router');
const db = require('../db');
// 创建路由
var router = new Router();

router.get('/',async (ctx,next)=>{
    // ctx.body = 'denglu';
    let {username,password} = ctx.request.body;

    let res = await db.insert('user',ctx.request.body);
    
    
    if(res){
        ctx.body = {
            
            code:0,
            msg:"",
            count:1000,
            data:res
        }
    }else{
        ctx.body = {
            code:100,
            msg:'fail'
        }
    }
    console.log(ctx.body);
});

module.exports = router;