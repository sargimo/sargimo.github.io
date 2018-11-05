let videoListEl = $('.video-list'),
titleSearchBox = $('#titleSearchBox');

let videoData = {
    "videos": [
        {
            "id": "9XVasMSJSoU",
            "title": "The Developer Show (TL;DR 081)"
        },
        {
            "id": "Di7RvMlk9io",
            "title": "Top 10 Programming Languages to Learn in 2018"
        }
    ]
};


function init(){
    displayVideos(videoData.videos);
    titleSearchBox.on('keyup', function(evt){
        displayVideosByTitle($(this).val());
    })
}

/**
 * @param {string} title
 * Takes search input and filters videos by title
 */

function displayVideosByTitle(title){
    // let filteredVideos = [];
    // $.each(videoData.videos, function(i, video){
    //     if(video.title.includes(title)) {
    //         filteredVideos.push(video);
    //     }
    // });
    let filteredVideos = videoData.videos.filter(function(video){
        return video.title.toLowerCase().includes(title.toLowerCase());
    });
    displayVideos(filteredVideos);
}

/**
 * @param {object} video
 * Get the HTML string for one video list item.
 */
function getVideoItemHTML(video){
    return `<div class="video-item">
                <img src="https://i.ytimg.com/vi/${video.id}/hqdefault.jpg">
                <h3>${video.title}</h3>
            </div>`;
}

/**
 * Display a list of videos.
 */

function displayVideos(videos){
    let htmlString = '';
    $.each(videos, function(i, video){
        htmlString = htmlString + getVideoItemHTML(video);
    });
    videoListEl.html(htmlString);
}


init()