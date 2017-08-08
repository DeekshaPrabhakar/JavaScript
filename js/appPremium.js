$(document).ready(function () {
    buttterFlyClicker.init();
});

var buttterFlyClicker = {
    catObjects: [{ "name": "Orange", "imageUrl": "images/Orange.jpg", "clickCount": 7 }, { "name": "Browny", "imageUrl": "images/Browny.jpg", "clickCount": 23 }],
    init: function () {
        for (var i = 0; i < buttterFlyClicker.catObjects.length; i++) {

            var butterfly = buttterFlyClicker.catObjects[i];           

            $("#selectDiv").append('<div onclick=\"buttterFlyClicker.updateDisplayArea(' + i + ');\">' + buttterFlyClicker.createElement(butterfly) + '</div>');
        }
    },
    createElement: function(butterfly){
        return '<h2>' + butterfly.name + '</h2><img onclick="buttterFlyClicker.updateCount(this);return false;" src="' + butterfly.imageUrl + '" /><label>' + butterfly.clickCount + '</label>';
    },
    updateDisplayArea: function(index){
        $("#displayCat").html(buttterFlyClicker.createElement(buttterFlyClicker.catObjects[index]));
    },
    updateCount: function (id) {
        var lbl = id.nextElementSibling;
        var num = parseInt(lbl.textContent);
        num++;
        lbl.textContent = num;

        return false;
    }
};