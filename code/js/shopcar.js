$(function () {

    let listData;

    getCatInfo();

    function getCatInfo() {
        $.ajax({
            type: "post",
            url: "../serve/php/SC_getCartdata.php",
            dataType: "json",
            success: function (response) {
                // console.log(response);
                listData = response;
                var res = response.map((ele, i) => {
                    return `
                <tr class="cart-list-tr" data-index=${i}>
                    <td width="460" class="col-cover">
                        <div class="cover-info">
                            <a href="#" class="book-cover">
                                <img src=${ele.book_src} alt="书籍封面">
                            </a>
                            <a class="book-name" title=${ele.book_title} href="#">${ele.book_title}</a>
                        </div>
                    </td>
                    <td class="col-credit">${ele.num}</td>
                    <td class="col-wl-price common-price"> ￥${(ele.book_wlprice)} </td>
                    <td class="col-discount common-price"> ￥${(ele.book_delprice * 1 - ele.book_wlprice * 1).toFixed(2)} </td>
                    <td class="col-buy-num">
                        <div class="num-panel">
                            <a href="javascript:;" class="minus"></a>
                            <input type="text" class="buy-num" value="${ele.num}">
                            <a href="javascript:;" class="plus"></a> </div>
                    </td>
                    <td class="col-op"> 
                        <a href="javascript:;" class="J_collect">收藏</a> 
                        <a href="javascript:;" class="J_del">删除</a>
                    </td>
                </tr>
                    `
                }).join("");

                $(".cart-list").find("tbody").html(res);

                let total = 0, chajia = 0;
                response.forEach(element => {
                    total += element.total * 1;
                    chajia += (((element.book_delprice * 1 - element.book_wlprice * 1).toFixed(2)) * element.num);
                });

                $("#J_thriftPrice").text(chajia);
                $("#J_price").text(total);
            }
        })

    }

    //删除
    $(".cart-list").on("click", ".J_del", function () {
        let index = $(this).parents("tr").data("index");
        let gid = listData[index].gid;
        let oTr = $(this).parents("tr").remove();
        //remove的用法是 移除被选元素
        $.ajax({
            type: "post",
            url: "../serve/php/SC_delete.php",
            data: `gid=${gid}`,
            // dataType: "json",  如果没有返回值，就不要写返回值格式，会进入到失败函数，导致成功函数的内容不能被执行。
            success: function (response) {
                // getCatInfo(); 不用渲染的方法，因为从数据库从头读数据性能去渲染会比较差
            }
        })
        // console.log(oTr, $(".cart-list").find("tbody"))
    })

    //添加
    $(".cart-list").on("click", '.plus', function () {
        let index = $(this).parents("tr").data("index");
        let gid = listData[index].gid;

        $.ajax({
            type: "post",
            url: "../serve/php/SC_plus.php",
            data: `gid=${gid}`,
            success: function (response) {
                getCatInfo();
            }

        })

    })

    //减少
    $(".cart-list").on("click", '.minus', function () {
        let index = $(this).parents("tr").data("index");
        let gid = listData[index].gid;
        let oTr = $(this).parents("tr");

        $.ajax({
            type: "post",
            url: "../serve/php/SC_minus.php",
            data: `gid=${gid}`,
            success: function (response) {
                getCatInfo();
            }

        })
    })

    //失去焦点
    // $(".cart-list").on("blur", ".buy-num", function () {
    //     let text = $(this).val();
    //     let index = $(this).parents("tr").data("index");
    //     let gid = listData[index].gid;

    //     $.ajax({
    //         type: "post",
    //         url: "../serve/php/SC_blur.php",
    //         data: `gid=${gid}`,
    //         success: function (response) {
    //             // getCatInfo();
    //         }

    //     })
    // })

})