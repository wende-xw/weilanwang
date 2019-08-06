$(function () {
    //获得页面标签
    let username = $("#J_userName");
    let password = $("#J_pwd");
    let showmsg = $("#J_loginErrorTip");
    let oBtn = $("#J_loginBtn");

    //记录输入框中的值
    let usernameText = "";
    let passwordText = "";

    //监听用户名失去焦点事件
    username.blur(function () {
        let text = $.trim($(this).val());
        usernameText = text;
        if (text == 0) {
            $(this).addClass("error-field");
            showmsg.text("用户名不能为空").css("visibility", "visible");
        } else {
            $(this).removeClass("error-field");
            showmsg.text("").css("visibility", "hidden");
        }
    })

    //监听密码框失去焦点事件
    password.blur(function () {
        let text = $.trim($(this).val());
        passwordText = text
        if (text == 0) {
            $(this).addClass("error-field");
            showmsg.text("密码不能为空").css("visibility", "visible");
        } else {
            $(this).removeClass("error-field");
            showmsg.text("").css("visibility", "hidden");
        }
    })

    oBtn.click(function () {
        // usernameText = "13242854641";
        // passwordText = "abcd123456";
        if (usernameText.length != 0 && passwordText.length != 0) {
            $.ajax({
                type: "post",
                url: "../serve/php/login.php",
                dataType: "json",
                data: `username=${usernameText}&password=${passwordText}`,
                success: function (response) {
                    console.log(response);
                    if (response.status == "success") {
                        alert(response.msg);
                        window.location.href = "http://127.0.0.1/code/WeiLan-copy/code/html/shouye.html";
                    } else {
                        alert(response.msg);
                    }

                }

            })

        }



    })


})