# JavaScript
<h1>Object Oriented JavaScript Case Study</h1>
<p>While developing web pages we often come across a case where we need to use a control more than once like datepicker, autocomplete etc..</p>
<p>Here we will explore a page where autocomplete control needs to be used more than once.</p>

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
Song:&nbsp;<input type="text" id="searchiTunesDynamic" placeholder="Enter a song" />
<div id="songChoicesDynamic"></div>
```
<h6>JavaScript</h6>
```javascript
function setUpAutocompleteDynamic() {
    $("#searchiTunesDynamic").autocomplete({
        appendTo: "#songChoicesDynamic",
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
  setUpAutocompleteDynamic();
});
```
<h2>Object based JavaScript</h2>
