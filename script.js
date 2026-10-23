"use strict";

/* ==========================================================
   PART 1. Profile object, data types & arithmetic
   ========================================================== */

// Task 1: const object that stores different data types.
// const means the variable can't be re-assigned, but the object's
// properties can still be changed (we do this in Part 2).
const userProfile = {
  name: "Aibek",                                   // string
  birthYear: 2005,                                 // number
  isDeveloper: true,                               // boolean
  hobbies: ["Coding", "Football", "Music"]         // array
};

// Task 2: arithmetic operators.
function calculateAge(birthYear) {
  const currentYear = new Date().getFullYear();    // current year, dynamic
  return currentYear - birthYear;                  // subtraction
}

function calculateMonths(birthYear) {
  return calculateAge(birthYear) * 12;             // multiplication
}

// Show values in the console and on the page.
function logProfile() {
  console.log("---- userProfile ----");
  console.log("Name:", userProfile.name);
  console.log("Birth year:", userProfile.birthYear);
  console.log("Is developer:", userProfile.isDeveloper);
  console.log("Hobbies:", userProfile.hobbies);
  console.log("Age:", calculateAge(userProfile.birthYear));
  console.log("Months old:", calculateMonths(userProfile.birthYear));
  console.log("Hobbies count:", userProfile.hobbies.length);
}

function renderProfile() {
  document.getElementById("out-name").textContent = userProfile.name;
  document.getElementById("out-birthYear").textContent = userProfile.birthYear;
  document.getElementById("out-isDeveloper").textContent =
    userProfile.isDeveloper ? "Yes" : "No";
  document.getElementById("out-age").textContent =
    calculateAge(userProfile.birthYear);
  document.getElementById("out-months").textContent =
    calculateMonths(userProfile.birthYear);
  document.getElementById("out-hobbiesCount").textContent =
    userProfile.hobbies.length;
}

/* ==========================================================
   PART 2. Form input & event responses
   ========================================================== */

const form = document.getElementById("profile-form");
const usernameInput = document.getElementById("username");
const birthYearInput = document.getElementById("birthYear");
const formMessage = document.getElementById("form-message");

function showMessage(element, text, isError) {
  element.textContent = text;
  element.classList.toggle("error", isError);
}

// Task 4: submit event listener -> read inputs -> update userProfile.
form.addEventListener("submit", function (event) {
  event.preventDefault();                          // stop page reload

  const name = usernameInput.value.trim();
  const birthYear = Number(birthYearInput.value);  // string -> number
  const currentYear = new Date().getFullYear();

  // Reset the previous error state
  usernameInput.classList.remove("invalid");
  birthYearInput.classList.remove("invalid");

  // Validation
  if (name === "") {
    usernameInput.classList.add("invalid");
    showMessage(formMessage, "Please enter a username.", true);
    return;
  }
  if (!Number.isInteger(birthYear) || birthYear < 1900 || birthYear > currentYear) {
    birthYearInput.classList.add("invalid");
    showMessage(
      formMessage,
      "Birth year must be a whole number between 1900 and " + currentYear + ".",
      true
    );
    return;
  }

  // Update the object (allowed: only the variable is const, not the content)
  userProfile.name = name;
  userProfile.birthYear = birthYear;

  renderProfile();
  logProfile();
  showMessage(formMessage, "Profile updated!", false);
  form.reset();
});

/* ==========================================================
   PART 3. DOM list manipulation
   ========================================================== */

const hobbyList = document.getElementById("hobby-list");
const newItemInput = document.getElementById("new-item");
const addBtn = document.getElementById("add-btn");
const removeBtn = document.getElementById("remove-btn");
const listMessage = document.getElementById("list-message");

// Creates an <li> element and puts it into the <ul>.
function addListItem(text) {
  const li = document.createElement("li");         // create element
  li.textContent = text;                           // safe text (no HTML injection)
  hobbyList.appendChild(li);                       // add to the DOM
}

// Placeholder shown when the list is empty.
function updateEmptyState() {
  const placeholder = hobbyList.querySelector("li.empty");
  if (userProfile.hobbies.length === 0 && !placeholder) {
    const li = document.createElement("li");
    li.className = "empty";
    li.textContent = "The list is empty";
    hobbyList.appendChild(li);
  } else if (userProfile.hobbies.length > 0 && placeholder) {
    placeholder.remove();
  }
}

// Initial list built from the array
userProfile.hobbies.forEach(addListItem);

// "Add Item" button
addBtn.addEventListener("click", function () {
  const text = newItemInput.value.trim();

  if (text === "") {
    showMessage(listMessage, "Type something before adding.", true);
    return;
  }

  // Remove the placeholder first so it doesn't count as an item
  const placeholder = hobbyList.querySelector("li.empty");
  if (placeholder) placeholder.remove();

  userProfile.hobbies.push(text);                  // keep the array in sync
  addListItem(text);
  newItemInput.value = "";
  newItemInput.focus();

  showMessage(listMessage, 'Added "' + text + '".', false);
  renderProfile();                                 // hobbies count changes
});

// Pressing Enter in the input = clicking "Add Item"
newItemInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") addBtn.click();
});

// "Remove Item" button: deletes the LAST item
removeBtn.addEventListener("click", function () {
  if (userProfile.hobbies.length === 0) {
    showMessage(listMessage, "Nothing to remove.", true);
    return;
  }

  const removed = userProfile.hobbies.pop();       // remove from array
  hobbyList.lastElementChild.remove();             // remove from the DOM

  updateEmptyState();
  showMessage(listMessage, 'Removed "' + removed + '".', false);
  renderProfile();
});

/* ==========================================================
   Start
   ========================================================== */
renderProfile();
logProfile();
