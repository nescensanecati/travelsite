const showsObject = [
    { date: 'Mon Sept 06 2021', venue: 'Ronald Lane', location: 'San Francisco, CA' },
    { date: 'Tue Sept 21 2021', venue: 'Pier 3 East', location: 'San Francisco, CA' },
    { date: 'Fri Oct 15 2021', venue: 'View Lounge', location: 'San Francisco, CA' },
    { date: 'Sat Nov 06 2021', venue: 'Hyatt Agency', location: 'San Francisco, CA' },
    { date: 'Fri Nov 26 2021', venue: 'Moscow Center', location: 'San Francisco, CA' },
    { date: 'Wed Dec 15 2021', venue: 'Press Club', location: 'San Francisco, CA' }
];

function createShowVisualizationMobile(showStructure) {
    const tempArticleContainer = document.createElement('article');

    const tempDateTitle = document.createElement('p');
    tempDateTitle.classList.add('main__p--title-format')
    tempDateTitle.innerText = 'Date'

    const tempDateValue = document.createElement('p');
    tempDateValue.classList.add('main__p--info-format');
    tempDateValue.classList.add('main__p--demi');
    tempDateValue.innerText = showStructure.date;

    const tempVenueTitle = document.createElement('p');
    tempVenueTitle.classList.add('main__p--title-format');
    tempVenueTitle.innerText = 'Venue'

    const tempVenueValue = document.createElement('p');
    tempVenueValue.classList.add('main__p--info-format')
    tempVenueValue.innerText = showStructure.venue;

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
    const tempArticleContainer = document.createElement('article');
    tempArticleContainer.classList.add('shows__row');
    tempArticleContainer.classList.add('shows__row--hover');


    const tempDateValue = document.createElement('p');
    tempDateValue.classList.add('main__p--info-format');
    tempDateValue.classList.add('main__p--demi');
    tempDateValue.innerText = showStructure.date;

    const tempVenueValue = document.createElement('p');
    tempVenueValue.classList.add('main__p--info-format')
    tempVenueValue.innerText = showStructure.venue;

    const tempLocationValue = document.createElement('p');
    tempLocationValue.classList.add('main__p--info-format')
    tempLocationValue.innerText = showStructure.location;

    const tempButtonHolder = document.createElement('button');
    tempButtonHolder.innerHTML = "BUY TICKETS"

    tempArticleContainer.appendChild(tempDateValue);
    tempArticleContainer.appendChild(tempVenueValue);
    tempArticleContainer.appendChild(tempLocationValue);
    tempArticleContainer.appendChild(tempButtonHolder);

    return tempArticleContainer;

}

function renderShows() {
    const showsParentContainer = document.querySelector(".main__shows--container");
    showsParentContainer.innerHTML = "";

    const tempArticleContainer = document.createElement('article');

    const tempH2TittleValue = document.createElement('h2');
    tempH2TittleValue.innerText = 'Shows';

    const tempShowsContainer = document.createElement('article');
    tempShowsContainer.classList.add("main__section--shows-container")

    tempArticleContainer.appendChild(tempH2TittleValue);
    showsParentContainer.appendChild(tempArticleContainer);
    showsParentContainer.appendChild(tempShowsContainer);

    const myShowsEl = document.querySelector(".main__section--shows-container");

    myShowsEl.innerHTML = "";

    if (screen.width < 768) {
        showsObject.forEach(show => {
            const tempShowStructure = createShowVisualizationMobile(show);
            myShowsEl.appendChild(tempShowStructure);
        })
    } else if (screen.width >= 768) {

        const tempArticleContainer = document.createElement('article');
        tempArticleContainer.classList.add('shows__row');

        const tempDateTitle = document.createElement('p');
        tempDateTitle.classList.add('main__p--title-format')
        tempDateTitle.innerText = 'Date'

        const tempVenueTitle = document.createElement('p');
        tempVenueTitle.classList.add('main__p--title-format');
        tempVenueTitle.innerText = 'Venue'

        const tempLocationTitle = document.createElement('p');
        tempLocationTitle.classList.add('main__p--title-format');
        tempLocationTitle.innerText = 'Location'

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

renderShows();
addEventListener("resize", () => { renderShows(); });


let prevRow = null;
const rowsContainer = document.querySelectorAll('.shows__row--hover');
for (let index = 0; index < rowsContainer.length; index++) {
    rowsContainer[index].addEventListener('click', (e) => {

        const isRow = e.currentTarget.nodeName === 'ARTICLE';

        if (!isRow) {
            return;
        }

        e.currentTarget.classList.add('shows__row--selected');

        if (prevRow !== null) {
            prevRow.classList.remove('shows__row--selected');
        }

        prevRow = e.currentTarget;

    });
}

