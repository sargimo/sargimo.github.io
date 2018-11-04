let videoPlayerEl = $('#videoPlayer');
let videoTitleEl = $('#videoTitle');
let videoDescEl = $('#videoDesc');
let videoSearchEl = $('#videoSearch');
let videoThumbsEl = $('#videoThumbs');
let thumbHtml ="";

let videoList = [{
    name: "Taylor Swift the GOAT",
    source: '<iframe width="1280" height="720" src="https://www.youtube.com/embed/-aLYvZ5sX28" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    desc: "Best goat remix you ever fkn seen.",
    category: "Animal Remix",
    thumbnail: "images/goat1.jpg"
},
{
    name: "Water Pump Blues",
    source: '<iframe width="1280" height="720" src="https://www.youtube.com/embed/o5ZEYMl9VIs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    desc: "Jammin' with a water pump.",
    category: "Machinery Remix",
    thumbnail: "images/goat2.jpg",
},
{
    name: "Deer Phil Collins",
    source: '<iframe width="1280" height="720" src="https://www.youtube.com/embed/2ft954vXPa4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    desc: "Just dropping by for the fill.",
    category: "Animal Remix",
    thumbnail: "images/goat1.jpg",
},
{
    name: "Jump Around! Jump Around!",
    source: '<iframe width="1280" height="720" src="https://www.youtube.com/embed/p6DrOUb9cnI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    desc: "Fire alarm feat Cypress Hill.",
    category: "Machinery Remix",
    thumbnail: "images/goat1.jpg",
},
{
    name: "This Dog is Toxic",
    source: '<iframe width="1280" height="720" src="https://www.youtube.com/embed/AxoriYVxK5U" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    desc: "Someone pet the damned dog!",
    category: "Animal Remix",
    thumbnail: "images/goat1.jpg",
},
{
    name: "Doggo in A Minor",
    source: '<iframe width="1280" height="720" src="https://www.youtube.com/embed/St7S3YrxqW0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    desc: "A better voice than you'll ever have",
    category: "Animal Remix",
    thumbnail: "images/goat1.jpg",
},
{
    name: "I Feel Good!",
    source: '<iframe width="1280" height="720" src="https://www.youtube.com/embed/Z_FKqLqkyPY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    desc: "Spooky",
    category: "Person Remix",
    thumbnail: "images/goat1.jpg",
},
{
    name: "G-pop",
    source: '<iframe width="1280" height="720" src="https://www.youtube.com/embed/NLkDLy2TYxQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    desc: "Someone get Coachella on the phone. This is special.",
    category: "Animal Remix",
    thumbnail: "images/goat1.jpg",
},
{
    name: "The most important video on YouTube",
    source: '<iframe width="1280" height="720" src="https://www.youtube.com/embed/Ns7Z8ag4oSY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    desc: "Heaven let your light shine meow.",
    category: "Animal Remix",
    thumbnail: "images/goat1.jpg",
},
{
    name: "M.I.A - Paper ****s",
    source: '<iframe width="1280" height="720" src="https://www.youtube.com/embed/1tLyn1R0eR8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    desc: "I see a very fruitful colab album in the near future.",
    category: "People Remix",
    thumbnail: "images/goat1.jpg",
}]

$.each(videoList, function(i, item){
    thumbHtml += '<div class="videothumb"><img data-id="' + i + '"class="thumbnailimg" src=' + item.thumbnail + '><h3>' + item.name + '</h3></div><br />';
});

videoThumbsEl.html(thumbHtml);

videoThumbsEl.on('click','img', function(){
    let index = ($(this).attr("data-id"));
    // videoPlayerEl.attr("src", videoList[index].source);
    videoPlayerEl.html(videoList[index].source);
    videoTitleEl.html("<h1>" + videoList[index].name + "</h1>");
    videoDescEl.html(videoList[index].desc);
});