$(()=>{

    //判断免登录否，是则跳到主页
    let user = localStorage.getItem('user');
    // console.log(user);
    if (!user) {
        user = {}
    } else {
        user = JSON.parse(user);
    }
    console.log(user);

    if (user.token) {
        $.ajax({
            type:'POST',
            url:'/verify',
            data:'token='+user.token,
            success:function(res){
                console.log(res);
                if(res.status == 200){
                    location.href = "html/center.html";
                }
            }
        });
    }


    $('#code').val(randomYZM(5));
    $('#code').css('color',randomColor(16));
    $('#code').on('click',()=>{
        $('#code').val(randomYZM(5));
        $('#code').css('color',randomColor(16));
    });
    $('#btnLogin').on('click',()=>{
        let username = $.trim($('#username').val());
        let password = $.trim($('#password').val());
        console.log($('#mdl').prop('checked'));
        if(username && password){
            if($.trim($('#yzm').val()).toLowerCase() == $.trim($('#code').val()).toLowerCase()){
                $.ajax({
                    type : 'POST',
                    url : '/login',
                    data : `username=${username}&password=${password}`,
                    success : function(str){
                        // let arr = JSON.parse(str);
                        // console.log(str.code);
                        if(str.code == 200){
                            if($('#mdl').prop('checked')){
                                // $.cookie('username',str.username,{expires:7,path:'/'});
                                localStorage.setItem('user',JSON.stringify(str));
                                location.href = 'html/center.html';
                            }else{
                                sessionStorage.setItem('user',JSON.stringify(str));
                                location.href = 'html/center.html';
                            }
                        }else{
                            alert('用户名或密码不正确');
                        }
                    }
                });
            }else{
                alert('验证码不正确');
            }
        }else{
            alert('输入内容不能为空');
        }
    });
});