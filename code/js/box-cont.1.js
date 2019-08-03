$(function () {
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
                <div class="box-content clearfix">
                    <div class="${this.class1}"></div>
                    <div class="${this.class2}"></div>
                </div>
            `;
            var oBoxShadow = $(`<div class="clearfix box-shadow"></div>`).html(html);

            console.log(oBoxShadow[0]);
            console.log("--------------------");
            $("#container").append(oBoxShadow);
        }
    }
    ((new boxContent("new_books", "presell")).init());
    // ((new boxContent("editor-choice", "hot-rank-list")).init());
    // ((new boxContent("bargain-price", "hot-rank-list")).init());

    class typeOne {
        constructor() {

        }
        init() {

        }
        create() {

        }

    }


})