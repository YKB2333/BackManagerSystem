const Router = require('koa-router');
const db = require('../db');
// 创建路由
var router = new Router();

//获取商品所有数据
router.get('/renderAll',async (ctx,next)=>{
    // ctx.body = 'denglu';
    // let {username,password} = ctx.request.body;
    console.log(ctx.request.body);
    let res = await db.find('user');
    
    res.map(function (item) {
        let date = new Date(parseInt(item.time));
        return item.time = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`;
    });
    // let arr = JSON.parse(str);
    // console.log(res)
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
    // console.log(ctx.body);
});

//根据用户名查询一条数据
router.post('/renderOne',async (ctx,next)=>{
    // let {username} = ctx.request.body;
    let res = await db.find('user',ctx.request.body);
    console.log(ctx.request.body);
    ctx.body = res;
});

//删除商品
router.post('/delete',async (ctx,next)=>{
    console.log(ctx.request.body); 
});

module.exports = router;