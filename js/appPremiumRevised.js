// JavaScript source code

$(function() {

    var data = {
        catObjects: [{ "id": "0", "name": "Orange", "imageUrl": "images/Orange.jpg", "clickCount": 7 }, { "id": "1", "name": "Browny", "imageUrl": "images/Browny.jpg", "clickCount": 23 }]
    };

    var controller = {
        getButterflies: function () {           
            return data.catObjects;
        },

        init: function () {
            view.init();
        }
    };

    var view = {
        init: function () {
            // set things up

            

            //grab elements from DOM and store it in variable
            this.butterflyList = $('.butterfly-list');
            this.butterflyTemplate = $('script[data-template="butterfly"]').html();
            this.displayArea = $("#displayArea");
            //add event listener on the display area

            //render the view
            this.render();

        },
        render: function () {
            // update our view
            //clears butterfly list and rerender all butterflies

            // Cache vars for use in forEach() callback (performance)
            var butterflyList = this.butterflyList,
                butterflyTemplate = this.butterflyTemplate,
                displayArea = this.displayArea;


            // Clear and render
            butterflyList.html('');
            displayArea.html('');
            controller.getButterflies().forEach(function (butterfly) {
                // Replace template markers with data
                var thisTemplate = butterflyTemplate.replace(/{{id}}/g, butterfly.id)
                    .replace(/{{name}}/g, butterfly.name)
                .replace(/{{imageUrl}}/g, butterfly.imageUrl)
                .replace(/{{clickCount}}/g, butterfly.clickCount);
                butterflyList.append(thisTemplate);
            });

            //add event listeners to all images
            this.butterflyList.on('click', '.butterflyPic', function (e) {
                var butterflyIndex = $(this).parents('.butterfly').data().id;
                var butterfly = controller.getButterflies()[butterflyIndex];
                var thisTemplate = butterflyTemplate.replace(/{{id}}/g, butterfly.id)
                    .replace(/{{name}}/g, butterfly.name)
                .replace(/{{imageUrl}}/g, butterfly.imageUrl)
                .replace(/{{clickCount}}/g, butterfly.clickCount);
                displayArea.append(thisTemplate);
                return false;
            });
        }
    };

    controller.init();

}());