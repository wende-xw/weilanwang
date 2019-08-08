$(function () {
    let orderType = 0;

    let getList = (page, type) => {
        $.ajax({
            type: "post",
            url: `../serve/php/getGoodslist.${type}.php`,
            data: `page=${page}&orderType=${orderType}`,
            dataType: "json",
            success: function (response) {
                console.log(response);

                var res = response.data.map(ele => {
                    let html = `
        <div class="search-book-list bookList-text clearfix">
            <a href="" target="_blank" class="img-box">
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
                `
                    return html;
                }).join("");

                // console.log(res);
                $("#J_template").html(res);
            }
        })




    }

    getList(0, 1);

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
})