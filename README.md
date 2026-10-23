# Assignment #5. JavaScript Basics (DOM Manipulation & Events)

**Name:** YOUR NAME  
**Group:** YOUR GROUP  
**GitHub Pages:** https://YOUR-USERNAME.github.io/YOUR-REPO/

---

## Part 1: Profile Object, Data Types & Arithmetic

### Task 1. The Personal Info Object

Create a JavaScript `const` object named `userProfile` that stores a string (name), a number (birthYear), a boolean (isDeveloper) and an array (hobbies).

```js
const userProfile = {
  name: "Aibek",                              // string
  birthYear: 2005,                            // number
  isDeveloper: true,                          // boolean
  hobbies: ["Coding", "Football", "Music"]    // array
};
```

![Initial profile on the page](screenshots/01-initial.png)

### Task 2. Arithmetic Calculations

The current age is calculated dynamically (`current year - birthYear`). The second metric is the age in months (`age * 12`); the hobbies count (`hobbies.length`) is shown as well. The values are displayed both on the page and in the console.

```js
function calculateAge(birthYear) {
  return new Date().getFullYear() - birthYear;
}
function calculateMonths(birthYear) {
  return calculateAge(birthYear) * 12;
}
```

![Values on the page](screenshots/01-initial.png)

> Console output: *(insert a screenshot of the browser console, F12 -> Console)*

---

## Part 2. Form Input & Event Responses

### Task 3. HTML Form Setup

A form with a Username input, a Birth Year input and a "Create / Update Profile" submit button.

![Form with validation error](screenshots/02-validation-error.png)

### Task 4. Event Listener

A `submit` event listener reads the input values, validates them, updates the `userProfile` object and re-renders the profile (name, birth year, age and months are recalculated).

```js
form.addEventListener("submit", function (event) {
  event.preventDefault();
  userProfile.name = usernameInput.value.trim();
  userProfile.birthYear = Number(birthYearInput.value);
  renderProfile();
});
```

![Profile updated after submit](screenshots/03-profile-updated.png)

---

## Part 3: DOM List Manipulation

### Task 5. Creating & Removing Elements

- A `<ul>` list with hobbies.
- **Add Item** - creates a new `<li>` with `document.createElement` and adds it with `appendChild`.
- **Remove Item** - removes the last item with `lastElementChild.remove()`.

![Items added](screenshots/04-add-items.png)

![Last item removed](screenshots/05-remove-item.png)

![Empty list state](screenshots/06-empty-list.png)

---

## Summary of my work process

1. Started with the HTML structure: three sections (profile output, form, list) and linked `style.css` and `script.js`.
2. Created the `userProfile` object with four data types and wrote functions for age and months using arithmetic operators.
3. Added the form and a `submit` listener (`preventDefault`, input validation, updating the object properties, re-rendering).
4. Implemented the list: `createElement` + `appendChild` for adding, `lastElementChild.remove()` for removing. The `hobbies` array is kept in sync with the list, so the hobbies count updates automatically.
5. Styled the page with CSS and tested every scenario in the browser (valid and invalid input, empty list, Enter key). No console errors.
6. Uploaded the project to GitHub and enabled GitHub Pages.

## Project structure

```
index.html   - page structure
style.css    - styles
script.js    - all JavaScript logic
README.md    - report
screenshots/ - screenshots for the report
```
