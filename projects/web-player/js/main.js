let videoPlayerEl = $('#videoPlayer'),
 videoTitleEl = $('#videoTitle'),
 videoDescEl = $('#videoDesc'),
 videoSearchEl = $('#videoSearch'),
 videoThumbsEl = $('#hexGrid'),
 categoryListEl = $('.category-list'),
 containerEl = $('.container'),
 backToVideosBtn = $('#backToVideos'),
 avLink = $('.advanced-search'),
 avTitleSearchBox = $('#avTitleSearchBox'),
 avCategoryDropdown = $('#avCategoryDropdown'),
 avSubmitBtn = $('#avSubmitBtn');
 advancedSearchBox = $('.advanced-search-box'),
 screenLinks = $('.screen-link'),
 screens = $('.screen')
// let thumbHtml ="";

let videoList, 
categoryList, 
usersData, 
screenId = 'home';

function init(){
    //get videos
    $.getJSON('json/videos.json', function(videos){
        videoList = videos;
        displayVideos(videoList.videos);
        videoSearchEl.on('keyup', function(evt){
            let title = $(this).val();
            let filteredVideos = filterByTitle(videoList.videos, title);
            displayVideos(filteredVideos);
        });
    });
    //get categories
    $.getJSON('json/categories.json', function(categories){
        categoryList = categories;
        displayCategories(categoryList.categories);
    });
    //advanced search
    avLink.on('click', function(){
        advancedSearchBox.toggle();
    });
    avSubmitBtn.on('click', doAdvancedSearch);
    //routing
    screenLinks.on('click', changeScreen);
    //changes from player back to videos
    backToVideosBtn.on('click', swapScreens);

    //check local storage for currentScreen
    if (localStorage.getItem('currentScreen')){
        screenId = localStorage.getItem('currentScreen');
        let screenLink = $('*[data-screen="'+ screenId + '"]');
        screenLink.click();
    } else {
        localStorage.setItem('currentScreen', screenId);
    }
};


/**
 * @param {string} title
 * Takes search input and filters videos by title
 */
// function displayVideosByTitle(name){
//     let filteredVideos = videoList.videos.filter(function(video){
//         return video.name.toLowerCase().includes(name.toLowerCase());
//     });
//     displayVideos(filteredVideos);
// }

/**
 * Filter the videos by title.
 * @param {Array} videos
 * @param {String} name
 */
function filterByTitle(videos, name){
    return videos.filter(function(video){
        return video.name.toLowerCase().includes(name.toLowerCase());
    });
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
 * Display a list of videos
 * @param {Array} videos
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
    return `<li class="category-item" data-categoryid="${category.id}">
                ${category.title}
            </li>`;
}

/**
 * Display the video categories
 * @param {Object} categories 
 */
function displayCategories(categories){
    //display catagory list items
    let htmlString ='';
    $.each(categories, function(i, category){
        htmlString = htmlString + getCategoryItemHTML(category);
    });
    categoryListEl.html(htmlString);
    //add a click listener to each category item
    let categoryItems = $('.category-item');
    categoryItems.on('click', function(){
        let categoryid = $(this).data('categoryid');
        let filteredVideos = filterByCategory(videoList.videos, categoryid);
        displayVideos(filteredVideos);
    });

    //display category dropdown items
    htmlString ='';
    $.each(categories, function(i, category){
        htmlString = htmlString + `<option value="${category.id}">${category.title}</option>`;
    });
    avCategoryDropdown.html(htmlString);
}


/**
 * Filter the videos by category and display.
 * @param {Number} categoryId
 */
// function displayVideosByCategory(categoryId){
//     let filteredVideos = videoList.videos.filter(function(video){
//         return video.categoryId === categoryId;
//     });
//     displayVideos(filteredVideos);
// }

/**
 * Filter the videos by category ID.
 * @param {Array} videos
 * @param {number} categoryId
 */
function filterByCategory(videos, categoryId){
    return videos.filter(function(video){
        return video.categoryId == categoryId;
    });
}

/**
 * Advanced search with multiple parameters.
 */
function doAdvancedSearch(){
    let name = avTitleSearchBox.val();
    let category = avCategoryDropdown.val();
    let filteredVideos = filterByTitle(videoList.videos, name);
    filteredVideos = filterByCategory(filteredVideos, category);
    displayVideos(filteredVideos);
};

/**
 * Change the screen.
 */
function changeScreen(){
    if(!screenId){
        screenId = $(this).data('screen');
    }
    screenLinks.removeClass('active');
    $(this).addClass('active');
    let screenId = $(this).data('screen');

    if(screenId === 'about' && !usersData){
        loadAboutScreen();
    }
    screens.removeClass('active');
    $('#' + screenId).addClass('active');

    localStorage.setItem('currentScreen', screenId);
    //reset the screen id
    screenId = null;
}

/**
 * Lazy load about screen.
 */
function loadAboutScreen(){
    diplayNameEl = $('#displayName'),
    bioEl = $('#bio');
    $.getJSON('json/users.json', function(users){
        usersData = users;
        let me = usersData.users[0];
        diplayNameEl.html(me.displayName);
        bioEl.html(me.bio);
    });
}



init();