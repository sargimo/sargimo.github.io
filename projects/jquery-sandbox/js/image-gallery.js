let dogImages = [{
    name: "boxer",
    url500: "boxer500",
    url150: "boxer150"
},
{
    name: "fluffball",
    url500: "fluffball500",
    url150: "fluffball150"
},
{
    name: "gshepherd",
    url500: "gshepherd500",
    url150: "gshepherd150"
}];
let thumbnailsEl = $('.thumbnails');
let mainImageEl = $('.mainImage');
let imgHtml = "";
let leftArrow = $('.left');
let rightArrow = $('.right');
let currentIndex = 0;


$.each(dogImages, function(i, item){
    imgHtml += '<img data-id="' + i + '"class="thumbnailimg" id="' + item.name + '" src="images/' + item.url150 + '.jpg">';
});

thumbnailsEl.html(imgHtml);

thumbnailsEl.on('click','img', function(){
    let index = parseInt($(this).attr("data-id"));
    $('.selected').removeClass('selected');
    $(this).addClass('selected');
    mainImageEl.html('<img "class="mainImg" src="images/' + dogImages[index].url500 + '.jpg">');
    currentIndex = index;
});

leftArrow.on('click', function(){
    thumbnailsEl.find(`[data-id='${currentIndex}']`).removeClass('selected');
    if (currentIndex == 0) {
        mainImageEl.html('<img "class="mainImg" src="images/' + dogImages[2].url500 + '.jpg">');
        currentIndex = 2;
        thumbnailsEl.find(`[data-id='${currentIndex}']`).addClass('selected');
        return;
    }
    mainImageEl.html('<img "class="mainImg" src="images/' + dogImages[(currentIndex - 1)].url500 + '.jpg">');
    currentIndex--;
    thumbnailsEl.find(`[data-id='${currentIndex}']`).addClass('selected');
});

rightArrow.on('click', function(){
    thumbnailsEl.find(`[data-id='${currentIndex}']`).removeClass('selected');
    if (currentIndex == 2) {
        mainImageEl.html('<img "class="mainImg" src="images/' + dogImages[0].url500 + '.jpg">');
        currentIndex = 0;
        thumbnailsEl.find(`[data-id='${currentIndex}']`).addClass('selected');
        return;
    }
    mainImageEl.html('<img "class="mainImg" src="images/' + dogImages[(currentIndex + 1)].url500 + '.jpg">');
    currentIndex++;
    thumbnailsEl.find(`[data-id='${currentIndex}']`).addClass('selected');
});

