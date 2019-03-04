const Router = require('koa-router');
const db = require('../db');
// 创建路由
var router = new Router();
// var ObjectId = require('mongodb').ObjectId;//引入mongodb的_id方法
router.get('/',async (ctx,next)=>{
    // ctx.body = 'denglu';
    let {page,limit} = ctx.request.query;

    let res = await db.find('goodslist',{},page,parseInt(limit));
    let res2 = await db.find('goodslist');
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
            count:res2.length,
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

    return year +'/' + mon + '/' + day;
}
let ObjectId = require('mongodb').ObjectId;
//多个删除
router.post('/deleteMany',async (ctx,next)=>{
    let {_id_arr} = ctx.request.body;
    console.log({_id_arr});
    for(i = 0;i < _id_arr.length;i++){
        _id = {_id: ObjectId(_id_arr[i])};
        console.log(_id)
        await db.delete('goodslist',_id);
    }
    
    
        ctx.body = {
            
            code:0,
            msg:"删除成功",
            // count:1000,
            // data:res
        }
    
});
//单个删除
router.post('/deleteSingle',async (ctx,next)=>{
    let {_id} = ctx.request.body;
    // console.log({_id_arr});
    // for(i = 0;i < _id_arr.length;i++){
        _id = {_id: ObjectId(_id)};
        console.log(_id)
    let res =   await db.delete('goodslist',_id);
    // }
    
    console.log(res)
    
        ctx.body = {
            
            code:0,
            msg:"删除成功",
            // count:1000,
            data:res
        }
    
});
//修改上架
router.post('/state',async (ctx,next)=>{
    let {_id,state} = ctx.request.body;
    // let {state} = ctx.request.body;
    // console.log(ctx.request.body);
    // console.log({_id,state})
    // _id = {_id: ObjectId(_id)};
    // {"_id":ObjectId(_id),"state":state};
    if(state == '下架'){
        state = '上架';
    }else if (state == '上架') {
        state = '下架'
    }
    
    console.log({_id:ObjectId(_id),state:state})
    let res = await db.update('goodslist',{_id:ObjectId(_id)},{'state':state});
    if(res){
        ctx.body = {
            
            code:0,
            msg:"",
            
            data:state
        }
    }else{
        ctx.body = {
            code:100,
            msg:'fail'
        }
    }
});