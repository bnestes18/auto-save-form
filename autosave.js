;(function () {
    let formElems = Array.prototype.slice.call(document.querySelector('form').elements);
    let submitBtn = document.querySelector('button');

    /*
    This function saves the user input data locally (localStorage api) 
    */
    let saveUserInfo = function (event) {
        if (!formElems.includes(event.target)) return;      // Stop the callback function if the target is not an input/textarea field in the form
        if (event.target.value !== "") {
            return localStorage.setItem(event.target.id, event.target.value);
        }
    }
    /*
    This function retrieves the saved user input and sets the saved value as the input value.
    The data will persist on browser refresh and open/close of browser 
    */
    let persistUserInfo = function () {
        return formElems.forEach(function (element) {
            let savedValue = localStorage.getItem(element.id);
            element.value = savedValue;
        })
    }
    /*
    This function deletes all saved data from local storage and user input fields
    */
    let deleteUserInfo = function(event) {
        event.preventDefault();
        return formElems.forEach(function (element) {
            localStorage.removeItem(element.id);
        })
    }

    persistUserInfo();      // Persist user data on load


    document.addEventListener('change', saveUserInfo, false);       // Listens for any change on the input fields
    submitBtn.addEventListener('click', deleteUserInfo, false);     // Listens for click event on subnit button

})();

