$(function () {
    //左侧菜单部分 开始
    for(var i = 0; i < $('.left_menu dl dt').length;i++){
        $('.left_menu dl dt').attr('data-type',1);
    }

    $('.left_menu').on('click','dl dt',function () {

        // $(this).next().toggle();
        // console.log($(this).attr('data-type'))
        if($(this).attr('data-type') == 1){//1为字符串
            $(this).parent().find('dd').css('display','block');
            // $(this).css('background','url(../css/img/list/list_ico_cb3fabd3.png) 22px -63px no-repeat #8ab700');
            $(this).css('color','#fff');
            $(this).attr('data-type',0);
        }else {
            $(this).attr('data-type',1);
            $(this).css('color','#c1c1c1');
            // $(this).css('background','url(../css/img/list/list_ico_cb3fabd3.png) 22px -32px no-repeat #fff');
            $(this).parent().find('dd').css('display','none');
        }
    });
})