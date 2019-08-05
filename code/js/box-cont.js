$(function () {
    //创建大盒子
    class boxContent {
        constructor(class1, class2) {
            // console.log(class1, class2);
            this.class1 = class1;
            this.class2 = class2;
        }
        init() {
            this.create();
        }
        create() {

            var html = `
                <i class="box-gap"></i>
                <div class="box_content clearfix">
                    <div class="${this.class1}"></div>
                    <div class="${this.class2}"></div>
                </div>
            `;
            var oBoxShadow = $(`<div class="clearfix box_shadow"></div>`).html(html);
            $("#container").append(oBoxShadow);
        }
    }

    //创建商品内容
    class typeOne {
        constructor(data, className) {
            this.data = data;
            this.detailsData = data.data;
            this.className = className;
        }
        init() {
            this.create();
        }
        create() {

            let res = this.detailsData.map(ele => {
                return `
                <li>
                    <a target="_blank" class="small_cover bk-img-box" href="#" title="${ele.title}">
                        <img src="${ele.src}" style="height: 100%;">
                    </a>
                    <a target="_blank" href="#" class="book_intro">${ele.title}</a>
                    <p class="price">
                        ￥ <span>${ele.price}</span>
                    </p>
                </li>
                `
            }).join("");

            let html = `
            <div class="plate_title">
                <h2>${this.data.title}</h2>
            </div>
            <ul class="book-list clearfix">${res}</ul>
            `
            $(`.${this.className}`).html(html);
        }

    }

    //小框商品内容,flash-sale-recommend-plate工厂
    //参数className是创建内容要插入的div的类名
    class typeTwo {
        constructor(data, className) {
            this.data = data;
            this.class = className;
        }
        init() {
            this.create();
        }
        create() {
            let res = this.data.map(ele => {
                return ` 
                <a href=""><img src="${ele.src}" alt=""></a>
                `
            }).join("");
            let oDiv = $(`<div class="flash-sale-recommend-plate clearfix"></div>`).html(res);

            $(`.${this.class}`).append(oDiv);
        }
    }

    //作者信息---工厂
    class typeThree {
        constructor(data) {
            this.data = data;
        }
        init() {
            this.create()
        }
        create() {
            let res = this.data.map(ele => {
                return `
                <li>
                    <a href="" class="img">
                    <img src="${ele.src}" alt="${ele.name}">
                    </a>
                    <p class="author-key-message">
                        <a href="">${ele.name}</a>
                    </p>
                    <p class="author-detail-message">${ele.detail}</p>
                    <p class="author-related-works">
                        <span>相关作品：</span>
                        ${ele.makebook.map(ele => {
                    return `<a href="#">${ele}</a>`
                })}
                    </p>
                </li> `
            }).join("");

            let oUl = $(`<ul class="authorList clearfix"></ul>`).html(res);
            // console.log(oUl[0]);
            // console.log($(".famous").find(".plate_title"));

            $(".famous").find(".plate_title").after(oUl);
        }
    }




    //新书上架
    ((new boxContent("new_books", "presell")).init());
    $.getJSON("../serve/json/new_books.json", json => {
        (new typeOne(json.part1, "new_books")).init()
    });

    // 编辑推荐
    ((new boxContent("editor-choice", "hot-rank-list hot-rank-list3")).init());
    $.getJSON("../serve/json/new_books.json", json => {
        (new typeOne(json.part2, "editor-choice")).init()
    });

    //特价好书
    ((new boxContent("bargain-price", "hot-rank-list hot-rank-list2")).init());
    $.getJSON("../serve/json/new_books.json", json => {
        (new typeOne(json.part3, "bargain-price")).init()
    });

    //名家作品
    ((new boxContent("famous", "hot-topic clearfix")).init());
    $.getJSON("../serve/json/new_books.json", json => {
        (new typeOne(json.part4, "famous")).init()
    });

    //热门图书
    ((new boxContent("periodicals-magazines", "hot-rank-list hot-rank-list1")).init());
    $.getJSON("../serve/json/new_books.json", json => {
        (new typeOne(json.part5, "periodicals-magazines")).init()
    });

    //插入
    $.getJSON("../serve/json/flash_sale_r_p.json", json => {
        (new typeTwo(json.kind1, "flashsale").init())
    });
    $.getJSON("../serve/json/flash_sale_r_p.json", json => {
        (new typeTwo(json.kind2, "bargain-price").init());
        $(".bargain-price").children(".flash-sale-recommend-plate").addClass("bargain-price-plate");
    });

    //插入作者信息
    $.getJSON("../serve/json/author.json", json => {
        (new typeThree(json).init());
    });
})