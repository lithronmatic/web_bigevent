$(function(){
    // 点击"去注册账号"的链接
    $("#link_reg").on("click",function(){
        $(".login-box").hide();
        $(".reg-box").show();
    });

    // 点击"去登录"的链接
    $("#link_login").on("click",function(){
        $(".login-box").show();
        $(".reg-box").hide();
    })

    // 从layui中获取form对象
    var form = layui.form;
    // 从layui中获取layer对象
    var layer = layui.layer;
    // 通过form.verify()函数自定义校验规则
    form.verify({
        // 自定义pwd校验规则
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
        //   校验再次确认密码的规则
        repwd:function(value,item){//value是表单的值
            var pwd = $(".reg-box input[name=password]").val();  
            if(pwd!==value){
                return '两次密码不一致';
            }
        } 
    });

    // 监听注册表单的提交事件
    $("#form_reg").on("submit",function(e){
        e.preventDefault();
        $.post('/api/reguser',
         {
            username:$("#form_reg input[name=username]").val(),
            password:$("#form_reg input[name=password]").val()
         },
        function(res){
            if(res.status!=0){
                return layer.msg(res.message);
            }
            layer.msg('注册成功，请登录!');
            // 模拟点击行为
            $("#link_login").click();
        })
    })

    // 监听登录表单的提交事件
    $("#form_login").submit(function(e){
        e.preventDefault();
        // 快速获取表单中的数据
        var data = $(this).serialize();
        $.ajax({
            method:'POST',
            url:'/api/login',
            data:data,
            success:function(res){
                if(res.status!==0){
                    return layer.msg(res.message);
                }
                layer.msg('登录成功!');
                // 将登录成功得到的token字符串，保存到localStorage
                localStorage.setItem('token',res.token);
                // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})