let currentUser = "customer";

window.onload(() => {
    let formType = getParameterByName('form'); 
    displayForm(`${formType}-form`); 
}); 
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
            
            if (elemCollection.username.value == "Customer" &&
                elemCollection.password.value == "customer") {
                elemCollection.user.value = "customer";
                return;
            } else if (elemCollection.username.value == "Caterer" &&
                elemCollection.password.value == "caterer") {
                elemCollection.user.value = "caterer";
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
            if (input.value == "" && input.type != "hidden") {
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
    
