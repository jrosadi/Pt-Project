//get text from form on submit pressed
function formSubmitted(){
    let form = document.getElementById("grocery-name-input");
    let formText = form.value;

    let container = document.getElementById("checkbox-container");

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
}

function validate(){
    let checkboxes = document.getElementsByName("checklist");
    
    console.log(checkboxes.length);
    
    let checkedItems = [];
    checkboxes.forEach(item => {
        if (item.checked){
            checkedItems.push(item);
        }
    });

    checkedItems.forEach(element => {
        console.log( document.getElementById(element.id + "label").textContent);
        let elementId = element.id;
        element.remove();
        document.getElementById(elementId + "label").remove();
        document.getElementById(elementId + "br").remove();
        
    });
}



