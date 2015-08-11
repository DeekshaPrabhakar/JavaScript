<h1>Object Oriented JavaScript Case Study</h1>
<p>While developing web pages we often come across a case where we need to use a control more than once like datepicker, autocomplete etc..</p>
<p>Here we will explore a page where autocomplete control needs to be used more than once. For this let's consider a page where user can search iTunes for music or/and movies etc. We will be using <a href="https://www.apple.com/itunes/affiliates/resources/documentation/itunes-store-web-service-search-api.html">iTunes Search API</a></p>
<h2>Plain JavaScript</h2>
<p>For static data source:</p>
<h6>HTML</h6>
```html
Song:&nbsp;<input type="text" id="searchiTunesStatic" placeholder="Enter a song" />
<div id="songChoicesStatic"></div>
```
<h6>JavaScript</h6>
```javascript
function setUpAutocompleteStatic() {
    var topTenSongs = [ "Can't Feel My Face - The Weeknd", "Cheerleader (Felix Jaehn Remix Radio Edit) - Omi", "Lean On (feat. MØ & DJ Snake) - Major Lazer",
        "Watch Me (Whip / Nae Nae) - Silentó", "Fight Song - Rachel Platten", "Good for You (feat. A$AP Rocky) - Selena Gomez",
        "Drag Me Down - One Direction", "Marvin Gaye (feat. Meghan Trainor) - Charlie Puth", "Locked Away (feat. Adam Levine) - R. City",
        "Kick the Dust Up - Luke Bryan" 
      ];
    
    $("#searchiTunesStatic").autocomplete({
      appendTo: "#songChoicesStatic",
      source: topTenSongs,
      minLength: 0
    });
}

$(document).ready(function () {
  setUpAutocompleteStatic();
});
```
<p>But almost always the source fueling the lookup is coming from the server side.</p>
<p>So for dynamic data source:</p>
<h6>HTML</h6>
```html
Song:&nbsp;<input type="text" id="searchiTunes" placeholder="Enter a song" />
<div id="songChoices"></div>
```
<h6>JavaScript</h6>
```javascript
function setUpAutocomplete() {
    $("#searchiTunes").autocomplete({
        appendTo: "#songChoices",
        minLength: 2,
        source: function (request, response) {
            $.ajax({
                url: "http://itunes.apple.com/search?term=" + request.term + "&entity=musicTrack",
                dataType: "jsonp",
                data: {
                    featureClass: "P",
                    style: "full",
                    maxRows: 12,
                    name_startsWith: request.term
                },
                success: function(data) {
                    response($.map(data.results, function(item) {
                        itunesJson = item;
                        return {
                            imgUrl: item.artworkUrl30 ,
                            label: item.trackName
                        }
                    }));//end of response
                }//end of success
            });//end of ajax
        }//end of source
    });//end of autocomplete
}//end of function
$(document).ready(function () {
  setUpAutocomplete();
});
```
<p>So setting up of an autocompleter requires ~25 lines of code . And if we need to add one more autocomplete control, the setUpAutocomplete() function keeps repeating with different params.</p>
<p>With some help from object based concepts, inheritance and design patterns, this function can be modified into a generic control which can be used efficiently and to avoid redundancy.</p>
<h2>Object Oriented JavaScript</h2>
<p>At the end our setting up of autocomplete control will be like this:</p>
<h6>HTML</h6>
```html
Song:&nbsp;<input type="text" id="searchiTunes" placeholder="Enter a song" />
<div id="songChoices"></div>
```
<h6>JavaScript</h6>
```javascript
var aData = { inputCtrl: "searchiTunes", inputParamName: "term", menuCtrl: "songChoices", 
                reqURL: "http://itunes.apple.com/search?entity=musicTrack", reqParams: { }, onSelect: '' };
var controlOne = new lookupControl(aData);
controlOne.setAutocomplete();
```
<h5>Object Creation</h5>
<p>We need constructor version and not the literal version, since we want to be able to instantiate more than one autocomplete control</p>
<h6>JavaScript</h6>
```javascript
var lookupControl = function () {

}
```
<p>Now let's add properties and methods. Replace all specific id's or settings with a parameter name which can be passed during object initialization.</p>
<h6>JavaScript</h6>
```javascript
var lookupControl = function (data) {
    this.data = data;
    this.setAutocomplete = function () {
        var ctrlID = "#" + this.data.inputCtrl;
        $(ctrlID).autocomplete({
        appendTo: "#" + this.data.menuCtrl,
        autoFocus: true,
        delay: 500,
        minLength: 2,
        data: this.data,
        select: this.data.onSelect,
        source: function (request, response) {
           //ajax call to server
        }
    }); //end of autocomplete
}
};
```
<p>Let's create another object for ajax call used in setAutocomplete() function's source function. Now the control and model looks like this</p>
<h6>JavaScript</h6>
```javascript
var lookupControl = function (data) {
    this.data = data;
    this.setAutocomplete = function () {
        var ctrlID = "#" + this.data.inputCtrl;
        $(ctrlID).autocomplete({
        appendTo: "#" + this.data.menuCtrl,
        autoFocus: true,
        delay: 500,
        minLength: 2,
        data: this.data,
        select: this.data.onSelect,
        source: function (request, response) {
            var ctrlID = "#" + this.options.data.inputCtrl;
            //source is called on entry of i/p, so need to reevaluate it each time
            this.options.data.reqParams[this.options.data.inputCtrl] = $(ctrlID).val(); 
            var modelData = this.options.data;
            var model = new lookupModel(modelData); //model is called in controller
            model.getData(request, response);
        }
    }); //end of autocomplete
}
};

var lookupModel = function (data) {
    this.data = data;
    this.getData = function (request, response) {
        var ctrlID = "#" + this.data.inputCtrl;
        //source is called on entry of i/p, so need to reevaluate it each time
        this.data.reqParams[this.data.inputCtrl] = $(ctrlID).val(); 
        $.ajax({
            url: this.data.reqURL + '&' + this.data.inputParamName + '=' + this.data.reqParams[this.data.inputCtrl] ,
            dataType: "jsonp",
            success: function (args) {
                response($.map(args.results, function (item) {                        
                    itunesJson = item;
                        return {
                            imgUrl: item.artworkUrl30 ,
                            label: item.trackName
                        }
                }));
            }
        });
    } //end of getData
};
```
And yes, we are done. Now we can place these 2 model and controller in a common js file and use it across applications and across a single page too.

<h4>Acknowledgement</h4>

<ul>
<li><a href="http://code.tutsplus.com/tutorials/the-basics-of-object-oriented-javascript--net-7670">The Basics of Object-Oriented JavaScript</a></li>
<li><a href="https://www.apple.com/itunes/affiliates/resources/documentation/itunes-store-web-service-search-api.html">iTunes Search API</a></li>
<li><a href="https://rss.itunes.apple.com/">iTunes RSS Feed Generator</a></li>
<li><a href="http://www.rahulsingla.com/blog/2011/08/itunes-performing-itunes-store-search-in-javascript">iTunes Search in JavaScript</a></li>
</ul>
