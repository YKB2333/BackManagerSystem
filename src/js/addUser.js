$(function () {
    //验证用户名是否存在
    var isok1 = false; 
    $('#username').on('change',()=>{
        let username = $.trim($('#username').val());
        if(username){
            $.ajax({
                type:"POST",
                url:"/useradd/has",
                data:'username='+username,
                success:function(str){
                    // console.log(str);
                    if(str.code == 200){
                        $('#username_mes').html(str.msg);
                        $('#username_mes').css('color','red');
                    }else{
                        $('#username_mes').html(str.msg);
                        $('#username_mes').css('color','#58bc58');
                        isok1 = true;
                    }
                }
            });
        }else{
            $('#username_mes').html('内容不能为空');
            $('#username_mes').css('color','red');
        }
    });
    //密码正则
    var isok2 = false;
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
    var isok3 = false;
    $('#phone').on('blur',()=>{
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
    var isok4 = false;
    $('#email').on('blur',()=>{
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

    var isok5 = false;
    $('#nike').on('blur',()=>{
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
        console.log(isok1,isok2,isok3,isok4,isok5);
        if(isok1 && isok2 && isok3 && isok4 && isok5){
            let userName = $.trim($('#username').val());
            let Psd = $.trim($('#psd').val());
            let Nike = $.trim($('#nike').val());
            let Phone = $.trim($('#phone').val());
            let Gender = $.trim($('#gender').val());
            let Email = $.trim($('#email').val());
            console.log(userName,Psd,Nike,Phone,Gender,Email);
            $.ajax({
                type:'POST',
                url:'/useradd',
                data:`username=${userName}&password=${Psd}&nike=${Nike}&gender=${Gender}&phone=${Phone}&email=${Email}&time=${Date.now()}`,
                success:function(res){
                    // console.log(res);
                    if(res.code == 200){
                        alert(res.msg);
                        location.href = '../html/user_list.html';
                    }
                }
            });
        }
    })
})