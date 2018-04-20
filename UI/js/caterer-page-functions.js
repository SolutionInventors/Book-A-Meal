let itemsMap = getExistionMealOptions(); 


function updateRoute(event) {
    const route = `/${event.target.id.split('-button')[0]}`; 
    
    document.getElementById('crud-form').action = '#';
    console.log(route); 
}

function highlightItem(event) {
    let itemObj = getSelectedItems(event);
    if (itemObj.selectedItems == 1) {
        document.getElementById('modify-button').disabled=false; 
        document.getElementById('delete-button').disabled = false;
        document.getElementById('create-menu-button').disabled = false;

    } else if (itemObj.selectedItems > 1) {
        
        document.getElementById('modify-button').disabled=true; 
    }else{
        document.getElementById('modify-button').disabled=true; 
        document.getElementById('delete-button').disabled = true;
        document.getElementById('create-menu-button').disabled = true; 
    }

    
    document.getElementById('total-amount').textContent = itemObj.total;
    document.getElementById('selected-item').textContent = `Selected Items: ${itemObj.selectedItems}`

    
}

function updateStatus(event, buttonId= 'add-button') {
   let textboxes =  event.currentTarget.querySelectorAll('input[type=text]'); 

   for (let box of textboxes) {
       if (box.value == "") {
           document.getElementById(buttonId).disabled = true; 
           return;
       }

   }
   document.getElementById(buttonId).disabled = false; 
}