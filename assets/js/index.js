$(function() {
    //监听表单登录
    var layer = layui.layer
    $("#form_login").on("submit", function(e) {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/api/login",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg("登陆成功")
                localStorage.setItem("token", res.token)
                location.href("/index.html")
            }
        })
    })
})