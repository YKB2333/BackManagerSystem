$(function () {
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
    let user2 = sessionStorage.getItem('username');
    if(!user2){
        user2 = '';
    }else{
        $('#login').html('欢迎您  '+user2+'<a href="javascript:;">退出</a>');
        $('#login').css('color','purple');
    }

    //退出
    $('#login').on('click','a',function(){
        localStorage.clear();
        sessionStorage.clear();
        location.href = '../index.html';
    });

    // $('#username').val('feng');
    var isok2 = false;
    var isok3 = false;
    var isok4 = false;
    var isok5 = false;
    //根据传过来的用户名查询数据库渲染
    var webdata = decodeURI(location.search);//网址解码,取？号后面部分
    // console.log(data);
    var str = webdata.slice(1);//去问号
    var Username = str.split('=')[1];
    // console.log(Username);
    $.ajax({
        type:'POST',
        url:'/userlist/renderOne',
        data:'username='+Username,
        success:function(res){
            // console.log(res[0]);
            $('#username').val(res[0].username);
            $('#nike').val(res[0].nike);
            $('#phone').val(res[0].phone);
            $('#gender').val(res[0].gender);
            $('#email').val(res[0].email);
            $('#psd').val(res[0].password);
            isok2 = true;
            isok3 = true;
            isok4 = true;
            isok5 = true;
        }
    })


    //密码
    
    $('#psd').on('blur',()=>{
        let psd = $.trim($('#psd').val());
        if(psd){
            if(checkReg.psd2(psd)){
                $('#psd_mes').html('ok');
                $('#psd_mes').css('color','#58bc58');
                isok2 = true;
            }else{
                $('#psd_mes').html('密码格式不正确');
                $('#psd_mes').css('color','red');
            }
        }else{
            $('#psd_mes').html('密码不能为空');
            $('#psd_mes').css('color','red');
        }
    });

    //手机号正则
    
    $('#phone').on('blur',()=>{
        isok3 = false;
        let phone = $.trim($('#phone').val());
        if(phone){
            if(checkReg.tel(phone)){
                $('#phone_mes').html('ok');
                $('#phone_mes').css('color','#58bc58');
                isok3 = true;
            }else{
                $('#phone_mes').html('手机格式不正确');
                $('#phone_mes').css('color','red');
            }
        }else{
            $('#phone_mes').html('不能为空');
            $('#phone_mes').css('color','red');
        }
    });
    //邮箱正则
    
    $('#email').on('blur',()=>{
        isok4 = false;
        let email = $.trim($('#email').val());
        if(email){
            if(checkReg.email(email)){
                $('#email_mes').html('ok');
                $('#email_mes').css('color','#58bc58');
                isok4 = true;
            }else{
                $('#email_mes').html('邮箱格式不正确');
                $('#email_mes').css('color','red');
            }
        }else{
            $('#email_mes').html('不能为空');
            $('#email_mes').css('color','red');
        }
    });

    //昵称
    
    $('#nike').on('blur',()=>{
        isok5 = false;
        let nike = $.trim($('#nike').val());
        if(nike){
            $('#nike_mes').html('ok');
            $('#nike_mes').css('color','#58bc58');
            isok5 = true;
        }else{
            $('#nike_mes').html('不能为空');
            $('#nike_mes').css('color','red');
        }
    });

    $('#makesure').on('click',()=>{
        console.log(isok2,isok3,isok4,isok5);
        if(isok2 && isok3 && isok4 && isok5){
            let userName = $.trim($('#username').val());
            let Psd = $.trim($('#psd').val());
            let Nike = $.trim($('#nike').val());
            let Phone = $.trim($('#phone').val());
            let Gender = $.trim($('#gender').val());
            let Email = $.trim($('#email').val());
            console.log(userName,Psd,Nike,Phone,Gender,Email);
            $.ajax({
                type:'POST',
                url:'/useredit/update',
                data:`username=${userName}&password=${Psd}&nike=${Nike}&gender=${Gender}&phone=${Phone}&email=${Email}`,
                success:function(res){
                    // console.log(res);
                    if(res.code == 200){
                        alert(res.msg);
                        location.href = '../html/user_list.html';
                    }
                }
            });
        }else{
            alert('请按要求填写信息哦');
        }
    })
})