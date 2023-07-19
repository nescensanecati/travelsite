let commentsArray = [];
let sortedCommentsArray = []


function sortCommentsArray(array) {
    tempSortedArray = [];
    for (let index = 0; index < array.length; index++) {
        if (tempSortedArray.length == 0) {
            tempSortedArray.push(array[index])
        }
        else if (array[index].timestamp > tempSortedArray[0].timestamp) {
            tempSortedArray.unshift(array[index])
        }
        else if (array[index].timestamp < tempSortedArray[tempSortedArray.length - 1].timestamp) {
            tempSortedArray.push(array[index])
        }
    }
    return tempSortedArray;
}

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

    axios.get('https://project-1-api.herokuapp.com/comments?api_key=e49de4b9-5c8a-40f3-a40b-efe5cd3ca98b')
        .then(response => {
            commentsArray = response.data;
            sortedCommentsArray = sortCommentsArray(commentsArray)
            console.log(sortedCommentsArray);
            sortedCommentsArray.forEach(comment => {
                const card = createCommentCard(comment);
                myCommentsEl.appendChild(card);
            });
        })
        .catch(error => {
            console.log(error);
        })

}

function handleFormSubmit(event) {
    event.preventDefault();

    const date = new Date().toLocaleDateString('en-US', { year: "numeric", month: "2-digit", day: "2-digit" });

    let raw = JSON.stringify({
        "name": event.target.commentorName.value,
        "comment": event.target.commentInput.value
    });


    axios.post("https://project-1-api.herokuapp.com/comments?api_key=e49de4b9-5c8a-40f3-a40b-efe5cd3ca98b", {
        name: event.target.commentorName.value,
        comment: event.target.commentInput.value
    })
        .then(response => { commentsArray = response.data; displayComment(); })
        .catch(error => { console.log(error) })

    document.getElementById("main__form").reset();
}

const formEl = document.querySelector('#main__form');

formEl.addEventListener('submit', handleFormSubmit);

displayComment();
