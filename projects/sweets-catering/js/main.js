let sweetsEl = $('#sweets'),
eventName = $('#eventName'),
noOfAttendees = $('#noOfAttendees'),
submitForm = $('#submitForm');

let sweetsList,
categoryList

function init(){
    $.getJSON('json/categories.json', function(categories){
        categoryList = categories;
        displayCategories(categoryList.categories);
    });
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
        sweetsEl.html(htmlString);
}


/**
 * Get the HTML string for one category list item.
 * @param {Object} category 
 */
function getCategoryItemHTML(category){
    return `<img data-id="${category.id}" src="img/${category.image}.jpg" class="category-image"> <h3 data-id="${category.id}">${category.title}</h3>`;
}


init();