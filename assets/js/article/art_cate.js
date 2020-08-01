$(function() {
    var layer = layui.layer
    var form = layui.form
        //init获取文章列表
    initArticle()

    function initArticle() {
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("获取文章分类失败")
                }
                var htmlStr = template("tpl-table", res)
                $("tbody").html(htmlStr)
            }
        });
    }
    var addIndex = null
        //点击添加类别 弹出框 
    $("#btnAddCate").on("click", function() {
        addIndex = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章',
            content: $("#dialog-add").html()
        })
    });

    //通过事件委托 让表单提交渲染新增数据
    $("body").on("submit", "#form-add", function(e) {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("新增数据失败")
                }
                layer.msg("新增数据成功")
                initArticle()
                layer.close(addIndex)
            }

        });
    });

    var editIndex = null
    $("tbody").on("click", ".btn-edit", function() {
        editIndex = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章',
            content: $("#dialog-edit").html()
        })
        var id = $(this).attr("data-id")
        $.ajax({
            type: "GET",
            url: "/my/article/cates/" + id,
            success: function(res) {
                if (res.status !== 0) {}
                form.val('form-edit', res.data)
            }
        });
    });
    // 获取数据  修改再返回数据  有一个分类 有一个别名
    $("body").on("submit", "#form-edit", function(e) {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("修改分类数据失败")
                }
                layer.msg("修改分类数据成功")
                initArticle()
                layer.close(editIndex)
            }
        });
    });
    //事件委托删除 
    $("tbody").on("click", ".btn-delete", function() {
        var id = $(this).attr("data-id")
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                type: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败！')
                    }
                    layer.msg('删除分类成功！')
                    layer.close(index)
                    initArticle()
                }
            })
        })
    })
})