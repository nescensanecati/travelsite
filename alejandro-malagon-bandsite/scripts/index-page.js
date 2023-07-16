const commentsObject = [
    { commentorName: 'Connor Walton', commentDate: '02/17/2021', comment: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains." },
    { commentorName: 'Emilie Beach', commentDate: '01/09/2021', comment: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day." },
    { commentorName: 'Miles Acosta', commentDate: '12/20/2020', comment: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough." },
];


function createCommentCard(commentArray) {
    const cardSec = document.createElement('article');

    const tempCardDiv = document.createElement('div');
    tempCardDiv.classList.add('main__div--blank-logo')

    const tempEmptyDiv = document.createElement('div');

    const tempCommentDate = document.createElement('h4');
    tempCommentDate.innerText = commentArray.commentDate;

    const tempCommentorName = document.createElement('h3');
    tempCommentorName.innerText = commentArray.commentorName;

    const tempCommentorComment = document.createElement('p');
    tempCommentorComment.innerText = commentArray.comment;

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

    commentsObject.forEach(comment => {
        const card = createCommentCard(comment);
        myCommentsEl.appendChild(card);
    })


}

function handleFormSubmit(event) {
    event.preventDefault();

    const date = new Date().toLocaleDateString('en-US', { year: "numeric", month: "2-digit", day: "2-digit" });

    const formSubmission = {
        commentorName: event.target.commentorName.value,
        comment: event.target.commentInput.value,
        commentDate: date,
    };

    commentsObject.unshift(formSubmission);

    displayComment();

    document.getElementById("main__form").reset();
}

const formEl = document.querySelector('#main__form');

formEl.addEventListener('submit', handleFormSubmit);

displayComment();
