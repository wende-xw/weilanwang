$(function () {
    //获得页面标签
    let userphone = $("#userphone")
    let passwordC = $("#passwordC");
    let passwordD = $("#passwordD");

    let imgCode = $("#J_validCodes");       //图形验证码
    let msgCode = $("#msgcode");            //短信验证码
    let sendMsgBtn = $(".register-validCodeButton")
    let oBtn2 = $(".res2"); //注册按钮

    //拿到电话和密码的值，进行二次判断
    let userphoneText = "";
    let passwordCText = "";
    let passwordDText = passwordCText;
    let imgCodeText = "";
    let msgCodeText = ""

    //正则表达式
    let regphone = /^1[3-9]\d{9}$/   //邮箱
    let regPassword = /^[a-zA-Z0-9]{6,20}$/;  //密码

    /* 验证码处理 */
    //获取图形验证码的信息
    let captcha = new CaptchaMini({
        fontsize: 80,
    })
    captcha.draw(document.querySelector("#J_update_validCode"), r => {
        console.log(r, "验证码");
        imgCodeText = r;
        imgCode.trigger("blur");
    })

    //图形验证码失去焦点事件
    imgCode.blur(function (e) {
        let text = $.trim($(this).val());
        console.log(text);

        let ospan = $(this).nextAll("span");

        if (text.length == 0) {
            $(this).addClass("error-input");
            ospan.first().addClass("e-c-cur").siblings().removeClass("e-c-cur");
            console.log(11111);

        } else if (imgCodeText.toLowerCase() != text.toLowerCase()) {
            console.log(22222);

            ospan.first().addClass("e-c-cur").siblings().removeClass("e-c-cur");
        } else {
            console.log(333);

            $(this).removeClass("error-input");
            ospan.last().addClass("e-c-cur").siblings().removeClass("e-c-cur");
        }
    })

    //短信验证码部分
    function formatterDateTime() {
        var date = new Date()
        var month = date.getMonth() + 1
        var datetime = date.getFullYear() +
            "" // "年"
            +
            (month >= 10 ? month : "0" + month) +
            "" // "月"
            +
            (date.getDate() < 10 ? "0" + date.getDate() : date
                .getDate()) +
            "" +
            (date.getHours() < 10 ? "0" + date.getHours() : date
                .getHours()) +
            "" +
            (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
                .getMinutes()) +
            "" +
            (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
                .getSeconds());
        return datetime;
    }

    //监听短信验证码标签失去焦点事件
    sendMsgBtn.click(function () {
        msgCodeText = parseInt(Math.random() * 1000000);
        /* 检查手机号码是否正确 */
        var text = $.trim(userphone.val());
        if (text.length != 0 && regphone.test(text)) {

            /* 发送网络请求：发短信 */
            $.ajax({
                type: 'post',
                url: 'http://route.showapi.com/28-1',
                dataType: 'json',
                data: {
                    "showapi_timestamp": formatterDateTime(),
                    "showapi_appid": '100963', //这里需要改成自己的appid
                    "showapi_sign": '5327fb0bc71848fe8502aabe2bc6726f', //这里需要改成自己的应用的密钥secret
                    "mobile": text,
                    "content": `{"code":${msgCodeText},"minute":"3","comName":"奶牛养殖公司"}`,
                    "tNum": "T150606060601",
                    "big_msg": ""
                },
                error: function (XmlHttpRequest, textStatus, errorThrown) {
                    alert("操作失败!");
                },
                success: function (result) {
                    console.log(result) //console变量在ie低版本下不能用
                    // alert(result.showapi_res_code)
                }
            });

            var count = 60;
            var timer = setInterval(function () {
                count--;
                if (count <= 0) {
                    sendMsgBtn.html("发送短信验证码");
                    clearInterval(timer);
                } else {
                    sendMsgBtn.html("重试 " + count + "s");
                }
            }, 1000);
        } else {
            alert("手机号码不正确");
        }

        /* 开启倒计时：当前的标签不可点击 */
    });

    msgCode.blur(function (e) {
        let text = $.trim($(this).val());
        let ospan = $(this).nextAll("span");

        if (text.length == 0) {
            $(this).addClass("error-input");
            ospan.first().addClass("e-c-cur").siblings().removeClass("e-c-cur");
        } else if (msgCodeText != text) {
            ospan.first().addClass("e-c-cur").siblings().removeClass("e-c-cur");
        } else {
            $(this).removeClass("error-input");
            ospan.last().addClass("e-c-cur").siblings().removeClass("e-c-cur");
        }
    })


    //监听电话号码标签失去焦点事件
    userphone.blur(function (e) {
        let text = $.trim($(this).val());
        userphoneText = text;
        let ospan = $(this).nextAll("span");

        if (text.length == 0) {
            $(this).addClass("error-input");
            ospan.first().addClass("e-c-cur").siblings().removeClass("e-c-cur");
        } else if (!regphone.test(text)) {
            ospan.first().addClass("e-c-cur").siblings().removeClass("e-c-cur");
        } else {
            $(this).removeClass("error-input");
            ospan.last().addClass("e-c-cur").siblings().removeClass("e-c-cur");
        }
    })

    // 监听密码标签失去焦点事件
    passwordC.blur(function (e) {
        let text = $.trim($(this).val());
        passwordCText = text;
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
    passwordD.blur(function (e) {
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

    oBtn2.click(function (e) {
        // userphoneText = "13242855902";
        // msgCodeText = "111";
        // imgCodeText = "222";
        // passwordDText = passwordCText;


        if (userphoneText.length != 0 &&
            passwordCText.length != 0 &&
            passwordD.length != 0 &&
            imgCodeText.length != 0 &&
            msgCodeText.length != 0 &&
            $(".error-input").length == 0) {
            console.log(11111);

            $.ajax({
                type: "post",
                url: "../serve/php/register2.php",
                dataType: "json",
                data: `userphone=${userphoneText}&password=${passwordCText}`,
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