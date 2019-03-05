window.onload = function (){
    //设置了七天免登录
    let user = localStorage.getItem('user');
    // console.log(user);
    if (!user) {
        user = {}
    } else {
        user = JSON.parse(user);
        $('#login').html('欢迎您  '+user.username+'<a href="javascript:;">退出</a>');
        $('#login').css('color','purple');
    }
    
    
    //未设置免登录
    let user2 = sessionStorage.getItem('user');
    if(!user2){
        user2 = {};
    }else{
        user2 = JSON.parse(user2);
        $('#login').html('欢迎您  '+user2.username+'<a href="javascript:;">退出</a>');
        $('#login').css('color','purple');
    }

    //退出
    $('#login').on('click','a',function(){
        localStorage.clear();
        sessionStorage.clear();
        location.href = '../index.html';
    });
    //不同权限用户点击用户列表、添加用户操作
    if(user.superUser || user2.superUser){
        $('#user-list').on('click',function(){
          location.href = '../html/user_list.html';
        });
        $('#user-add').on('click',function(){
          location.href = '../html/user_add.html';
        });
      }else{
          $('#user-list').on('click',function(){
              alert('您没有权限哦');
          });
          $('#user-add').on('click',function(){
              alert('您没有权限哦');
          });
      }
    //一般直接写在一个js文件中
    layui.use(['layer', 'form'], function(){
        var layer = layui.layer
        ,form = layui.form;
        // var isok = false;
        // layer.msg('Hello World');
        var select = document.getElementById('select');
        //发起ajax请求
        let xhr = new XMLHttpRequest();
        xhr.open('post','/addGoods/find_category',true);
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');

        let data2 = '';
        // console.log(data);
        xhr.send(data2);
        xhr.onload = () =>{
            if(xhr.status == 200){
                let res = JSON.parse(xhr.responseText);
                console.log(res.data);
                let getData = res.data;
                let str = `<option value=""  selected="">请选择</option>`;
                for(i = 0;i < getData.length;i++){
                    str += `<option value="${getData[i].category_name}">${getData[i].category_name}</option>`;
                }
                select.innerHTML = str;
                console.log(str)
                // if(res.data.ok == 1){
                //     // location.href = 'login.html';
                //     isok = true;
                //     alert('商品添加成功')
                // }
                form.render('select');
            }
        }




        var goods_name = document.getElementById('goods_name');//商品名
        // console.log(goods_name);
        var sub_heading = document.getElementById('sub_heading');//副标题
        var old_price = document.getElementById('old_price');//原价
        var now_price = document.getElementById('now_price');//售价
        var category = '';//分类
        var stock = document.getElementById('stock');//库存
        // var attributes = '';//商品属性
        var goodsimg = [];
        var state = '上架';//上架
        var description = document.getElementById('description');//商品描述


        //商品分类：电脑、手机
        form.on('select(filter)', function(data){
            // console.log(data.elem); //得到select原始DOM对象
            console.log(data.value); //得到被选中的值
            category = data.value;//商品分类：电脑、手机
            // console.log(data.othis); //得到美化后的DOM对象
        }); 
        //商品属性
        var arr1 = ['推荐'];
        form.on('checkbox(filter)', function(data){
            // console.log(data.elem); //得到checkbox原始DOM对象
            // console.log(data.elem.checked); //是否被选中，true或者false
            // console.log(data.value); //复选框value值，也可以通过data.elem.value得到
            // console.log(data.othis); //得到美化后的DOM对象
            console.log(data.elem.checked)
            if(data.elem.checked == true){
                arr1.push(data.value);
            }else if (data.elem.checked == false) {
                var index = arr1.indexOf(data.value);
                console.log(index)
                if (index > -1) {
                    arr1.splice(index, 1);
                }
            }
            // console.log(arr1)
        }); 
        //是否上架
        form.on('switch(switchTest)', function(data){
            // console.log(data.elem); //得到checkbox原始DOM对象
            console.log(data.elem.checked); //开关是否开启，true或者false
            // console.log(data.value); //开关value值，也可以通过data.elem.value得到
            // console.log(data.othis); //得到美化后的DOM对象
            if(data.elem.checked == true){
                state = '上架'
            }else if(data.elem.checked == false){
                state = '下架'
            }

        });  
       

        var btn = document.getElementById('btn');
        btn.onclick = function (e) {
            var e = e || e.event;
            e.preventDefault();
            var _goods_name = goods_name.value;
            console.log(_goods_name)
            var _sub_heading = sub_heading.value;
            var _old_price = old_price.value;
            var _now_price = now_price.value;
            var _stock = stock.value;
            var _description = description.value;
            //商品照片
            var goodsimg = document.getElementsByClassName('goodsimg')[0];
            console.log(goodsimg)
            var imgs = goodsimg.getElementsByTagName('img');
            var arr2 = [];
            for(var i = 0;i < imgs.length;i++){
                var imgsrc = '..'+(imgs[i].src).split('12580')[1];
                console.log(imgsrc);
                arr2.push(imgsrc);
            }
            // var data = {
            //     "goods_name":_goods_name,
            //     "sub_heading":_sub_heading,
            //     "old_price":_old_price,
            //     "now_price":_now_price,
            //     "category":category,
            //     "img":arr2,
            //     "stock":_stock,
            //     "attributes":arr1,
            //     "state": state,
            //     "description":_description
            // }
            var data = "goods_name="+_goods_name+"&sub_heading="+_sub_heading+"&old_price="+_old_price+"&now_price="+_now_price+"&category="+category+"&img="+arr2+"&stock="+_stock+"&attributes="+arr1+"&state="+state+"&description="+_description+"&adding_time="+Date.now();
            console.log(data);
            //发起ajax请求
            let xhr = new XMLHttpRequest();
              
            xhr.open('post','/addGoods',true);
            xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');

            // let data2 = JSON.stringify(data);
            console.log(data);
            xhr.send(data);
            xhr.onload = () =>{
                if(xhr.status == 200){
                    let res = JSON.parse(xhr.responseText);
                    if(res.data.ok == 1){
                        // location.href = 'login.html';
                        // isok = true;
                        // alert('商品添加成功')
                                           
                        var res2 = confirm('商品添加成功！是否继续添加');
                        if(res2){
                            location.reload();
                        }else {
                            location.href = '../html/goodslist.html';
                        }
                    }
                }
            }
            
        }
        // if(isok == true){
        //     layer.msg('商品添加成功');
        //     isok = false;
        // }
        
    });
}