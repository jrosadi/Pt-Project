//get text from form on submit pressed
function formSubmitted(){
    let form = document.getElementById("grocery-name-input");
    let formText = form.value;

    let container = document.getElementById("checkbox-container");

    let checkbox = document.createElement('input');

    checkbox.type = "checkbox";
    checkbox.name = "checklist";
    checkbox.value = "value";
    checkbox.id = formText;

    let label = document.createElement('label');
    label.htmlFor = formText;
    label.textContent = formText;

    let br = document.createElement('br');

    container.insertBefore(checkbox, document.getElementById("update-checklist"));
    container.insertBefore(label, document.getElementById("update-checklist"));
    container.insertBefore(br, document.getElementById("update-checklist"));
}

function validate(){


}



