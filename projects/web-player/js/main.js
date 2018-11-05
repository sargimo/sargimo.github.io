let videoPlayerEl = $('#videoPlayer');
let videoTitleEl = $('#videoTitle');
let videoDescEl = $('#videoDesc');
let videoSearchEl = $('#videoSearch');
let videoThumbsEl = $('#hexGrid');
// let thumbHtml ="";

let videoList = {
    "videos": [
        {
            "name": "Taylor Swift the GOAT",
            "source": "-aLYvZ5sX28",
            "desc": "Best goat remix you ever fkn seen.",
            "category": "Animal Remix",
            "thumbnail": "images/goat1.jpg"
        },
        {
            "name": "Water Pump Blues",
            "source": "o5ZEYMl9VIs",
            "desc": "Jammin' with a water pump.",
            "category": "Machinery Remix",
            "thumbnail": "images/goat2.jpg",
        },
        {
        "name": "Deer Phil Collins",
        "source": "2ft954vXPa4",
        "desc": "Just dropping by for the fill.",
        "category": "Animal Remix",
        "thumbnail": "images/goat1.jpg",
        },
        {
        "name": "Jump Around! Jump Around!",
        "source": "p6DrOUb9cnI",
        "desc": "Fire alarm feat Cypress Hill.",
        "category": "Machinery Remix",
        "thumbnail": "images/goat1.jpg",
        },
        {
        "name": "This Dog is Toxic",
        "source": "AxoriYVxK5U",
        "desc": "Someone pet the damned dog!",
        "category": "Animal Remix",
        "thumbnail": "images/goat1.jpg",
        },
        {
        "name": "Doggo in A Minor",
        "source": "St7S3YrxqW0",
        "desc": "A better voice than you'll ever have",
        "category": "Animal Remix",
        "thumbnail": "images/goat1.jpg",
        },
        {
        "name": "I Feel Good!",
        "source": "Z_FKqLqkyPY",
        "desc": "Spooky",
        "category": "Person Remix",
        "thumbnail": "images/goat1.jpg",
        },
        {
        "name": "G-pop",
        "source": "NLkDLy2TYxQ",
        "desc": "Someone get Coachella on the phone. This is special.",
        "category": "Animal Remix",
        "thumbnail": "images/goat1.jpg",
        },
        {
        "name": "The most important video on YouTube",
        "source": "Ns7Z8ag4oSY",
        "desc": "Heaven let your light shine meow.",
        "category": "Animal Remix",
        "thumbnail": "images/goat1.jpg",
        },
        {
        "name": "M.I.A - Paper ****s",
        "source": "1tLyn1R0eR8",
        "desc": "I see a very fruitful colab album in the near future.",
        "category": "People Remix",
        "thumbnail": "images/goat1.jpg",
        }
    ]
};

function init(){
    displayVideos(videoList.videos);
}

function getVideoItemHTML(i, video){
    return `<li data-id="${i} "class="hex">
                <div class="hexIn">
                    <a class="hexLink" href="#"> 
                        <img class="thumbnailimg" src="https://i.ytimg.com/vi/${video.source}/hqdefault.jpg">
                        <h1>${video.name}</h1>
                        <p>${video.desc}</p>
                    </a>
                </div>
            </li>`;
}

function displayVideos(videos){
    let htmlString ='';
    $.each(videos, function(i, video){
        htmlString = htmlString + getVideoItemHTML(i, video);
        // thumbHtml += '<li data-id="' + i + '"class="hex"><div class="hexIn"><a class="hexLink" href="#">' + '<img class="thumbnailimg" src=' + item.thumbnail + '><h1>' + item.name + '</h1><p>' + item.desc + '</p></a></div></li>';
    });
    videoThumbsEl.html(htmlString);
}

// videoThumbsEl.html(thumbHtml);

videoThumbsEl.on('click', 'li', function(){
    let index = ($(this).attr("data-id"));
    // videoPlayerEl.attr("src", videoList[index].source);
    videoPlayerEl.html(videoList[index].source);
    videoTitleEl.html("<h1>" + videoList[index].name + "</h1>");
    videoDescEl.html(videoList[index].desc);
});

init();