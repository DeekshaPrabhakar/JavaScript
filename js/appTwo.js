$(document).ready(function () {
    buttterFlyClicker.init();
});

var buttterFlyClicker = {
    catObjects: [{ "name": "Orange", "imageUrl": "images/Orange.jpg", "clickCount": 7 }, { "name": "Browny", "imageUrl": "images/Browny.jpg", "clickCount": 23 }],
    init: function () {
        for (var i = 0; i < buttterFlyClicker.catObjects.length; i++) {

            var butterfly = buttterFlyClicker.catObjects[i];

            /*var heading = document.createElement("h2");
            heading.textContent = butterfly.name;

            var imgTag = document.createElement("img");
            imgTag.src = butterfly.imageUrl;

            var labelEl = document.createElement("label");
            labelEl.textContent = butterfly.clickCount;

            var divEl = document.createElement("div");
            divEl.appendChild(heading);
            divEl.appendChild(imgTag);
            divEl.appendChild(labelEl);

            imgTag.addEventListener('click', function () {
                var lbl = this.nextElementSibling;
                var num = parseInt(lbl.textContent);
                num++;
                lbl.textContent = num;
            });

            document.body.appendChild(divEl);*/

            $("#insertButterflies").append('<div><h2>' + butterfly.name + '</h2><img src="' + butterfly.imageUrl + '" onclick=\"buttterFlyClicker.updateCount(this);\" /><label>' + butterfly.clickCount + '</label></div>');
        }
    },
    updateCount: function (id) {
        var lbl = $(id).next();
        var num = parseInt($(lbl).html());
        num++;
        $(lbl).html(num);
    }
};