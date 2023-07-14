const showsObject = [
    { date: 'Mon Sept 06 2021', venue: 'Ronald Lane', location: 'San Francisco, CA' },
    { date: 'Tue Sept 21 2021', venue: 'Pier 3 East', location: 'San Francisco, CA' },
    { date: 'Fri Oct 15 2021', venue: 'View Lounge', location: 'San Francisco, CA' },
    { date: 'Sat Nov 06 2021', venue: 'Hyatt Agency', location: 'San Francisco, CA' },
    { date: 'Fri Nov 26 2021', venue: 'Moscow Center', location: 'San Francisco, CA' },
    { date: 'Wed Dec 15 2021', venue: 'Press Club', location: 'San Francisco, CA' }
];

function createShowVisualizationMobile(showStructure) {
    // create article to show 
    const tempArticleContainer = document.createElement('article');

    // create p to show 
    const tempDateTitle = document.createElement('p');
    tempDateTitle.classList.add('main__p--title-format')
    tempDateTitle.innerText = 'Date'

    // create p to show  
    const tempDateValue = document.createElement('p');
    tempDateValue.classList.add('main__p--info-format');
    tempDateValue.classList.add('main__p--demi');
    tempDateValue.innerText = showStructure.date;

    // create p to show 
    const tempVenueTitle = document.createElement('p');
    tempVenueTitle.classList.add('main__p--title-format');
    tempVenueTitle.innerText = 'Venue'

    // create p to show  
    const tempVenueValue = document.createElement('p');
    tempVenueValue.classList.add('main__p--info-format')
    tempVenueValue.innerText = showStructure.venue;

    // create p to show 
    const tempLocationTitle = document.createElement('p');
    tempLocationTitle.classList.add('main__p--title-format');
    tempLocationTitle.innerText = 'Location'

    // create p to show  
    const tempLocationValue = document.createElement('p');
    tempLocationValue.classList.add('main__p--info-format')
    tempLocationValue.innerText = showStructure.location;

    // create button to show  
    const tempButtonHolder = document.createElement('button');
    tempButtonHolder.innerHTML = "BUY TICKETS"

    // append our elements above as children to the cardSec
    tempArticleContainer.appendChild(tempDateTitle);
    tempArticleContainer.appendChild(tempDateValue);
    tempArticleContainer.appendChild(tempVenueTitle);
    tempArticleContainer.appendChild(tempVenueValue);
    tempArticleContainer.appendChild(tempLocationTitle);
    tempArticleContainer.appendChild(tempLocationValue);
    tempArticleContainer.appendChild(tempButtonHolder);

    return tempArticleContainer;
}

function createShowVisualizationNotMobile(showStructure) {
    // create article to show 
    const tempArticleContainer = document.createElement('article');

    // create p to show  
    const tempDateValue = document.createElement('p');
    tempDateValue.classList.add('main__p--info-format');
    tempDateValue.classList.add('main__p--demi');
    tempDateValue.innerText = showStructure.date;

    // create p to show  
    const tempVenueValue = document.createElement('p');
    tempVenueValue.classList.add('main__p--info-format')
    tempVenueValue.innerText = showStructure.venue;

    // create p to show  
    const tempLocationValue = document.createElement('p');
    tempLocationValue.classList.add('main__p--info-format')
    tempLocationValue.innerText = showStructure.location;

    // create button to show  
    const tempButtonHolder = document.createElement('button');
    tempButtonHolder.innerHTML = "BUY TICKETS"

    // append our elements above as children to the cardSec
    tempArticleContainer.appendChild(tempDateValue);
    tempArticleContainer.appendChild(tempVenueValue);
    tempArticleContainer.appendChild(tempLocationValue);
    tempArticleContainer.appendChild(tempButtonHolder);

    return tempArticleContainer;

}

function renderShows() {
    // Grab #main__article--comments-container from html to append comments on it
    const myShowsEl = document.querySelector(".main__section--shows-container");

    // Clear the comments container if appointments are already there.
    myShowsEl.innerHTML = "";

    // Use forEach to loop through each item in our appointment array and create a card
    if (screen.width < 768) {
        showsObject.forEach(show => {
            const tempShowStructure = createShowVisualizationMobile(show);
            myShowsEl.appendChild(tempShowStructure);
        })
    } else if (screen.width >= 768) {


        // create article to show 
        const tempArticleContainer = document.createElement('article');

        // create p to show 
        const tempDateTitle = document.createElement('p');
        tempDateTitle.classList.add('main__p--title-format')
        tempDateTitle.innerText = 'Date'

        // create p to show 
        const tempVenueTitle = document.createElement('p');
        tempVenueTitle.classList.add('main__p--title-format');
        tempVenueTitle.innerText = 'Venue'

        // create p to show 
        const tempLocationTitle = document.createElement('p');
        tempLocationTitle.classList.add('main__p--title-format');
        tempLocationTitle.innerText = 'Location'

        // create p to show 
        const tempEmptyTitle = document.createElement('p');
        tempEmptyTitle.classList.add('main__p--title-format')
        tempEmptyTitle.innerText = ''

        tempArticleContainer.appendChild(tempDateTitle);
        tempArticleContainer.appendChild(tempVenueTitle);
        tempArticleContainer.appendChild(tempLocationTitle);
        tempArticleContainer.appendChild(tempEmptyTitle);

        myShowsEl.appendChild(tempArticleContainer)

        showsObject.forEach(show => {
            const tempShowStructureNotMobile = createShowVisualizationNotMobile(show);
            myShowsEl.appendChild(tempShowStructureNotMobile);
        })


    }
    else if (screen.width >= 1280) {
    }
}


// Render shows as required
renderShows();
addEventListener("resize", () => { renderShows(); });