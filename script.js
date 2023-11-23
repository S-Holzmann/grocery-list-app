// Get references to HTML elements using CSS selectors
const buttonPlus = document.querySelector(".button-plus");
const userInput = document.querySelector(".user-input");
const ul = document.querySelector("ul");

// Function to get the length of the user input
const userInputLength = function () {
    return userInput.value.length;
};

// Function to create a new list element and add it to the DOM
const createListElement = function () {

    // Create a container for the list item
    const listItemContainer = document.createElement("div");
    listItemContainer.classList.add("list-item-container");

    // Create a list item and set its text content
    const li = document.createElement("li");
    li.textContent = userInput.value;

    // Create a container for the delete button
    const deleteButtonContainer = document.createElement("div");
    deleteButtonContainer.classList.add("delete-button-container");

    // Create a delete button and set its text content
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("button-delete");
    deleteButton.textContent = "Delete";

    // Append the delete button to its container
    deleteButtonContainer.appendChild(deleteButton);

    // Append the list item and delete button container to the main container
    listItemContainer.appendChild(li);
    listItemContainer.appendChild(deleteButtonContainer);

    // Insert the new list item at the beginning of the unordered list
    ul.insertBefore(listItemContainer, ul.firstChild);

    // Clear the user input field
    userInput.value = "";

    // Add event listeners to the new list item and delete button
    listItemContainer.addEventListener("click", toggleDoneClass);
    deleteButton.addEventListener("click", deleteListItem);
};

// Function to add a new list item when the "Add" button is clicked
const addListAfterClick = function () {
    if (userInputLength() > 0 && userInput.value.trim() !== "") {
        createListElement();
    }
};

// Function to add a new list item when the "Enter" key is pressed
const addListAfterEnter = function (event) {
    if (userInputLength() > 0 && event.key === "Enter" && userInput.value.trim() !== "") {
        createListElement();
    }
};

// Function to toggle the "done" class on a list item when clicked
const toggleDoneClass = function () {
    const li = this.querySelector("li");
    if (li) {
        li.classList.toggle("done");
    }
};

// Function to delete a list item when the delete button is clicked
const deleteListItem = function () {
    const parentNode = this.parentElement.parentElement;
    if (parentNode) {
        parentNode.remove();
    }
};

// Event listeners for button click and "Enter" key press
buttonPlus.addEventListener("click", addListAfterClick);
userInput.addEventListener("keydown", addListAfterEnter);

// Event listener for click events on the unordered list
ul.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
        toggleDoneClass.call(event.target);
    } else if (event.target.classList.contains("button-delete")) {
        deleteListItem.call(event.target);
    }
});