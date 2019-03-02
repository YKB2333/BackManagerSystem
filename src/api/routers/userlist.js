const Router = require('koa-router');
const db = require('../db');
// 创建路由
var router = new Router();

//获取商品所有数据
router.get('/renderAll',async (ctx,next)=>{
    // ctx.body = 'denglu';
    // console.log(ctx.request.query);
    let {page,limit} = ctx.request.query;
    let res = await db.find('user',{});

    let res2 = await db.find('user',{},page,parseInt(limit));
    res2.map(function (item) {
        let date = new Date(parseInt(item.time));
        return item.time = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`;
    });
    // let arr = JSON.parse(str);
    // console.log(res2);
    
    if(res2){

        ctx.body = {
            code:0,
            msg:"",
            count:res.length,
            data:res2
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
    // console.log(ctx.request.body); 
    let {username} = ctx.request.body;
    for(let i=0;i<username.length;i++){
        // console.log(username[i]);
        await db.delete('user',{"username":username[i]});
    }
    ctx.body = {code:200};
});

module.exports = router;