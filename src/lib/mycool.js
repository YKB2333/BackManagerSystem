//基本函数

//获取id封装函数
function getid(id) {
    return document.getElementById(id);
}

//随机数从min到max
function randomNum(min, max) {
    return parseInt(Math.random() * (max - min + 1) + min);
}


/*
 	随机颜色
 	randomColor(type)
 	参数：
 		type ：
 			16 返回16进制颜色
 			rgb：返回rbg颜色
 		
 */

function randomColor(type) {
    if (type == 16) {
        //当传过来的实参是16，就生成16进制的随机颜色返回
        var str = '0123456789abcdef';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            var num = randomNum(0, 15);
            color += str[num];
        }

        return color; // #162743
    } else if (type == 'rgb') {
        //如果传过来的实参是；rgb，就返回rgb颜色
        var r = randomNum(0, 255);
        var g = randomNum(0, 255);
        var b = randomNum(0, 255);

        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }
}


//封装解析网址
function strToObj(str) {
    var obj = {};
    var arr = str.split('&');
    for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split('=');
        obj[arr2[0]] = arr2[1];
    }
    return obj;
}

//补零函数
function setDB(item) {
    if (item < 10) {
        return '0' + item;
    } else {
        return '' + item;
    }
}

//封装时间函数，把毫秒转成xx天xx时xx分xx秒
function setTime(diffTime) {
    var sec = setDB(diffTime % 60);//秒
    var min = setDB(Math.floor(diffTime / 60) % 60);//分
    var hour = setDB(Math.floor(diffTime / 60 / 60) % 24);//时
    var day = setDB(Math.floor(diffTime / 3600 / 24));//天
    return {
        'sec': sec,
        'min': min,
        'hour': hour,
        'day': day
    }
}
//时间戳转成日期格式
function settime(num) {
    var date = new Date(num * 1000);
    var year = date.getFullYear();
    var mon = date.getMonth() + 1;
    var day = date.getDate();
    var hours = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    return {
        'year': year,
        'mon': setDB(mon),
        'day': setDB(day),
        'hours': setDB(hours),
        'min': setDB(min),
        'sec': setDB(sec)
    }
}

/*
 	查找首节点：
 	参数： 父节点
 	返回值： 第一个子节点
 
 */

function firstChild(parent) {
    if (parent.firstElementChild) {
        //高级浏览器
        return parent.firstElementChild;
    } else {
        return parent.firstChild;
    }
}

/*
 	查找尾节点：
 	参数： 父节点
 	返回值： 最后一个子节点
 
 */

function lastChild(parent) {
    if (parent.lastElementChild) {
        //高级浏览器
        return parent.lastElementChild;
    } else {
        return parent.lastChild;
    }
}

/*
 	事件监听：bind(ele, type, fn)
 	参数一：对象名
 	参数二：事件类型
 	参数三：执行函数
 */

function bind(ele, type, fn) {
    if (ele.addEventListener) {
        //高级浏览器 IE9+
        ele.addEventListener(type, fn, false);
    } else {
        //IE8-
        ele.attachEvent('on' + type, fn);
    }
}

/*
 滚轮方向判断：rollerDir(ele,callback)
 	参数：
 		ele 对象名
 		callback 回调函数
 	返回值： 返回true（向上滚） 或者false(向下滚)
 */
function rollerDir(ele, callback) {
    var istrue = true;
    //IE 谷歌
    ele.onmousewheel = fn;
    //火狐
    if (ele.addEventListener) {
        ele.addEventListener('DOMMouseScroll', fn, false);
    }
    function fn(ev) {
        //判断滚轮方向
        var ev = ev || event;
        //true:向上滚了，false：向下滚了
        if (ev.wheelDelta) {
            //ie 谷歌  规定：大于0 上滚，小于0下滚
            istrue = ev.wheelDelta > 0 ? true : false;
        } else {
            //火狐
            istrue = ev.detail < 0 ? true : false;
        }
        callback(istrue);//实参
    }
}


//正则表达式表单验证：调用里面子功能（json对象）
// 调用方法：checkReg.tel();
var checkReg = {
    tel: function (str) {
        var reg = /^1[3-9]\d{9}$/;
        return reg.test(str);
    },
    email: function (str) {
        var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        return reg.test(str);
    },
    idcard: function (str) {
        var reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx])|([1−9]\d5\d2((0[1−9])|(10|11|12))(([0−2][1−9])|10|20|30|31)\d2[0−9Xx])/;
        return reg.test(str);
    },
    psd: function (str) {
        var reg = /^[a-zA-Z]\w{5,15}$/;
        return reg.test(str);
    },
    //不用字母开头
    psd2: function (str) {
        var reg = /^\w{6,16}$/;
        return reg.test(str);
    },
    confirm_pwd: function (str1, str2) {
        return str1 === str2;
    },
    username: function (str) {
        var reg = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/;
        return reg.test(str);
    },
    nickname: function (str) {
        var reg = /^[\u4e00-\u9fa5]+$/;
        return reg.test(str);
    },
    birthday: function (str) {
        var reg = /^\d{4}-\d{1,2}-\d{1,2}|\d{4}\.\d{1,2}\.\d{1,2}/;
        return reg.test(str);
    },
    //3~10个字符,只含有汉字、数字、字母、_
    name2: function(str){
        var reg = /^[a-zA-Z0-9_\u4e00-\u9fa5]{3,10}$/;
        return reg.test(str);
    }
}


/*
 	cookie的相关操作：var cookie = {}
	子功能：
		存 ：set
		取：get
		删：remove
		
 */
var cookie = {
    set: function (name, value, prop) {
        //name和value是必写参数。prop是json格式的数据
        var str = name + '=' + value;
        //设置失效时间
        if (prop.expires) {
            str += ';expires=' + prop.expires.toUTCString();//时间转成字符串

        }
        //prop.path 设置路径
        if (prop.path) {
            str += ';path=' + prop.path;
        }
        //设置访问权限
        if (prop.domain) {
            str += ';domain=' + prop.domain;
        }
        document.cookie = str;
    },
    get: function (key) {
        var str = document.cookie;
        var arr = str.split('; ');
        for (var i = 0; i <= arr.length; i++) {
            var arr2 = arr[i].split('=');
            if (key == arr2[0]) {
                return arr2[1];
            }
        }
    },
    remove: function (key) {
        //cookie:设置时间失效，设置时间为过去的某个时间
        var now = new Date();
        now.setDate(now.getDate() - 1);
        cookie.set(key, '', { expires: now });
    }

}

//深度拷贝
//参数：对象（数组或json对象）
//返回值：新的对象（拷贝）
function deepClone(obj) {
    var str = JSON.stringify(obj);//把对象转成字符串
    return JSON.parse(str);//返回把字符串转成对象
}

//获取非行内样式
//getstyle(obj,name)
//obj:对象名
//name：要获取的非行内样式属性名
//返回值：样式值
function getStyle(obj, name) {
    if (getComputedStyle(obj, false)) {
        return getComputedStyle(obj, false)[name];
    } else {
        //ie8-
        return obj.currentStyle(name);
    }
}

/*
 	设置和获取行内样式：css(节点,'width','40px') 设置样式  css(节点，'color') 获取样式
 	两个个参数：获取行内样式
 	三个参数：设置样式
*/

function css() { //设置样式：设置行内的样式
    if (arguments.length == 2) {
        //获取样式
        return arguments[0].style[arguments[1]];
    } else if (arguments.length == 3) {
        arguments[0].style[arguments[1]] = arguments[2];
    }
}

/*
	运动框架封装：startMove()过渡    jq animate()
	最终版：多对象，多属性，链式运动框架(运动队列)
	参数一：对象名
	参数二：属性，目标值  键名：属性名，键值：目标值    {'width':200,'heigth':400}  实现：宽度和高度一起改变，宽度变成200，高度变成400
	参数三：回调函数(可选参数)
 */

function startMove(obj, json, fnend) {

    clearInterval(obj.timer); //防止定时器叠加
    obj.timer = setInterval(function () {

        var istrue = true;

        //1.获取属性名，获取键名：属性名->初始值
        for (var key in json) {
            //			console.log(key); //width heigth opacity
            var cur = 0; //存初始值

            if (key == 'opacity') { //初始值
                cur = getStyle(obj, key) * 100; //透明度
            } else {
                cur = parseInt(getStyle(obj, key)); //width heigth borderwidth px为单位的

            }

            //2.根据初始值和目标值，进行判断确定speed方向，变形：缓冲运动
            //距离越大，速度越大,下面的公式具备方向
            var speed = (json[key] - cur) / 6;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed); //不要小数部分，没有这句话或晃动

            if (cur != json[key]) { //width 200 heigth 400
                istrue = false; //如果没有达到目标值，开关false
            } else {
                istrue = true; //true true
            }

            //3、运动
            if (key == 'opacity') {
                obj.style.opacity = (cur + speed) / 100;
                obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')';
            } else {
                obj.style[key] = cur + speed + 'px'; //针对普通属性 left  top height 
            }

        }

        //4.回调函数:准备一个开关,确保以上json所有的属性都已经达到目标值,才能调用这个回调函数
        if (istrue) { //如果为true,证明以上属性都达到目标值了
            clearInterval(obj.timer);
            if (fnend) {
                fnend();
            }
        }

    }, 30); //obj.timer 每个对象都有自己定时器

}



/*
 	ajax(method,url,data,fn)
 	参数一：请求方式   get  和  post
 	参数二：路径
 	参数三：数据   name=malin&psw=12345
 	参数四：成功的回调    回调函数
*/

function ajax(method, url, data, fn) {
    //1.创建对象
    var xhr = new XMLHttpRequest();
    //告诉对象，要什么
    if (method == 'get' && data) {//如果是get的方式，data接在url后面
        url = url + '?' + data;
    }

    xhr.open(method, url, true);

    //2.发送请求
    if (method == 'get') {
        xhr.send(null);
    } else {
        //设置请求头
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    }

    //3.3号线去后台制作

    //4.号线。接收数据，做渲染

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                //个性需求
                if (fn) {
                    fn(xhr.responseText);//实参
                }
            } else {
                alert('出错了，因为：' + xhr.status);//404找不到
            }

        }
    }

}

//特效整理
//1下拉点击菜单封装函数
function pullMenuClick(box, menu) {//box是要点击的菜单，menu是菜单变量；
    var open = true;
    box.onclick = function () {
        if (open) {
            menu.style.display = 'block';
        } else {
            menu.style.display = 'none';
        }
        open = !open;
    }

}

/*
 pullMenu(box, menu)
 	参数：
 		box ：外层节点
 		memu ：隐藏的菜单节点
 **/

function pullMenu(box, menu) {
    //事件
    box.onmouseover = function () {
        menu.style.display = 'block';
    }

    box.onmouseout = function () {
        menu.style.display = 'none';
    }
}

//2选项卡封装调用函数
function xuanxiangka(head, content) {
    for (var i = 0; i < head.length; i++) {
        head[i].index = i;
        head[i].onclick = function () {
            for (var i = 0; i < head.length; i++) {
                head[i].className = '';
                content[i].style.display = 'none';
            }
            this.className = 'active';
            content[this.index].style.display = 'block';
        }
    }
}

/*
    3、
    轮播图封装loop(box)
    参数一：box是指包住图片及焦点及按钮的盒子
    <div id="view">
        <ul>
            <li><a href=""><img src="imgs/a1.webp" alt=""></a></li>
            <li><a href=""><img src="imgs/a2.jpg" alt=""></a></li>
            <li><a href=""><img src="imgs/a3.jpg" alt=""></a></li>
            <li><a href=""><img src="imgs/a4.jpg" alt=""></a></li>
            <li><a href=""><img src="imgs/a5.webp" alt=""></a></li>
        </ul>
        <p>
            <span class="active"></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </p>
        <div class="ctrl">
            <div>&lt;</div>
            <div>&gt;</div>
        </div>
    </div>

*/
function loop(box, active) {
    var lis = box.getElementsByTagName('li');
    var spans = box.getElementsByTagName('span');
    var btn = box.getElementsByClassName('ctrl');
    var btns = btn[0].getElementsByTagName('div');
    var iw = lis[0].offsetWidth;
    console.log(iw);
    //1.所有的图片放在右侧，第一张放在可视区
    for (var i = 0; i < lis.length; i++) {
        css(lis[i], 'left', iw + 'px');
    }
    css(lis[0], 'left', 0);
    //2.开定时器，让图片自动轮播：旧图挪走，新图进入可视区
    var num = 0;
    var timer = null;
    var next = () => {
        startMove(lis[num], { 'left': -iw });//旧图挪走
        num = ++num >= lis.length ? 0 : num;//临界值的判断
        //快速把新图放在右侧：不需要过渡
        css(lis[num], 'left', iw + 'px');
        startMove(lis[num], { 'left': 0 });//新图挪进来
        lightNow();
    }
    timer = setInterval(next, 2000);
    var lightNow = () => {
        for (var i = 0; i < spans.length; i++) {
            spans[i].className = '';
        }
        spans[num].className = active;
    }

    //3.点击上下按钮：可以切换下一张和上一张
    //鼠标进入可视区，停止定时器，移开又开始自动轮播
    box.onmouseover = () => {
        clearInterval(timer);
        css(btn[0], 'display', 'block');
    }
    box.onmouseout = () => {
        clearInterval(timer);
        timer = setInterval(next, 2000);
        css(btn[0], 'display', 'none');
    }

    //防止傻瓜操作行为 : 两次点击的时间太短，500毫秒内，就视为无效
    console.log(btns[1]);
    var old = new Date();
    btns[1].onclick = () => {
        if (new Date() - old > 500) {
            next();
        }
        old = new Date();
    }
    //上一张
    var prev = () => {
        startMove(lis[num], { 'left': iw });
        num = --num < 0 ? lis.length - 1 : num;
        css(lis[num], 'left', -iw + 'px');
        startMove(lis[num], { 'left': 0 });
        lightNow();
    }
    btns[0].onclick = () => {
        if (new Date() - old > 500) {
            prev();
        }
        old = new Date();
    }

    //点击焦点
    for (var i = 0; i < spans.length; i++) {
        spans[i].index = i;
        spans[i].onclick = function () {
            if (this.index > num) {
                startMove(lis[num], { 'left': -iw });
                css(lis[this.index], 'left', iw + 'px');
            }
            if (this.index < num) {
                startMove(lis[num], { 'left': iw });
                css(lis[this.index], 'left', -iw + 'px');
            }
            startMove(lis[this.index], { 'left': 0 });
            num = this.index;
            lightNow();
        }
    }
}

//4、回到顶部
// 参数：回到顶部按钮元素
function goTop(go) {
    // window.onscroll = function () {
    //     var scrolltop = window.scrollY;
    //     if (scrolltop >= 500) {
    //         go.style.display = 'block';
    //     } else {
    //         go.style.display = 'none';
    //     }
    // }
    go.onclick = function () {
        var speed = 0;
        var sum = window.scrollY;
        var timer = setInterval(function () {
            speed += 10;
            sum -= speed;
            if (sum <= 0) {
                clearInterval(timer);
            }
            window.scrollTo(0, sum);
        }, 25);
    }
}

//5、吸顶菜单
//  参数一：要吸顶的盒子元素
//  参数二：class修改名
function topFixed(menu, classname) {
    var iT = menu.offsetTop;

    window.onscroll = function () {
        var scrollTop = window.scrollY;
        if (scrollTop >= iT) {
            //添加样式
            menu.className = classname;
        } else {
            menu.className = '';
        }
    }
}

//6、吸底菜单
//  参数一：要吸顶的盒子元素
//  参数二：class修改名
function bottomFixed(menu, classname) {
    var iT = menu.offsetTop - window.innerHeight + menu.offsetHeight;

    window.onscroll = function () {
        var scrollTop = window.scrollY;
        if (scrollTop >= iT) {
            //添加样式
            menu.className = classname;
        } else {
            menu.className = '';
        }
    }
}

/*
    7
    封装自定义提示框
    str:提示信息
    wid:提示框宽
    hei:提示框高
*/
function ale(str, wid, hei, fn) {
    var body = document.body;
    var div = document.createElement('div');
    div.className = 'alert';
    div.style.width = wid + 'px';
    div.style.height = hei + 'px';
    div.innerHTML = `<p>${str}</p>
                    <input type="button" name="" id="messagebtn" value="确定">`;
    body.appendChild(div);
    //确定再删除节点
    var messagebtn = document.getElementById('messagebtn');
    messagebtn.onclick = function () {
        body.removeChild(div);
        fn();
    }
}
/*样式
.alert{
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    box-shadow: 0 0 5px 5px rgb(245, 12, 12);
    padding:20px 20px 0;
    box-sizing: border-box;
    border-radius: 6px;
    text-align: center;
    z-index: 100;
}
.alert p{
    display: inline-block;
    text-align: left;
    color: #fff;
    font-size: 18px;
    text-shadow: 0 0 3px rgb(245, 12, 12);
}
.alert input{
    position: absolute;
    bottom: 20px;
    right: 20px;
    border: none;
    background: #2363da;
    box-shadow: 0 0 2px blue;
    color: #fff;
    width: 50px;
    height: 25px;
}
*/

//8
//封装获取随机验证码，包含大小写字母;
function randomYZM(n) {
    var str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var str2 = '';
    for (var i = 0; i < n; i++) {
        str2 += str[randomNum(0, 61)];
    }
    return str2;
}

//9
//封装敏感词替换函数
function filterTex(str) {
    var sensitive = ['傻B', '妈蛋', 'bitch', 'fuck', '操', '小学生', '反清复明','你妈','狗东西','习*平','李*强','尼玛','你妈','他妈','我曹','握草','窝草','我操','卧槽','傻逼','煞笔','麻痹','马蛋','鸡巴','我日','滚蛋','去他妈'];
    for (var i = 0; i < sensitive.length; i++) {
        var reg = new RegExp(sensitive[i], 'gi');//正则：i 忽略大小写；g 找到全部
        str = str.replace(reg, "***");//根据正则将敏感词替换为***
    }
    return str;
}

//10
//楼层跳跃(点击跳到对应楼层，滚动鼠标按钮也跟着变色)
//参数一：楼层按钮
//参数二：对应内容区域
//参数三：按钮添加的class名
function floorJump(buttons, floors, classname) {
    //1.点击按钮跳转到对应的楼层
    for (var i = 0; i < buttons.length; i++) {//先循环绑定事件，后点击事件
        buttons[i].index = i;//绑定索引
        buttons[i].onclick = function () {
            clearClass();
            //当前的变成高亮显示
            this.className = classname;
            var now = this.index;//点击获取下标
            // console.log(now);
            window.scrollTo(0, floors[now].offsetTop);//跳转到对应楼层
        }
    }

    //清空样式
    function clearClass() {
        //排他:清空所有的样式
        for (var i in buttons) {
            buttons[i].className = '';
        }
    }

    //2.滚动滑轮，按钮跟着高亮
    $(window).scroll(function () {

        var scrollTop = window.scrollY;//获取滚动距离

        for (var i = 0; i < floors.length; i++) {
            var divTop = floors[i].offsetTop - 200;//获取对应楼层的高度
            if (scrollTop >= divTop) {//只要达到某个临界点
                clearClass();
                buttons[i].className = classname;//对应楼层跟着高亮
            }
        }

    });
}

//11