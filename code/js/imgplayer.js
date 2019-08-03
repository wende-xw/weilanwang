$(function () {
    //轮播图
    class BannerManager {
        constructor() {
            this.imgindex = 0;
            this.holder = $(".img_holder");
            this.wapper = $(".img_wapper");
            this.index_holder = $(".index_holder")
            this.width = this.holder.width();//盒子宽度=图片宽度
            this.timer = 0;
        }
        init() {
            this.bannerplay();
        }
        bannerplay() {
            //拷贝第一张图片放到最后
            this.wapper.append(this.wapper.children("img").first().clone());

            this.length = this.wapper.children("img").length;//获取页面 p标签(图片)的个数

            //设置oBox的宽度(根据图片的张数来动态设置标签的宽度)
            this.wapper.css("width", parseInt(this.holder.width()) * this.length);

            //根据图片的张数来创建1，2，3...小图标
            for (var i = 0; i < this.length - 1; i++) {
                this.index_holder.append(`<span>` + (i + 1) + `</span>`);
            };
            let oSpan = this.index_holder.children("span");
            //拿到所有的span小图标标签
            oSpan.first().addClass("active");

            let self = this;
            oSpan.mouseenter(function () {
                self.imgindex = $(this).index();
                $(this).addClass("active").siblings("span").removeClass("active");
                var imgLeft = $(this).index() * parseInt(self.width);

                self.wapper.css({ "left": -imgLeft + "px" })
            })


            //自动播放切换图片
            this.autoplay();

            //鼠标移入、移除|停止、开始轮播
            this.holder.hover(() => clearTimeout(this.timer), () => this.autoplay());
        }
        autoplay() {
            this.timer = setInterval(() => this.next(), 3000);
        }
        next() {
            this.imgindex++;
            if (this.imgindex >= this.length) {
                this.wapper.css({ "left": "0" });
                this.imgindex = 1;
            }
            this.wapper.stop().animate({ "left": -(this.imgindex * this.width) + "px" });
        }
        prev() {
            this.imgindex--;
            if (this.imgindex < 0) {
                this.wapper.css({
                    "left": -((this.length - 1) * this.width) + "px"
                });
                this.imgindex = this.length - 2;
            }
            this.wapper.stop().animate({ "left": -(this.imgindex * this.width) + "px" });

        }
    }

    let b = new BannerManager();
    b.init();


})