let currentUser = "customer";
function displayForm(formId) {
    let forms = document.querySelectorAll('form');
    for (let form of forms) {
        form.hidden = "hidden"; 
    }
    let form = document.getElementById(formId); 
    form.hidden= "";

    form.parentElement.prepend(form); 

}

function verifyInput(event) {
   
   
    let id = event.target.id; 
    if (verifyInputHelper(id)) {
        let elemCollection = event.target.elements;
        if (id == "login-form" || "signup-form") {
            
            if (elemCollection.username.value == "Chidiebere" &&
                elemCollection.password.value == "chichi") {
                return;
            }
        } 
        
    }
    event.preventDefault();
    event.stopPropagation();
    

}
    

    function verifyInputHelper(formId) {
        let inputs = document.getElementById(formId).querySelectorAll('input');
        for (input of inputs) {
            if (input.value == "") {
                input.className = "missing-input";
                console.dir(input.className); 
                input.placeholder = `Forgot to input ${input.name}`;
                return false;
            } else {
                input.className = "";
            }
        }
        return true; 
    }
    
