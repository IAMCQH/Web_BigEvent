$(function() {
    //监听表单登录
    var layer = layui.layer
    getUserInfo()
        //点击退出
    $("#exit").on("click", function() {
        layer.confirm('是否退出', { icon: 3, title: '提示' }, function(index) {
            localStorage.removeItem('token')
            location.href = "/login.html"
            layer.close(index);
        });

    })

})

function getUserInfo() {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        headers: {
            Authorization: localStorage.getItem("token")
        },
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败！')
            }
            renderAvatar(res.data)
        }
    })
}

function renderAvatar(user) {
    //优先图片头像  优先昵称头像 用户名首字母
    var name = user.nickname || user.username
    if (user.user_pic !== null) {
        $(".layui-nav-img").attr("src", user.user_pic).show()
        $(".text-avatar").hide()
    } else {
        $(".text-avatar").html(name[0].toUpperCase()).show()
        $(".layui-nav-img").hide()
    }
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
}