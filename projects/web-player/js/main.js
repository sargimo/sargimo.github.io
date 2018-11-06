let videoPlayerEl = $('#videoPlayer');
let videoTitleEl = $('#videoTitle');
let videoDescEl = $('#videoDesc');
let videoSearchEl = $('#videoSearch');
let videoThumbsEl = $('#hexGrid');
let categoryListEl = $('.category-list')
let containerEl = $('.container');
let backToVideosBtn = $('#backToVideos');
// let thumbHtml ="";

let videoList, categoryList;

function init(){
    //get videos
    $.getJSON('json/videos.json', function(videos){
        videoList = videos;
        displayVideos(videoList.videos);
        videoSearchEl.on('keyup', function(evt){
            displayVideosByTitle($(this).val());
        });
    });
    //get categories
    $.getJSON('json/categories.json', function(categories){
        categoryList = categories;
        displayCategories(categoryList.categories);
    });
    backToVideosBtn.on('click', swapScreens);
};


/**
 * @param {string} title
 * Takes search input and filters videos by title
 */
function displayVideosByTitle(name){
    let filteredVideos = videoList.videos.filter(function(video){
        return video.name.toLowerCase().includes(name.toLowerCase());
    });
    displayVideos(filteredVideos);
}


/**
 * @param {object} video
 * Get the HTML string for one video list item.
 */
function getVideoItemHTML(i, video){
    return `<li data-id="${video.id}"class="hex">
                <div class="hexIn">
                    <a class="hexLink" href="#"> 
                        <img class="thumbnailimg" src="https://i.ytimg.com/vi/${video.source}/hqdefault.jpg">
                        <h1>${video.name}</h1>
                        <p>${video.desc}</p>
                    </a>
                </div>
            </li>`;
}

/**
 * Display a list of videos.
 */
function displayVideos(videos){
    let htmlString ='';
    $.each(videos, function(i, video){
        htmlString = htmlString + getVideoItemHTML(i, video);
    });
    videoThumbsEl.html(htmlString);
    //add click event listener to each video item
    let videoItems = $('.hex');
    videoItems.on('click',  function(){
        playVideo($(this).data('id'));
        swapScreens();
    });
}

/**
 * Play the video.
 * @param {String} videoId 
 */
function playVideo(videoId){
    let youtubeId = videoList.videos[videoId].source;
    videoPlayerEl.attr("src", 'http://www.youtube.com/embed/' + youtubeId + '?autoplay=1');
}

function swapScreens(){
    if (containerEl.hasClass('is-open')) {
        containerEl.removeClass('is-open');
    }
    else {
        containerEl.addClass('is-open');
    }
}
/**
 * Get the HTML string for one category list item.
 * @param {Object} category 
 */
function getCategoryItemHTML(category){
    return `<li class="category-item" data-slug="${category.slug}">
                ${category.title}
            </li>`;
}

/**
 * Display the video categories
 * @param {Object} categories 
 */
function displayCategories(categories){
    let htmlString ='';
    $.each(categories, function(i, category){
        htmlString = htmlString + getCategoryItemHTML(category);
    });
    categoryListEl.html(htmlString);
}


// videoThumbsEl.html(thumbHtml);

// videoThumbsEl.on('click', 'li', function(){
//     let index = ($(this).attr("data-id"));
//     videoPlayerEl.attr("src", `https://www.youtube.com/embed/${videoList.videos[index].source}?autoplay=1`);
//     videoTitleEl.html("<h1>" + videoList.videos[index].name + "</h1>");
//     videoDescEl.html(videoList.videos[index].desc);
//     containerEl.css("left", "4000px");
// });

init();