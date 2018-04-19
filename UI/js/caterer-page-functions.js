let itemsMap = getExistionMealOptions(); 


function updateRoute(event) {
    const route = `/${event.target.id.split('-button')[0]}`; 
    
    document.getElementById('crud-form').action = '#';
    console.log(route); 
}

function highlightItem(event) {
    let total = 0; 
  
    let checkboxes = event.currentTarget.querySelectorAll('input[name=selectedMeal]:checked');
    for (let checkbox of event.currentTarget.querySelectorAll('input[name=selectedMeal]')) {
        checkbox.parentElement.parentElement.className = "";
    }

    for (let checkbox of checkboxes) {
        checkbox.parentElement.parentElement.className = "item-selected";
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