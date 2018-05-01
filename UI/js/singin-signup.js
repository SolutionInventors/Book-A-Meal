let currentUser = "customer";

window.addEventListener('load', () => {
    let action = getParameterByName('action'); 
    displayForm(`${action}-form`);
    currentUser = getParameterByName('user');
    
    currentUser = currentUser ? currentUser : "customer"; 
        
    let inputs = document.querySelectorAll(`input[type=hidden]`);
    for (let input of inputs) {
        input.value = currentUser;
    }
    if(currentUser== "caterer"){
        let links = document.querySelectorAll('li[name=signup-li'); 
        for(let link of links  ){
            link.hidden="hidden"; 
        }
    }
}); 

function handleClick(event){
    if(event.target.tagName.toUpperCase() == "A"){
        let name = event.target.name; 
        document.body.className =`signinsignup ${name}`; 
    }
    
}
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
       event.target.action = `home.html?user=${currentUser}`;
       return;  
    }
    event.preventDefault();
    event.stopPropagation();
    

}
    

function verifyInputHelper(formId) {
    console.log(formId); 
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
    
