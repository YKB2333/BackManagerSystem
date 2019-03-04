// const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');

// 创建路由
var router = new Router();

// 引入页面路由
const loginRouter = require('./login');
const goodslistRouter = require('./goodslist');
const userlistRouter = require('./userlist');
const useraddRouter = require('./user_add');



const usereditRouter = require('./user_edit');
const addGoodsRouter = require('./addGoods');
const editGoodsRouter = require('./editGoods');
const categoryRouter = require('./category');


// const orderRouter = require('./order');


router.use(koaBody({
    // 支持formdata
    multipart: true,
    // 文件支持
    formidable: {
        // 指定保存路径
        uploadDir: './uploads',
        keepExtensions: true,
        // 改文件名
        onFileBegin(filename, file) {
            // filename: 上传文件的原始名
            // file:文件信息对象
            //   * path:

            // file.path = './uploads/'+filename
        }
    }
}));



router.use('/category',categoryRouter.routes());


router.use('/login', loginRouter.routes());
router.use('/goodslist', goodslistRouter.routes());
router.use('/userlist', userlistRouter.routes());
router.use('/useradd', useraddRouter.routes());
router.use('/useredit', usereditRouter.routes());
router.use('/addGoods', addGoodsRouter.routes());
router.use('/editGoods', editGoodsRouter.routes());
// router.use('/order', orderRouter.routes());



module.exports = router;