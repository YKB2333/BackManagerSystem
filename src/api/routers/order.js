const Router = require('koa-router');
const db = require('../db');
// 创建路由
var router = new Router();

//获取订单所有数据
router.get('/renderAll',async (ctx,next)=>{
    let {page,limit} = ctx.request.query;
    let res = await db.find('orderlist',{});

    let res2 = await db.find('orderlist',{},page,parseInt(limit));

    // console.log(res2);
    res2.map(function(item){
        item.totalprice = ((item.price)*(item.num)+(item.freight)*1).toFixed(2);
        item.price = (item.price).toFixed(2);
        item.freight = (item.freight).toFixed(2);
    });
    
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

//删除订单
router.post('/delete',async (ctx,next)=>{
    // console.log(ctx.request.body); 
    let {code} = ctx.request.body;
    let res = await db.delete('orderlist',{code});
    ctx.body = {"code":200};
});

//修改订单状态
router.post('/updateStatus',async (ctx,next)=>{
    // console.log(ctx.request.body); 
    let {code,status} = ctx.request.body;
    let res = await db.update('orderlist',{code},{status});
    if(res.result.ok){
        ctx.body = {
            code:200,
            msg:'修改成功'
        }
    }
});

module.exports = router;