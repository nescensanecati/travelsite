//fetching the comments from the API
const fetchComments = fetch("https://project-1-api.herokuapp.com/comments?api_key=e49de4b9-5c8a-40f3-a40b-efe5cd3ca98b", { method: 'GET', redirect: 'follow' })
    .then((response) => response.json())
    .then((commentResponse) => {
        return commentResponse;
    });
//end of fetching the comments from the API


//posting the comments to the API
let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

async function postComments(url, requestOptions) {
    const response = await fetch(url, requestOptions);
    console.log(response.ok)
    return response.ok
}


function postComments(url, requestOptions) {
    fetch(url, requestOptions)
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
        });

}

//end of fetching the comments from the API    

function timeDifference(current, previous) {

    let msPerMinute = 60 * 1000;
    let msPerHour = msPerMinute * 60;
    let msPerDay = msPerHour * 24;
    let msPerMonth = msPerDay * 30;
    let msPerYear = msPerDay * 365;

    let elapsed = current - previous;

    if (elapsed < msPerMinute) {
        return Math.round(elapsed / 1000) + ' seconds ago';
    }

    else if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) + ' minutes ago';
    }

    else if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour) + ' hours ago';
    }

    else if (elapsed < msPerMonth) {
        return 'approximately ' + Math.round(elapsed / msPerDay) + ' days ago';
    }

    else if (elapsed < msPerYear) {
        return 'approximately ' + Math.round(elapsed / msPerMonth) + ' months ago';
    }

    else {
        return 'approximately ' + Math.round(elapsed / msPerYear) + ' years ago';
    }
}

function createCommentCard(commentJson) {
    const cardSec = document.createElement('article');

    const tempCardDiv = document.createElement('div');
    tempCardDiv.classList.add('main__div--blank-logo')

    const tempEmptyDiv = document.createElement('div');

    timeAgo = timeDifference(Date.now(), commentJson.timestamp)
    const tempCommentDate = document.createElement('h4');
    tempCommentDate.innerText = timeAgo;

    const tempCommentorName = document.createElement('h3');
    tempCommentorName.innerText = commentJson.name;

    const tempCommentorComment = document.createElement('p');
    tempCommentorComment.innerText = commentJson.comment;

    cardSec.appendChild(tempCardDiv);
    cardSec.appendChild(tempEmptyDiv);
    tempEmptyDiv.appendChild(tempCommentorName);
    tempEmptyDiv.appendChild(tempCommentDate);
    tempEmptyDiv.appendChild(tempCommentorComment);

    return cardSec;
}

function displayComment() {
    const myCommentsEl = document.querySelector("#main__article--comments-container");

    myCommentsEl.innerHTML = "";

    const getCommentsFromApi = () => {
        fetchComments.then((comments) => {
            comments.reverse()
            comments.forEach(comment => {
                const card = createCommentCard(comment);
                myCommentsEl.appendChild(card);
            })
        });
    };

    getCommentsFromApi();
}

function handleFormSubmit(event) {
    event.preventDefault();

    const date = new Date().toLocaleDateString('en-US', { year: "numeric", month: "2-digit", day: "2-digit" });

    let raw = JSON.stringify({
        "name": event.target.commentorName.value,
        "comment": event.target.commentInput.value
    });


    const postAxios = axios.post("https://project-1-api.herokuapp.com/comments?api_key=e49de4b9-5c8a-40f3-a40b-efe5cd3ca98b", {
        name: event.target.commentorName.value,
        comment: event.target.commentInput.value
    })
    postAxios.then(result => { console.log(result) });
    postAxios.catch(error => { console.log(error) })

    displayComment();

    document.getElementById("main__form").reset();
}

const formEl = document.querySelector('#main__form');

formEl.addEventListener('submit', handleFormSubmit);

displayComment();
