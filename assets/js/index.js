$(function() {
    //获取用户数据
    getUserInfo();
    //头像文本和图片
    //退出功能
    var layer = layui.layer
    $("exit").on("click", function() {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            //do something
            // 1. 清空本地存储中的 token
            localStorage.removeItem('token')
                // 2. 重新跳转到登录页面
            location.href = '/login.html'

            // 关闭 confirm 询问框
            layer.close(index)
        })

    })

})

function getUserInfo() {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        headers: {
            Authorization: localStorage.getItem("token") || ""
        },
        success: function(res) {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg("获取用户数据失败")
            }
            renderAvatar(res.data)
        }
    })
}

function renderAvatar(pic) {
    var name = pic.nickname || pic.username
    $("#welcome").html("您好 &nbsp;&nbsp;" + name)
        //头像文本或者图片
    if (pic.user_pic !== null) {
        $(".layui-nav-img").attr("src", pic.user_pic).show()
        $(".text-avatar").hide()
    } else {
        $(".layui-nav-img").hide()
        $(".text-avatar").html(name[0].toUpperCase()).show()
    }
}