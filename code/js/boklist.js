$(function () {
    class BooklistManager {
        constructor(data) {
            this.data = data;
            this.num = this.data.length / 4;
            this.nav = $(".flashsale_pagination");
            this.book_list = $(".book_list");
        }
        init() {
            this.createHTML();
            this.toggleWithAandLi()
        }
        createHTML() {
            let html1 = this.createUl();
            let html2 = this.createA();

            this.book_list.html(html1)
            this.nav.html(html2)

            //第一个孩子添加样式
            this.nav.children("a").first().addClass("current");

            //让第五个开始的孩子display：none
            this.book_list.children("li").each((index, element) => {
                if (index <= 3) {
                    $(element).addClass("li_cur");
                }
            });

        }
        //style="display: none;"
        createUl() {
            let res = this.data.map((element, index) => {
                return `
                <li>
                <a target="_blank" class="small_cover bk-img-box" href="#">
                    <img src="${element.src}" alt="" style="height: 100%;">
                </a>
                <a target="_blank" href="#" class="book_intro">${element.title}</a>
                <p class="price">￥ <span>${element.price}</span></p>
            </li>
                `
            }).join("");
            return res;
            // console.log(res);
        }
        createA() {
            let html = ""
            for (var i = 0; i < this.num; i++) {
                html += `<a>${i + 1}</a>`
            }
            return `<span class="prev"></span>${html}<span class="next"></span>`
        }
        toggleWithAandLi() {
            var aBtn = this.nav.children("a");
            var preBtn = this.nav.children(".prev");
            var nextBtn = this.nav.children(".next")
            let self = this;
            let index = 1;
            aBtn.click(function () {
                index = $(this).index();
                $(this).addClass("current").siblings().removeClass("current")
                self.book_list.attr("current", $(this).index());
                var text = self.book_list.attr("current");
                // var li = self.book_list.find(`li:lt(${text * 4}):gt(${text > 1 ? (-5 + text * 4) : -1})`);
                var li;
                if (text == 1) {
                    li = self.book_list.find("li:lt(4)");
                    li.addClass("li_cur");
                    self.book_list.children("li").not("li:lt(4)").removeClass("li_cur");
                } else if (text == 2) {
                    li = self.book_list.find("li:lt(8):gt(3)");
                    li.addClass("li_cur");
                    self.book_list.children("li").not(li).removeClass("li_cur")
                } else if (text == 3) {
                    li = self.book_list.find("li:lt(13):gt(7)");
                    li.addClass("li_cur");
                    self.book_list.children("li").not(li).removeClass("li_cur")
                }
            });

            function prev() {
                index--;
                aBtn.eq(index).addClass("current").siblings().removeClass("current")
            }
            function next() {
                index++;
                aBtn.eq(index).addClass("current").siblings().removeClass("current");

            }
            preBtn.click(function () {
                prev();
            })
            nextBtn.click(function () {
                next();
            })
            //未完成
        }

    }

    $.getJSON("../serve/json/booklist.json", json => { (new BooklistManager(json)).init() })


})