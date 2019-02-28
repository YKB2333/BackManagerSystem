window.onload = function (){
    //一般直接写在一个js文件中
    layui.use(['layer', 'form'], function(){
        var layer = layui.layer
        ,form = layui.form;
        
        layer.msg('Hello World');
    });
}