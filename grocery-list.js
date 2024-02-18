let container = document.getElementById("checkbox-container");
let checkboxes = document.getElementsByName("checklist");

function init(){
    container.innerHTML = localStorage.getItem("checkboxes");

    checkListEmpty();
}
 
init();

//get text from form on submit pressed
function formSubmitted(){
    let form = document.getElementById("grocery-input");
    let formText = form.value;


    //check if nothing has been put in
    if(formText == ""){
        alert("Please enter a grocery item into the form!"); 
        return;
    }

    //have to use regular for because foreach can't be broken
    let checkboxesArray = Array.from(checkboxes);

    for(let i = 0; i < checkboxesArray.length; i++){
        let element = checkboxesArray[i];

        if(document.getElementById(element.id + "label").textContent == formText){
            alert("Grocery Item " + formText + " is already included");
            return;
        }
    }

    let checkbox = document.createElement('input');

    checkbox.type = "checkbox";
    checkbox.name = "checklist";
    checkbox.value = "value";

    checkbox.id = Date.now();
    let label = document.createElement('label');
    label.htmlFor = formText;
    label.textContent = formText;
    label.id = checkbox.id + "label";

    let br = document.createElement('br');
    br.id = checkbox.id + "br";

    container.insertBefore(checkbox, document.getElementById("update-checklist"));
    container.insertBefore(label, document.getElementById("update-checklist"));
    container.insertBefore(br, document.getElementById("update-checklist"));

    localStorage.setItem("checkboxes", container.innerHTML);

    checkListEmpty();
}

function validate(){        
    let checkedItems = [];
    checkboxes.forEach(item => {
        if (item.checked){
            checkedItems.push(item);
        }
    });

    checkedItems.forEach(element => {        
        let elementId = element.id;
        
        element.remove();
        document.getElementById(elementId + "label").remove();
        document.getElementById(elementId + "br").remove(); 
    });

    //update localstorage
    localStorage.setItem("checkboxes", container.innerHTML);
    
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


