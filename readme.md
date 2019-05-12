#Nodejs项目
## 项目名称
* BackstageManagerSystem

### 技术栈
* nodejs + Koa + mongoDB + jQuery + ES6 + layui + bootstrap

### 项目分工
* 刘杰
    * 页面布局
        后台页面html、公共css、js
    * 商品管理
        * 商品列表：商品库数据渲染，删除商品功能，修改商品上、下架状态功能，分页、排序功能
        * 添加商品：渲染商品分类、非空验证、上传图片、添加数据库
        * 编辑商品：渲染当前商品、渲染分类、修改图片、添加数据库
        * 分类列表：商品分类数据渲染、删除分类
        * 添加分类：添加商品分类数据
        * 编辑分类：渲染当前分类数据、添加商品分类数据
    * mongodb数据库
        商品数据、分类数据
* 康庆峰
    * 登录页（验证用户名，验证码，免登录（localStorage，session））
    * 用户管理
        * 用户列表：数据渲染，删除、多行删除，编辑，分页
        * 添加用户：正则验证，添加到数据库
        * 个人信息（编辑用户）：根据需求（传入用户名、跳转）获取相应用户名渲染数据，修改用户信息
    * 订单管理
        * 订单列表：订单数据渲染，删除订单功能，修改订单状态功能
    * 用户权限
        * 管理员：可以操作管理所有功能
        * 普通用户：可以对商品和订单进行操作，没有权限访问用户列表和添加用户
    * mongodb数据库
        用户数据、订单数据

### 演示地址
* http://39.105.177.247:12580/

* 管理员用户   
    * 账号： luoluo  密码： 123456   
* 普通用户
    * 账号： lemon   密码： 111111

### 项目布局
```js
.
├── src                                         	// 源码目录
│   ├── api                                    	 	// 请求接口
│   │   └── db                                  	// 数据库操作封装
│   │       └── index.js                                                      
│   │   └── routers                            		// 数据接口
│   │       ├── addGoods.js                     
│   │       ├── category.js                    
│   │       ├── editGoods.js                    
│   │       ├── goodslist.js                    
│   │       ├── index.js                        	// 路由
│   │       ├── login.js                       
│   │       ├── order.js                        
│   │       ├── tokenverify.js                 
│   │       ├── user_add.js                     
│   │       ├── user_edit.js                   
│   │       └── userlist.js                                                  
│   │   └── utils                              		 
│   │       └── tokens.js                       
│   ├── assets                                 		// 主件
│   │   ├── bootstrap                        		// bootstrap框架
│   │   └── layui                              		// layui框架
│   ├── css                                     	// css样式
│   │   ├── addGoods.css                         
│   │   ├── base.css                     
│   │   ├── center.css                        
│   │   ├── common.css 
│   │   ├── login.css                   
│   │   └── user_add.css  
│   ├── data                                    	// 数据
│   ├── html                                    	// html文件
│   │   ├── add_category.html                          
│   │   ├── addGoods.html                           
│   │   ├── center.html                          
│   │   ├── edit_category.html 
│   │   ├── editGoods.html                          
│   │   ├── goods_category.html                          
│   │   ├── goodslist.html                         
│   │   ├── order_list.html
│   │   ├── user_add.html                          
│   │   ├── uesr_edit.html                                  
│   │   └── user_list.html                     
│   ├── img                                     	// 图片
│   ├── js                                          // js文件                        
│   │   ├── addGoods.js                           
│   │   ├── addUser.js 
│   │   ├── common.js                           
│   │   ├── editGoods.js 
│   │   ├── editUser.js                          
│   │   ├── editUser.js                                                               
│   │   └── login.js 
│   ├── lib                                         // 插件类库 
│   │   ├── jquery-1.10.1.min.js                          
│   │   ├── jquery.cookie.js                                                               
│   │   └── mycool.js                                    
│   ├── index.html                             		// 入口html文件
│   ├── server.js                                	// 服务器
├── readme                                       	// 说明文件
.
```
