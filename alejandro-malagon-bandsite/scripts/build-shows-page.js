let showsArray = [];

function createShowVisualizationMobile(showStructure) {
    const tempArticleContainer = document.createElement('article');

    const tempDateTitle = document.createElement('p');
    tempDateTitle.classList.add('shows__title')
    tempDateTitle.innerText = 'Date'

    const tempDateValue = document.createElement('p');
    tempDateValue.classList.add('shows__info');
    tempDateValue.classList.add('shows--demi');
    let dateFormat = new Date(showStructure.date).toLocaleDateString();
    tempDateValue.innerText = dateFormat;

    const tempVenueTitle = document.createElement('p');
    tempVenueTitle.classList.add('shows__title');
    tempVenueTitle.innerText = 'Venue'

    const tempVenueValue = document.createElement('p');
    tempVenueValue.classList.add('shows__info')
    tempVenueValue.innerText = showStructure.place;

    const tempLocationTitle = document.createElement('p');
    tempLocationTitle.classList.add('shows__title');
    tempLocationTitle.innerText = 'Location'

    const tempLocationValue = document.createElement('p');
    tempLocationValue.classList.add('shows__info')
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
    tempDateValue.classList.add('shows__info');
    tempDateValue.classList.add('shows--demi');
    let dateFormat = new Date(showStructure.date).toLocaleDateString();
    tempDateValue.innerText = dateFormat;

    const tempVenueValue = document.createElement('p');
    tempVenueValue.classList.add('shows__info')
    tempVenueValue.innerText = showStructure.place;

    const tempLocationValue = document.createElement('p');
    tempLocationValue.classList.add('shows__info')
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
    const showsParentContainer = document.querySelector(".shows");
    showsParentContainer.innerHTML = "";

    const tempArticleContainer = document.createElement('article');

    const tempH2TittleValue = document.createElement('h2');
    tempH2TittleValue.innerText = 'Shows';

    const tempShowsContainer = document.createElement('article');
    tempShowsContainer.classList.add("shows__container")

    tempArticleContainer.appendChild(tempH2TittleValue);
    showsParentContainer.appendChild(tempArticleContainer);
    showsParentContainer.appendChild(tempShowsContainer);

    const myShowsEl = document.querySelector(".shows__container");

    myShowsEl.innerHTML = "";

    if (screen.width < 768) {
        axios.get('https://project-1-api.herokuapp.com/showdates?api_key=e49de4b9-5c8a-40f3-a40b-efe5cd3ca98b')
            .then(response => {
                showsArray = response.data;
                showsArray.forEach(show => {
                    const tempShowStructure = createShowVisualizationMobile(show);
                    myShowsEl.appendChild(tempShowStructure);
                });
            })
            .catch(error => {
                console.log(error);
            })

    } else if (screen.width >= 768) {

        const tempArticleContainer = document.createElement('article');
        tempArticleContainer.classList.add('shows__row');

        const tempDateTitle = document.createElement('p');
        tempDateTitle.classList.add('shows__title')
        tempDateTitle.innerText = 'Date'

        const tempVenueTitle = document.createElement('p');
        tempVenueTitle.classList.add('shows__title');
        tempVenueTitle.innerText = 'Venue'

        const tempLocationTitle = document.createElement('p');
        tempLocationTitle.classList.add('shows__title');
        tempLocationTitle.innerText = 'Location'

        const tempEmptyTitle = document.createElement('p');
        tempEmptyTitle.classList.add('shows__title')
        tempEmptyTitle.innerText = ''

        tempArticleContainer.appendChild(tempDateTitle);
        tempArticleContainer.appendChild(tempVenueTitle);
        tempArticleContainer.appendChild(tempLocationTitle);
        tempArticleContainer.appendChild(tempEmptyTitle);

        myShowsEl.appendChild(tempArticleContainer)

        axios.get('https://project-1-api.herokuapp.com/showdates?api_key=e49de4b9-5c8a-40f3-a40b-efe5cd3ca98b')
            .then(response => {
                showsArray = response.data;
                showsArray.forEach(show => {
                    const tempShowStructure = createShowVisualizationNotMobile(show);
                    myShowsEl.appendChild(tempShowStructure);
                });
            })
            .catch(error => {
                console.log(error);
            })

    }
    else if (screen.width >= 1280) {
    }
}

function bottomBandsiteLogo() {
    const mobileContainer = document.querySelector(".footer__m")
    const notMobileContainer = document.querySelector(".footer__nm");

    if (screen.width < 768) {
        notMobileContainer.innerHTML = "";
        mobileContainer.innerHTML = `<a class="footer__a" href="index.html"><img class="footer__img" src="../assets/logos/logo-bandsite.svg" alt="BANDSITE logo" /></a>`;
    }
    else {
        mobileContainer.innerHTML = "";
        notMobileContainer.innerHTML = `<a class="footer__a" href="index.html"><img class="footer__img" src="../assets/logos/logo-bandsite.svg" alt="BANDSITE logo" /></a>`;
    }
}

renderShows();
bottomBandsiteLogo();
addEventListener("resize", () => { location.reload(); renderShows(); bottomBandsiteLogo(); });

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


