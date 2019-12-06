;(function () {

    "use strict";

    // VARIABLES
    let formElems = Array.prototype.slice.call(document.querySelector('form').elements);
    

    // FUNCTIONS

    /*
    This function gets the id or name attribute value from the input field 
    */
    let getId = function (field) {
        if (field.id.length > 0) {
            return field.id;
        }

        if (field.name.length > 0) {
            return field.name;
        }

        return null;
    }
    /*
    This function takes the input input key/value pairs and puts 
    them into an object that is stored in local storage 
    */
    let addToLocalStorageObject = function (name, key, value) {
        // Get the existing data
        let existing = localStorage.getItem(name);

        // If there's existing data in localStorage, convert the data into 
        // an object.  If not, create a new object
        existing = existing ? JSON.parse(existing) : {};

        // Add the key/value pair onto the object
        existing[key] = value;

        // Convert the object back into JSON and store the new item into localStorage object
        localStorage.setItem(name, JSON.stringify(existing))

    }
    /*
    This function saves the user input data locally (localStorage api) 
    */
    let saveUserInfo = function () {

       return formElems.forEach(function (element) {

        // Get an ID for the input field
        let id = getId(element);
        if (!id) return;
        
        // Store the input values into local storage object
        if (element.value !== "") {
            addToLocalStorageObject('data', id, element.value);
        }

       }) 
        
    }
    /*
    This function retrieves the saved user input and sets the saved value as the input value.
    The data will persist on browser refresh and open/close of browser 
    */
    let persistUserInfo = function () {
        
        return formElems.forEach(function (element) {
        // Get an ID value for the input field
        let id = getId(element);
        // If the element has no ID, skip it (i.e. button element)
        if (!id) return;

        // Get the object of the saved values and convert into an obj
        let savedValues = localStorage.getItem('data');
        if(!savedValues) return;
        savedValues = JSON.parse(savedValues);

        // If there is no saved input value to persist, skip it
        if(!savedValues[id]) return;

        // Otherwise, set the saved value to the input value
        element.value = savedValues[id]; 
        })
    }
    /*
    This function deletes all saved data from local storage and user input fields
    */
    let deleteUserInfo = function(event) {
        if (!event.target.closest('#save-me')) return;

        // Remove the single localStorage object (named data)
        localStorage.removeItem('data');  
    }

    persistUserInfo();      // Persist user data on load


    document.addEventListener('input', saveUserInfo, false);       // Listens for all input on text fields
    document.addEventListener('submit', deleteUserInfo, false);     // Listens for click event on submit button

})();