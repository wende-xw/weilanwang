$(function () {
    class navMaganer {
        constructor(data) {
            this.data = data;

        }
        init() {
            // console.log(this.data);
            // this.createHTML();
            var div = $('<div class="box_shadow b_s">').html(this.createHTML())
            $(".main").append(div);

        }
        createHTML() {
            let res = "";
            this.data.forEach(element => {
                let html = `
                    <div>
                        <h2><a href="" class="h2_a">${element.title}</a></h2>
                        <p class="clearfix">${element.kind.map(ele => {
                    return `<a href="#" class="hav_a">${ele}</a><span>|</span>`
                }).join("")}</p>
                    </div>
                `;
                res += html;
            });
            // console.log(res);
            return `
                <div class="box_content">
                    <div class="hav">${res}</div>
                </div>`;
        }
    }

    $.getJSON("../serve/json/nav.json", json => {
        (new navMaganer(json).init())
    });
})

