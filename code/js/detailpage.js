$(function () {

    let queryString = decodeURIComponent(window.location.search.slice(1));

    var arr = queryString.split("&");
    var queryObj = {};
    for (var i = 0; i < arr.length; i++) {
        var temparr = arr[i].split("=");
        queryObj[temparr[0]] = temparr[1];
    }

    $(".book-title").text(queryObj.book_title);
    $(".yuan").text(queryObj.book_wlprice);
    console.log($(".big_img"));

    $(".small").find("img").attr("src", queryObj.book_src);
    $(".big_img").attr("src", queryObj.book_src);
    // $(".cover-show").attr("href", queryObj.book_src)
    $(".old-price").text(queryObj.book_delprice);
    $(".book-price").find(".common-emprice").text(queryObj.book_delprice);
    $(".blue").text(queryObj.book_author);
    $(".publish").text(queryObj.book_publish);
    $(".pb-time").html(`<span>出版时间：</span> ${queryObj.book_time}`);
    $(".pb-ibsn").html(`<span>I&nbsp;S&nbsp;B&nbsp;N&nbsp;：</span>${queryObj.book_publish}`);





})