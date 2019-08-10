$(function () {
    let orderType = 0;
    let itemData;
    let itemList = [];
    let carList;

    $(".links").hover(function () {
        $(".shopcar-l").addClass("shopcar-l_active");
    }, function () {
        $(".shopcar-l").removeClass("shopcar-l_active");
    })

    $(".getpay").click(function () {
        console.log(1111111);
        window.open("http://127.0.0.1/code/WeiLan-copy/code/html/shopcar.html");
    })


    let getList = (page, type) => {
        $.ajax({
            type: "post",
            url: `../serve/php/getGoodslist.${type}.php`,
            data: `page=${page}&orderType=${orderType}`,
            dataType: "json",
            success: function (response) {
                itemData = response.data;
                var res = response.data.map((ele, i) => {
                    let html = `
        <div class="search-book-list bookList-text clearfix" data-index=${i}>
            <a href="#" class="img-box" >
                <img alt="篮球高手——招数漫画解析" src="${ele.book_src}" style="height: 100%;">
            </a>
            <div class="detail">
                <em class="bookList-text-title">${ele.book_title}</em>
                <p class="bookList-text-infor">
                    <a href="#" target="_blank">
                    </a>
                    <a target="_blank" href='#'>${ele.book_author}</a>
                    <span>著</span>
                    <span class="bookList-text-publish">${ele.book_publish}</span>
                    <span class="bookList-text-isbn">${ele.book_isbn}</span>
                    <span class="bookList-text-time">${ele.book_time}</span> </p>
                <p class="bookList-text-detail">${ele.book_detail}</p>
                <p class="bookList-text-price">
                    蔚蓝价：
                    <span class="red">${ele.book_wlprice}</span> 定价：<del>${ele.book_delprice}</del>
                    <span class="lightRed">
                        省：<em>${ele.book_emprice}</em>
                    </span>
                </p>
                <div class="bookList-pick">
                    <a target="_blank" class="${ele.book_btn_buy}" data-wlid="9042763"></a>
                    <a href="javascript:;" data="9042763" class="save-btn J_addFav"></a>
                </div>
            </div>
        </div>  
                `;
                    return html;
                }).join("");

                //插入到页面中
                $("#J_template").html(res);
            }
        })

    }

    getList(0, 1);

    console.log($(".search-book-list .img-box"));

    //页面跳转__________________________
    $("#J_template").on("click", ".img-box,.bookList-text-title", function () {
        // console.log(11111);
        let index = $(this).parents(".search-book-list").data("index");
        let queryStr = obj2QueryString(itemData[index]);
        // console.log(queryStr);
        window.location.href = `http://127.0.0.1/code/WeiLan-copy/code/html/detailpage.html?${queryStr}`;
    })

    //将数据变为查询字符串
    function obj2QueryString(o) {
        var queryString = "";
        for (var key in o) {
            queryString = queryString + "&" + `${key}=${o[key]}`;
        }
        return queryString.slice(1);
    }

    //页面跳转__________________________


    //添加到购物车事件
    $("#J_template").on("click", ".buy-btn", function () {
        let index = $(this).parents(".search-book-list").data("index");
        let gid = itemData[index].gid;
        let wlprice = itemData[index].book_wlprice;
        let delprice = itemData[index].book_delprice;

        //发送网络请求，连接购物车的数据
        $.ajax({
            type: "post",
            url: "../serve/php/addDataToSC.php",
            data: `gid=${gid}&wlprice=${wlprice}&delprice=${delprice}`,
            dataType: "json",
            success: function (response) {
                //根据购物车表返回的数据更新购物车
                carList = response;
                render(response);
                let num = 0, total = 0;
                response.forEach(ele => {
                    num++;
                    total += ele.total * 1;
                });
                // response.foreach((ele, i) => {
                //     num++;
                //     total += ele.total;
                // })
                $(".total_price").text(total);
                $(".total_num").text(num);

            }
        })

        alert("成功添加到购物车");
    })

    $("#J_template").on("click", ".buy-btn-gray", function () {
        alert("该商品缺货");
    })

    //删除某件商品
    $(".shopcar-l").on("click", ".delete", function () {
        let index = $(this).parents("li").data("index");
        console.log(index);
        let gid = carList[index].gid;
        console.log(gid);

        $.ajax({
            type: "post",
            url: "../serve/php/delete_SC.php",
            data: `gid=${gid}`,
            dataType: "json",
            success: function (response) {
                // console.log(response);
                carList = response;
                render(response);
                let num = 0, total = 0;
                response.forEach(ele => {
                    num++;
                    total += ele.total * 1;
                });
                $(".total_price").text(total);
                $(".total_num").text(num);
            }
        })

    })


    // render(carList);

    //渲染数据到页面
    function render(data) {
        let res = data.map((ele, i) => {
            return `
<li data-index=${i}>
        <a href=""><img src="${ele.book_src}" alt=""></a>
        <div class="car-infor">
            <p><span class="book_tit">${ele.book_title}</span>
                <span class="book_number"> x ${ele.num}</span>
                <span class="book_pri">${ele.book_wlprice}</span>
                <span class="delete">删除</span>
            </p>
        </div>
</li>`
        }).join("");
        $(".shopcar-l").find("ul").html(res);
    }



    //获取页码--------------开
    $.ajax({
        type: "post",
        url: "../serve/php/getwlPagecount.php",
        dataType: "json",
        success: function (response) {
            let pageSize = response.data.count;
            var res = "";
            for (let i = 0; i < pageSize; i++) {
                $("#J_nextPage").before(`<a href="javascript:;">${i + 1}</a>`)
            }
            $(".J_pagination_page").children("a").eq(0).addClass("check");

        }

    });
    $(".J_pagination_page").on("click", "a", function () {
        var index = $(this).index() - 1;

        $(this).addClass("check").siblings().removeClass("check");
        getList(index, 1);
    })
    //按价格搜索
    $(".byPrice span").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
        orderType = $(this).index();
        getList(0, 2);
    })
    //按折扣搜索
    // $(".byDiscount span").click(function () {
    //     $(this).addClass("active").siblings().removeClass("active");
    //     orderType = $(this).index();
    // });
    //按价格排序
    $("#order_price").click(function () {
        // $(this).addClass("active_a");
        $(this).toggleClass("down");
        $(this).toggleClass("up");
        if ($(this).attr("class") == "down") {
            console.log(11111111111111);
            orderType = 1;
        } else {
            console.log(2222222222222);
            orderType = 2;
        }
        getList(0, 1);
    })
    //获取页码----------------关
})