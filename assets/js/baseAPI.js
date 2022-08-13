// 在调用$.get()或$.post()或$.ajax()之前，都会先调用
// $.ajaxPrefilter这个函数
$.ajaxPrefilter(function(options){
    console.log(options.url);//  /api/login
    // 在发起真正的Ajax请求之前，统一拼接请求的根路径
    options.url = "http://www.liulongbin.top:3007" + options.url;
})