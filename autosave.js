;(function () {

    "use strict";

    let formElems = Array.prototype.slice.call(document.querySelector('form').elements);
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
    This function saves the user input data locally (localStorage api) 
    */
    let saveUserInfo = function (event) {

        
        // Stop the callback function if the target is not an input/textarea field in the form
        if (!formElems.includes(event.target)) return;     

        // Get an ID for the input field
        let id = getId(event.target);
        if (!id) return;

        // Otherwise, save the input value to local storage 
        return localStorage.setItem(id, event.target.value);
    }
    /*
    This function retrieves the saved user input and sets the saved value as the input value.
    The data will persist on browser refresh and open/close of browser 
    */
    let persistUserInfo = function () {
        return formElems.forEach(function (element) {

            // Get an ID for the input field
            let id = getId(element);
            // If the element has no ID, skip it
            if (!id) return;

            // Get the saved element id
            let savedValue = localStorage.getItem(element.id);
            // Skip if element does not have a saved value
            if (!savedValue) return;            
            // Otherwise, set the saved value to the input value
            element.value = savedValue;
        })
    }
    /*
    This function deletes all saved data from local storage and user input fields
    */
    let deleteUserInfo = function(event) {
        if (!event.target.closest('#save-me')) return;

        return formElems.forEach(function (element) {

            // Get an ID for the input field
            let id = getId(element);
            if (!id) return;

            // Clear all data from local storage
            localStorage.removeItem(element.id);
        })      
    }

    persistUserInfo();      // Persist user data on load


    document.addEventListener('input', saveUserInfo, false);       // Listens for all input on text fields
    document.addEventListener('submit', deleteUserInfo, false);     // Listens for click event on submit button

})();

