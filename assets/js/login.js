$(function () {
  $("#reg_box").on("click", function () {

    $(".login-box").show()
    $(".reg-box").hide()

  })
  $("#login_box").on("click", function () {
    $(".reg-box").show()
    $(".login-box").hide()

  })
  var form = layui.form
  var layer = layui.layer
  form.verify({
    // 自定义校验规则
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    repwd: function (value) {
      var pwd = $('.reg-box [name=password]').val();
      if (pwd !== value) {
        return '两次密码不一致！';
      }
    },
  });
  $("#regbox").on("submit", function (e) {
    e.preventDefault()
    var data = {
      username: $('.reg-box [name="username"]').val(),
      password: $('.reg-box [name="password"]').val(),
      repassword: $('.reg-box [name="repassword"]').val()
    }

    // console.log(data);
    $.post("/api/reg", data, function (res) {
      console.log(res);
      if (res.code !== 0) {
        return layer.msg(res.message)
      }
      layer.msg("注册登录成功")
      $("#reg_box").click()
    })
  })
  $("#loginbox").submit(function (e) {
    console.log(1111111);
    e.preventDefault()
    $.ajax({
      url: "/api/login",
      method: "POST",
      data: $(this).serialize(),
      success: function (res) {
        if (res.code !== 0) {
          return layer.msg('登录失败！')
        }
        layer.msg('登录成功！')
        // 将登录成功得到的 token 字符串，保存到 localStorage 中
        localStorage.setItem('token', res.token)
        // 跳转到后台主页
        location.href = '/index.html'
      }
    })
  })
})