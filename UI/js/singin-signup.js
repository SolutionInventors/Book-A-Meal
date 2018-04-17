function displayForm(formId) {
    let forms = document.querySelectorAll('form');
    for (let form of forms) {
        form.style.visibility = "hidden"; 
    }
    let form = document.getElementById(formId); 
    form.style.visibility = "";

    form.parentElement.prepend(form); 

}
