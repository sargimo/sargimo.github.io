let videoPlayerEl = $('#videoPlayer');
let videoTitleEl = $('#videoTitle');
let videoDescEl = $('#videoDesc');
let videoSearchEl = $('#videoSearch');
let videoThumbsEl = $('#videoThumbs');
let thumbHtml ="";

let videoList = [{
    name: "Goat Remix 3000",
    source: '<iframe width="1280" height="720" src="https://www.youtube.com/embed/-aLYvZ5sX28" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    desc: "Best goat remix you ever fkn seen",
    category: "Goat songs",
    thumbnail: "images/goat1.jpg"
},
{
    name: "Taylor Swift Goat",
    source: '<iframe width="560" height="315" src="https://www.youtube.com/embed/oHkqamFRTKI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    desc: "Taylor swift goes GOAT",
    category: "Goat songs",
    thumbnail: "images/goat2.jpg"
}]

$.each(videoList, function(i, item){
    thumbHtml += '<div class="videothumb"><img data-id="' + i + '"class="thumbnailimg" src=' + item.thumbnail + '><h3>' + item.name + '</h3></div>';
});

videoThumbsEl.html(thumbHtml);

videoThumbsEl.on('click','img', function(){
    let index = ($(this).attr("data-id"));
    // videoPlayerEl.attr("src", videoList[index].source);
    videoPlayerEl.html(videoList[index].source);
    videoTitleEl.html("<h1>" + videoList[index].name + "</h1>");
    videoDescEl.html(videoList[index].desc);
});