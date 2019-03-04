const Router = require('koa-router');
const db = require('../db');
// 创建路由
var router = new Router();
var ObjectId = require('mongodb').ObjectId;//引入mongodb的_id方法
router.post('/',async (ctx,next)=>{
    // ctx.body = 'denglu';
    let {_id} = ctx.request.body;
    // console.log(ctx.request.body)
    _id = {_id: ObjectId(_id)};
    let res = await db.find('goodslist',_id);
    // console.log(11)
    // res.map(function (item) {
    //     item._id = item._id.toString().split('"')[0];
    //     item.adding_time = setTimes(item.adding_time * 1);
    //     return item;
    
    
    // });
    // let arr = JSON.parse(str);
    
    if(res){
        ctx.body = {
            
            code:1,
            msg:"",
            count:1000,
            data:res
        }
    }else{
        ctx.body = {
            code:0,
            msg:'fail'
        }
    }
    // console.log(ctx.body);
});

router.post('/update',async (ctx,next)=>{
    console.log(ctx.request.body,22);
    // ctx.body = 'denglu';
    // let {_id} = ctx.request.body;
    // console.log(_id,11);
    let {_id,goods_name,sub_heading,old_price,now_price,category,img,stock,attributes,state,description} = ctx.request.body;
    // let {_id} = ctx.request.body;
    console.log({goods_name,sub_heading,old_price,now_price,category,img,stock,attributes,state,description},33);
    
    // console.log({goods_name,sub_heading,old_price,now_price,category,img,stock,attributes,state,description,adding_time})
    _id = {_id: ObjectId(_id)};
    console.log(_id,22);
    
    // delete ctx.request.body._id;
    
    
    let res = await db.update('goodslist',_id,{goods_name,sub_heading,old_price,now_price,category,img,stock,attributes,state,description});

    
    // if(res){
        ctx.body = {
            
            code:0,
            msg:"",
            count:1000,
            data:res
        }
    // }else{
    //     ctx.body = {
    //         code:100,
    //         msg:'fail'
    //     }
    // }
    // console.log(ctx.body);
});
module.exports = router;


