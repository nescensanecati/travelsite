const fetchShows = fetch("https://project-1-api.herokuapp.com/showdates?api_key=e49de4b9-5c8a-40f3-a40b-efe5cd3ca98b", { method: 'GET', redirect: 'follow' })
    .then((response) => response.json())
    .then((showResponse) => {
        return showResponse;
    });


function createShowVisualizationMobile(showStructure) {
    const tempArticleContainer = document.createElement('article');

    const tempDateTitle = document.createElement('p');
    tempDateTitle.classList.add('main__p--title-format')
    tempDateTitle.innerText = 'Date'

    const tempDateValue = document.createElement('p');
    tempDateValue.classList.add('main__p--info-format');
    tempDateValue.classList.add('main__p--demi');
    let dateFormat = new Date(showStructure.date).toLocaleDateString();
    tempDateValue.innerText = dateFormat;

    const tempVenueTitle = document.createElement('p');
    tempVenueTitle.classList.add('main__p--title-format');
    tempVenueTitle.innerText = 'Venue'

    const tempVenueValue = document.createElement('p');
    tempVenueValue.classList.add('main__p--info-format')
    tempVenueValue.innerText = showStructure.place;

    const tempLocationTitle = document.createElement('p');
    tempLocationTitle.classList.add('main__p--title-format');
    tempLocationTitle.innerText = 'Location'

    const tempLocationValue = document.createElement('p');
    tempLocationValue.classList.add('main__p--info-format')
    tempLocationValue.innerText = showStructure.location;

    const tempButtonHolder = document.createElement('button');
    tempButtonHolder.innerHTML = "BUY TICKETS"


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
    let dateFormat = new Date(showStructure.date).toLocaleDateString();
    tempDateValue.innerText = dateFormat;

    const tempVenueValue = document.createElement('p');
    tempVenueValue.classList.add('main__p--info-format')
    tempVenueValue.innerText = showStructure.place;

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
        const getCommentsFromApi = () => {
            fetchShows.then(shows => {
                shows.forEach(show => {
                    const tempShowStructure = createShowVisualizationMobile(show);
                    myShowsEl.appendChild(tempShowStructure);
                })
            });
        };

        getCommentsFromApi();

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

        const getCommentsFromApi = () => {
            fetchShows.then(shows => {
                shows.forEach(show => {
                    const tempShowStructure = createShowVisualizationNotMobile(show);
                    myShowsEl.appendChild(tempShowStructure);
                })
            });
        };
        getCommentsFromApi();


    }
    else if (screen.width >= 1280) {
    }
}

renderShows();
addEventListener("resize", () => { renderShows(); });

setTimeout(() => {
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
}, 1000);


