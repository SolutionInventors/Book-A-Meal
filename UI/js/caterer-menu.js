let existingMealOptions = [
    { name: 'Rice', amount: 2000 }, 
    { name: 'Beans', amount: 1000 }, 
    { name: 'Bananas', amount: 200 }, 
    {name: 'Foofoo', amount: 1500}, 
]; 
let itemsMap = new Map();
existingMealOptions.forEach((item) => {
    itemsMap.set(item.name, item.amount); 
}); 
function initList(){
    console.log('Entered!');
    let ul = document.getElementById('existing-meal-ul');
    console.dir('ul = ' + ul);
    for (let [name, amount] of itemsMap.entries()) {
        let li = document.createElement('li');

        let innerHTML = `<label>${name} <span>${amount} </span></label><label for="${name}-checkbox"></label> <input id="${name}-checkbox" type="checkbox" name="selectedMeal" value="${name}" />`;
        li.innerHTML = innerHTML;
        console.dir('ul = ' + ul);
        ul.append(li);
    }

    let buttons = document.getElementsByTagName('button'); 
    for (let button of buttons) {
        button.disabled = true; 
    }
    
} 


function updateRoute(event) {
    const route = `/${event.target.id.split('-button')[0]}`; 
    
    document.getElementById('crud-form').action = '#';
    console.log(route); 
}

function highlightItem(event) {
    let total = 0; 
    for (let checkbox of event.currentTarget.querySelectorAll('input[name=selectedMeal]')) {
        checkbox.parentElement.className = "";
    }
    let checkboxes = event.currentTarget.querySelectorAll('input[name=selectedMeal]:checked');
    

    for (let checkbox of checkboxes) {
        checkbox.parentElement.className = "item-selected";
        total += itemsMap.get(checkbox.value); 
    }
    
    let selectedItems = checkboxes.length;
    console.dir('selecetedItems= ' + selectedItems);
   
    if (selectedItems == 1){
        document.getElementById('modify-button').disabled=false; 
        document.getElementById('delete-button').disabled = false;
        document.getElementById('create-menu-button').disabled = false;

    } else if (selectedItems > 1){
        document.getElementById('modify-button').disabled=true; 
    }else{
        document.getElementById('modify-button').disabled=true; 
        document.getElementById('delete-button').disabled = true;
        document.getElementById('create-menu-button').disabled = true; 
    }

    
    document.getElementById('total-amount').textContent = total;
    document.getElementById('selected-item').textContent = `Selected Items: ${selectedItems}`

    
}

function updateAddStatus(event) {
   let textboxes =  event.currentTarget.querySelectorAll('input[type=text]'); 

   for (let box of textboxes) {
       if (box.value == "") {
           document.getElementById('add-button').disabled = true; 
           return;
       }

   }
   document.getElementById('add-button').disabled = false; 
}