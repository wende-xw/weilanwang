$(function () {
    var oMask = $(".mask");
    console.log(oMask);

    var oSmall = $(".small");
    var oBig = $(".bigbox");
    var oBigImg = $(".big_img")
    $(".bk-img-box").on("mouseenter", function () {
        // console.log(1111);
        oMask.show();
        // oBig.show();
        oSmall.on("mousemove", function (e) {
            // console.log(1111111);

            //设置遮罩层在鼠标的中间
            var ow = oMask[0].offsetWidth / 2;
            var oh = oMask[0].offsetHeight / 2;

            console.log(ow, oh, "---------");
            // console.log(e.clientX, e.clientY);


            //用鼠标点的距离减去magirn值105；
            var x = e.clientX - ow - 565;
            var y = e.clientY - oh - 135;

            console.log(x, y, "++++++++++");


            // //遮罩层的最大移动距离：就是外层的宽度减去遮罩层的宽度
            // var maxwidth = oSmall[0].offsetWidth - oMask[0].offsetWidth;
            // var maxheight = oSmall[0].offsetHeight - oMask[0].offsetHeight;


            // //如果超出最小宽度就让他等于最小宽度，这是限制遮罩层出不去
            // x = x < 0 ? x = 0 : x;
            // y = y < 0 ? y = 0 : y;

            // //如果超出了最大宽度就让他等于最大宽度，这是限制遮罩层出不去
            // x = x > maxwidth ? maxwidth : x;
            // y = y > maxheight ? maxheight : y;

            // //小图的移动距离/大图的移动距离=小图的最大移动距离/大图的最大移动距离
            // //大图的移动距离=小图的移动距离*大图的最大移动距离/小图的最大移动距离

            // //得出大图的最大移动距离/小图的最大移动距离是一个比例
            // var percent = (oBigImg[0].offsetWidth - oBig[0].offsetWidth) / maxwidth;

            // //得出大图的水平移动距离，垂直移动距离
            // var bigImgMoveX = x * percent;
            // var bigImgMoveY = y * percent;

            // 遮罩层的移动距离
            oMask[0].style.left = x + "px";
            oMask[0].style.top = y + "px";

            // //大图的移动是通过改变他的margin来实现的，并且大图的移动跟遮挡层的移动是相反的
            // oBigImg[0].style.marginLeft = -bigImgMoveX + "px";
            // oBigImg[0].style.marginTop = -bigImgMoveY + "px";
        })



    })


    $(".bk-img-box").on("mouseleave", function () {
        // oMask.hide();
        // oBig.hide()
    })



})