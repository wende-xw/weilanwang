$(function () {
    //获得页面标签
    let regType = $(".register-type").children("div")
    let regForm = $(".register-form")
    let userEmail = $("#useemail")
    let passwordA = $("#passwordA");
    let passwordB = $("#passwordB");
    let oBtn1 = $(".res1");

    //正则表达式
    let regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/   //邮箱
    let regPassword = /^[a-zA-Z0-9]{6,20}$/;  //密码


    //给第一添加样式
    regType.first().addClass("select");
    regForm.first().addClass("reg-form-cur");

    //切换手机注册，邮箱注册
    regType.click(function () {
        let index = $(this).index();
        $(this).addClass("select").siblings().removeClass("select");

        regForm.eq(index).addClass("reg-form-cur").siblings().removeClass("reg-form-cur");
    })

    //监听邮箱标签失去焦点事件
    let useremailText = "";
    userEmail.blur(function (e) {
        let text = $.trim($(this).val());
        useremailText = text;
        let ospan = $(this).nextAll("span");

        if (text.length == 0) {
            $(this).addClass("error-input");
            ospan.first().addClass("e-c-cur").siblings().removeClass("e-c-cur");
        } else if (!regEmail.test(text)) {
            ospan.first().addClass("e-c-cur").siblings().removeClass("e-c-cur");
        } else {
            $(this).removeClass("error-input");
            ospan.last().addClass("e-c-cur").siblings().removeClass("e-c-cur");
        }
    })

    // 监听密码标签失去焦点事件
    let passwordText = "";
    passwordA.blur(function (e) {
        let text = $.trim($(this).val());
        passwordText = text;
        let ospan = $(this).nextAll("span");

        if (text.length == 0) {
            $(this).addClass("error-input");
            ospan.first().addClass("e-c-cur").siblings().removeClass("e-c-cur");
        } else if (!regPassword.test(text)) {
            $(this).addClass("error-input");
            ospan.first().addClass("e-c-cur").siblings().removeClass("e-c-cur");
        } else {
            $(this).removeClass("error-input");
            ospan.last().addClass("e-c-cur").siblings().removeClass("e-c-cur");
        }
    })

    //监听密码重复标签数去焦点事件
    passwordB.blur(function (e) {
        let text = $.trim($(this).val());
        let ospan = $(this).nextAll("span");

        if (text.length == 0) {
            $(this).addClass("error-input");
            ospan.first().addClass("e-c-cur").siblings().removeClass("e-c-cur");
        } else if (passwordText != text) {
            $(this).addClass("error-input");
            ospan.first().addClass("e-c-cur").siblings().removeClass("e-c-cur");
        } else {
            $(this).removeClass("error-input");
            ospan.last().addClass("e-c-cur").siblings().removeClass("e-c-cur");
        }
    })

    oBtn1.click(function (e) {

        if (useremailText.length != 0 && passwordText != 0 && $(".error-input").length == 0) {

            $.ajax({
                type: "post",
                url: "../serve/php/register1.php",
                dataType: "json",
                data: `useremail=${useremailText}&password=${passwordText}`,
                success: function (respone) {
                    console.log(respone);
                    if (respone.status == "success") {
                        alert(respone.msg);
                        window.location.href = "http://127.0.0.1/code/WeiLan-copy/code/html/login.html";
                    } else {
                        alert(respone.msg)
                    }
                }
            })



        }


    })
})