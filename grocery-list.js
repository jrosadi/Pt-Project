let checkboxContainer = document.getElementById("checkbox-container");
let checkboxes = document.getElementsByName("checklist");

//runs on startup
function init(){
    //immediately fetches checkboxes from localstorage 
    checkboxContainer.innerHTML = localStorage.getItem("checkboxes");

    //updates the state of the button and title of the checklist based on if it's empty or not
    checkListEmpty();
}
 
init();

//get text from form on submit pressed
function formSubmitted(){
    let form = document.getElementById("grocery-input");
    let formText = form.value;

    //check if the form fails(has duplicates or empty space)
    if(checkFormText(formText)){
        return;
    }

    let checkbox = document.createElement('input');
    let label = document.createElement('label');
    let br = document.createElement('br');

    checkbox.type = "checkbox";
    checkbox.value = "value";
    checkbox.name = "checklist";

    label.htmlFor = formText;
    label.textContent = formText;

    //creates a unique id for the checkbox, label, and br based off of the current time
    checkbox.id = Date.now();
    label.id = checkbox.id + "label";
    br.id = checkbox.id + "br";

    //inserts the checkbox and components before the button, which is the last child of the checkboxContainer
    checkboxContainer.insertBefore(checkbox, document.getElementById("update-checklist"));
    checkboxContainer.insertBefore(label, document.getElementById("update-checklist"));
    checkboxContainer.insertBefore(br, document.getElementById("update-checklist"));

    //updates the checkboxes key in localstorage with the current innerhtml of the checkbox checkboxContainer
    localStorage.setItem("checkboxes", checkboxContainer.innerHTML);

    checkListEmpty();
}

function checkFormText(formText){

    //check if nothing has been put in
    if(formText == ""){
        alert("Please enter a grocery item into the form!"); 
        return true;
    }

    //have to use regular for because foreach can't be broken
    //Check for duplicate grocery items
    let checkboxesArray = Array.from(checkboxes);

    for(let i = 0; i < checkboxesArray.length; i++){
        let element = checkboxesArray[i];

        if(document.getElementById(element.id + "label").textContent == formText){
            alert("Grocery Item " + formText + " is already included");
            return true;
        }
    }

    return false;
}

function validate(){        

    //loops through all the items in checkboxes and adds the checked ones to checkeditems array
    let checkedItems = [];
    checkboxes.forEach(item => {
        if (item.checked){
            checkedItems.push(item);
        }
    });

    //remove the elements of checkitems
    checkedItems.forEach(element => {        
        let elementId = element.id;
        
        element.remove();
        document.getElementById(elementId + "label").remove();
        document.getElementById(elementId + "br").remove(); 
    });

    //update localstorage
    localStorage.setItem("checkboxes", checkboxContainer.innerHTML);
    
    checkListEmpty();
}

function checkListEmpty(){
    if(checkboxes.length == 0){
        document.getElementById("grocery-list-title").innerHTML = "No Groceries In List";
        
        document.getElementById("update-checklist").style.visibility = "hidden";
    } else {
        document.getElementById("grocery-list-title").innerHTML = "Grocery List:";

        document.getElementById("update-checklist").style.visibility = "visible";
    }
}


