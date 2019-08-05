$(function () {

    //图片工厂
    class rightOne {
        constructor(data, className1, className2) {
            this.data = data;
            this.class1 = className1;
            this.class2 = className2;
        }
        init() {
            this.create();
        }
        create() {
            let html = `
            <div class="plate-title"><h3>${this.data.title}</h3></div>
            <div class="${this.class2}">
                ${this.data.src.map(ele => {
                return `<a href=""><img src="${ele}" alt=""></a>`
            }).join("")}
            </div>`
            $(`.${this.class1}`).html(html);

        }


    }

    class rigthRankMore {
        constructor(data) {
            this.data = data.data;
            this.title = data.title;
            this.theme = data.theme;

        }
        init() {
            this.create();
            this.toggleClassNamewithoutside();
            this.toggleClassNamewithinside();
        }
        create() {
            let html1 = this.createTheme();
            let html2 = this.createOl();
            let html3 = this.createUl();
            $(".hot-rank-list3").html(html1 + html2 + html3);

            //获得要切换class的标签
            this.olli = $("#J_hot-sort").children("li")
            this.oUl = $(".hot-list");
            this.ulli = this.oUl.children("li");
            console.log(this.ulli);


            //给第一个添加样式
            this.oUl.first().addClass("hot_cur");
            this.olli.first().addClass("active");
        }
        createTheme() {
            let html = `
            <div class="plate-title">
                <h3>${this.theme}</h3>
            </div>
            `
            return html;
        }
        createOl() {
            let res = this.title.map(ele => {
                return `<li>${ele}</li>`
            }).join("");
            `<ol id="J_hot-sort" class="hot-sort clearfix"></ol>`;
            return `<ol id="J_hot-sort" class="hot-sort clearfix">${res}</ol>`;

        }
        createUl() {
            // console.log(this.data);
            let res = this.data.map(ele => {
                // console.log(ele);
                let res = ele.map(element => {
                    return `
                <li>
                    <a href="">
                        <span class="number">${element.number}</span>
                        <i class="small-img">
                            <img src="${element.src}" width="36" height="54">
                        </i>
                        <span class="infor">${element.infor}</span>
                        <span class="price">${element.price}</span>
                    </a>
                </li>
                    `
                }).join("");

                return `<ul class="hot-list .J_hot-block">${res}</ul>`
            }).join("");

            return res;


        }
        toggleClassNamewithoutside() {
            let self = this;
            this.olli.mouseenter(function () {
                let index = $(this).index();

                $(this).addClass("active").siblings().removeClass("active");

                self.oUl.eq(index).addClass("hot_cur").siblings().removeClass("hot_cur");

            })
        }
        toggleClassNamewithinside() {
            this.ulli.mouseenter(function () {
                $(this).addClass("active").siblings().removeClass("active")
            })
        }
    }

    class rigthRankOne {
        constructor(data, className) {
            this.data = data.data;
            this.class = className;
        }
        init() {
            console.log(this.data);
            this.create();
            this.toggleAddClass();
        }
        create() {
            let res = this.data.map(element => {
                return `
            <li>
                <a href="">
                    <span class="number">${element.number}</span>
                    <i class="small-img">
                        <img src="${element.src}" width="36" height="54">
                    </i>
                    <span class="infor">${element.infor}</span>
                    <span class="price">${element.price}</span>
                </a>
            </li>
                `
            }).join("");
            // console.log(res, "_______");
            let html = `
            <div class="plate-title">
                <h3>热销排行榜</h3>
            </div>
            <ul class="hot-list" style='display:block;'>${res}</ul>
            `
            $(`.${this.class}`).html(html);
        }
        toggleAddClass() {
            this.ulli = $(".hot-list").children("li");
            console.log(this.ulli);

            this.ulli.mouseenter(function () {
                $(this).addClass("active").siblings().removeClass("active")
            })
        }
    }

    //插入多个排行榜
    $.getJSON("../serve/json/box-right.json", json => {
        (new rigthRankMore(json.rank1)).init();
    });

    //插入单个排行榜
    $.getJSON("../serve/json/box-right.json", json => {
        (new rigthRankOne(json.rank2, "hot-rank-list2")).init();
    });
    $.getJSON("../serve/json/box-right.json", json => {
        (new rigthRankOne(json.rank3, "hot-rank-list1")).init();
    });


    // ....插入图片式
    $.getJSON("../serve/json/box-right.json", json => {
        (new rightOne(json.pic1, "presell", "presell-plate")).init();
    });

    $.getJSON("../serve/json/box-right.json", json => {
        (new rightOne(json.pic2, "hot-topic", "hot-topic-plate clearfix")).init();
    });

})