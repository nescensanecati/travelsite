const commentsObject = [
    { commentorName: 'Connor Walton', commentDate: '02/17/2021', comment: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains." },
    { commentorName: 'Emilie Beach', commentDate: '01/09/2021', comment: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day." },
    { commentorName: 'Miles Acosta', commentDate: '12/20/2020', comment: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough." },
];


function createCommentCard(commentArray) {
    // Create article to contain the comments
    const cardSec = document.createElement('article');

    // Create div for the logo
    const tempCardDiv = document.createElement('div');
    tempCardDiv.classList.add('main__div--blank-logo')

    // Create empty div for the flex arrangement
    const tempEmptyDiv = document.createElement('div');

    // create h3 to show the name of the commentor
    const tempCommentDate = document.createElement('h4');
    tempCommentDate.innerText = commentArray.commentDate;

    // create h4 to show the date of the comment
    const tempCommentorName = document.createElement('h3');
    tempCommentorName.innerText = commentArray.commentorName;

    // create p to show the date of the comment
    const tempCommentorComment = document.createElement('p');
    tempCommentorComment.innerText = commentArray.comment;

    // append our elements above as children to the cardSec
    cardSec.appendChild(tempCardDiv);
    cardSec.appendChild(tempEmptyDiv);
    tempEmptyDiv.appendChild(tempCommentorName);
    tempEmptyDiv.appendChild(tempCommentDate);
    tempEmptyDiv.appendChild(tempCommentorComment);

    return cardSec;
}

function renderComments() {
    // Grab #main__article--comments-container from html to append comments on it
    const myCommentsEl = document.querySelector("#main__article--comments-container");

    // Clear the comments container if appointments are already there.
    myCommentsEl.innerHTML = "";

    // Use forEach to loop through each item in our appointment array and create a card
    commentsObject.forEach(comment => {
        const card = createCommentCard(comment);
        myCommentsEl.appendChild(card);
    })


}


function handleFormSubmit(event) {
    // Prevent page from reloading
    event.preventDefault();

    // Form current date
    const date = new Date().toLocaleDateString('en-US', {year: "numeric",month: "2-digit",day: "2-digit"});

    // Object to help us form data to be used for validation
    const formSubmission = {
        commentorName: event.target.commentorName.value,
        comment: event.target.commentInput.value,
        commentDate: date,
    };

    // Push card data to our comments array
    commentsObject.unshift(formSubmission);

    // Render comments to the screen
    renderComments();

}


// Select the form element
const formEl = document.querySelector('#main__form');


// Add an event listener to the form to get all input data within comment form
formEl.addEventListener('submit', handleFormSubmit);


// Render initial appointments in our array on line 1
renderComments();
