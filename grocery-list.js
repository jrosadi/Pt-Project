let checkboxContainer = document.getElementById("checkbox-container");
let checkboxes = document.getElementsByName("checklist");

let moveToTopFunction = function () {
    //remove the button part to just get the id of the checkbox
    let checkboxId = this.id.replace("button", "");

    //"afterbegin" means as the first element, so repositioning the elements as the first ones in the parent container
    checkboxContainer.insertAdjacentElement("afterbegin", document.getElementById(checkboxId + "br"));
    checkboxContainer.insertAdjacentElement("afterbegin", document.getElementById(checkboxId + "button"));
    checkboxContainer.insertAdjacentElement("afterbegin", document.getElementById(checkboxId + "label"));
    checkboxContainer.insertAdjacentElement("afterbegin", document.getElementById(checkboxId));
}
//purpose: initializes the app and immediately updates the checkboxcontainer and checks if the list is empty
//input: checkbox container nodelist
//output: updates current checkbox container as last saved one from localstorage and calls checklistempty function
function init() {

    //immediately fetches checkboxes from localstorage 
    checkboxContainer.innerHTML = localStorage.getItem("checkboxes");

    //loops through all children in an array
    Array.from(checkboxContainer.children).forEach(element => {
        //checks if the element type is a button and the element is not the update button
        if (element.tagName == "BUTTON" && element.id != "update-checklist") {
            //adds the moveToTopFunction to the onclick
            element.onclick = moveToTopFunction;
        }
    });

    //updates the state of the button and title of the checklist based on if it's empty or not
    checkListEmpty();
}

init();


//purpose: get form text and add a new checkbox based on the text
//input: form text
//output: new checkbox, label, br, and updates the checkboxContainer localstorage
function formSubmitted() {
    let form = document.getElementById("grocery-input");
    let formText = form.value;

    //check if the form passes(doesn't have duplicates or empty space)
    if (!checkFormText(formText)) {
        return;
    }

    let checkbox = document.createElement('input');
    let label = document.createElement('label');
    let br = document.createElement('br');
    let button = document.createElement('button');

    checkbox.type = "checkbox";
    button.type = "button";

    checkbox.value = "value";
    checkbox.name = "checklist";

    //adds margin left as a class for formatting
    button.classList.add("ml-10");

    button.onclick = moveToTopFunction;
    label.htmlFor = formText;

    button.textContent = 'Move To Top';
    label.textContent = formText;

    //creates a unique id for the checkbox, label, and br based off of the current time
    checkbox.id = Date.now();
    label.id = checkbox.id + "label";
    br.id = checkbox.id + "br";
    button.id = checkbox.id + "button"

    //inserts the checkbox and components before the button, which is the last child of the checkboxContainer
    checkboxContainer.insertBefore(checkbox, document.getElementById("update-checklist"));
    checkboxContainer.insertBefore(label, document.getElementById("update-checklist"));
    checkboxContainer.insertBefore(button, document.getElementById("update-checklist"));
    checkboxContainer.insertBefore(br, document.getElementById("update-checklist"));

    //updates the checkboxes key in localstorage with the current innerhtml of the checkbox checkboxContainer
    localStorage.setItem("checkboxes", checkboxContainer.innerHTML);

    checkListEmpty();
}

//purpose: check if the user has inputted valid text
//input: formText and checkboxes nodelist as an array
//output: returns true if the user has inputted something valid and returns false if they haven't, alerts them if they have inputted
//something invalid
function checkFormText(formText) {

    //check if nothing has been put in
    if (formText == "") {
        alert("Please enter a grocery item into the form!");
        return false;
    }

    //have to use regular for because foreach can't be broken
    //Check for duplicate grocery items
    let checkboxesArray = Array.from(checkboxes);

    for (let i = 0; i < checkboxesArray.length; i++) {
        let element = checkboxesArray[i];

        if (document.getElementById(element.id + "label").textContent == formText) {
            alert("Grocery Item " + formText + " is already included");
            return false;
        }
    }

    return true;
}

//purpose: update checklist based on if the boxes are checked or not
//input: checkboxes nodelist
//output: removes checked elements and updates localstorage of the checkboxContainer
function validate() {

    //loops through all the items in checkboxes and adds the checked ones to checkeditems array
    let checkedItems = [];

    checkboxes.forEach(item => {
        if (item.checked) {
            checkedItems.push(item);
        }
    });

    //remove the elements of checkitems
    checkedItems.forEach(element => {
        let elementId = element.id;

        element.remove();

        document.getElementById(elementId + "label").remove();
        document.getElementById(elementId + "br").remove();
        document.getElementById(elementId + "button").remove();
    });

    //update localstorage
    localStorage.setItem("checkboxes", checkboxContainer.innerHTML);

    checkListEmpty();
}

// purpose: check if there are no checkboxes and change the state of the grocery list title and button based on that
//input: checkboxes.length
//output: change text of grocery list title and button visibility  
function checkListEmpty() {
    if (checkboxes.length == 0) {
        document.getElementById("grocery-list-title").innerHTML = "No Groceries In List";

        document.getElementById("update-checklist").style.visibility = "hidden";
    } else {
        document.getElementById("grocery-list-title").innerHTML = "Grocery List:";

        document.getElementById("update-checklist").style.visibility = "visible";
    }
}