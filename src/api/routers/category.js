const Router = require('koa-router');
const db = require('../db');
// 创建路由
var router = new Router();
// var ObjectId = require('mongodb').ObjectId;//引入mongodb的_id方法

//渲染分类列表
router.get('/',async (ctx,next)=>{
    // ctx.body = 'denglu';
    // let {username,password} = ctx.request.body;

    let res = await db.find('category');

    res.map(function (item) {
        // item._id = item._id.toString().split('"')[0];
        item.adding_time = setTimes(item.adding_time * 1);
        return item;
    
    
    });
    // let arr = JSON.parse(str);
    
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

function setDb(num){
    if(num >= 10){
        return num;
    }else if(num < 10){
        return '0' + num;
    }
}
function setTimes(timer) {
	var time = new Date(timer);
	var year = time.getFullYear();//年
	var mon = setDb(time.getMonth() + 1);//0 
	var day = setDb(time.getDate());//24
	var hour = setDb(time.getHours());//时
	var min = setDb(time.getMinutes());//分
	var sec = setDb(time.getSeconds());//秒

    return year +'/' + mon + '/' + day
}

//添加分类
router.post('/addCategory',async (ctx,next)=>{
    // ctx.body = 'denglu';
    let {category_name,remarks,adding_time} = ctx.request.body;

    // let res = await db.find('goodslist');
    let res = await db.insert('category',{category_name,remarks,adding_time});
    // res.map(function (item) {
    //     // item._id = item._id.toString().split('"')[0];
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
    console.log(ctx.body);
});

//修改分类
//查找指定分类
var ObjectId = require('mongodb').ObjectId;//引入mongodb的_id方法
router.post('/find',async (ctx,next)=>{
    // ctx.body = 'denglu';
    let {_id} = ctx.request.body;
    // console.log(ctx.request.body)
    _id = {_id: ObjectId(_id)};
    let res = await db.find('category',_id);
    console.log(res)
    
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
module.exports = router;