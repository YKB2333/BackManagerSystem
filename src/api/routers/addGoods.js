const Router = require('koa-router');
const db = require('../db');
// 创建路由
var router = new Router();
// var ObjectId = require('mongodb').ObjectId;//引入mongodb的_id方法
router.post('/',async (ctx,next)=>{
    // ctx.body = 'denglu';
    let {goods_name,sub_heading,old_price,now_price,category,img,stock,attributes,state,description,adding_time} = ctx.request.body;
    // console.log(ctx.request.body)
    let res = await db.insert('goodslist',{goods_name,sub_heading,old_price,now_price,category,img,stock,attributes,state,description,adding_time});
    // +_description+"&adding_time="+Date.now()
    // console.log({goods_name,sub_heading,old_price,now_price,category,img,stock,attributes,state,description})
    // res.map(function (item) {
    //     item._id = item._id.toString().split('"')[0];
    //     item.adding_time = setTimes(item.adding_time * 1);
    //     return item;
    
    
    // });
    // let arr = JSON.parse(str);
    
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

//渲染分类
router.post('/find_category',async (ctx,next)=>{
    // ctx.body = 'denglu';
    // let {goods_name,sub_heading,old_price,now_price,category,img,stock,attributes,state,description,adding_time} = ctx.request.body;
    // console.log(ctx.request.body)
    let res = await db.find('category');

    console.log(res)
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
module.exports = router;


