let itemsMap = getExistionMealOptions(); 

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
   
    if (selectedItems >= 1) {
        if (event.currentTarget.id == "order-list") {
            document.getElementById('remove-from-list-button').disabled = false;
        } else {
            document.getElementById('add-to-list-button').disabled = false;
        }

    } else {
        document.getElementById('remove-from-list-button').disabled = true;
        document.getElementById('add-to-list-button').disabled = true;
    }

    
}

function updateOrderList(event) {
    let id = event.target.id.split('-button')[0]; 
      
    if (id == "add-to-list") {
        moveCheckboxHelper('existing-meal-ul', 'order-list');
        document.getElementById('add-to-list-button').disabled = true;
        
    } else if (id == "remove-from-list") {
        moveCheckboxHelper('order-list', 'existing-meal-ul'); 
        document.getElementById('remove-from-list-button').disabled = true;

    }

    function moveCheckboxHelper(fromDiv, toDiv){
        let selectedBoxes = document.getElementById(fromDiv)
                            .querySelectorAll('input[type=checkbox]:checked'); 

        for (let checkbox of selectedBoxes) {
           let li = checkbox.parentElement; 
           document.getElementById(toDiv).append(li); 
           checkbox.checked = false; 
           
           li.className = ""; 
            document.getElementById('total-amount').textContent = 0; 
        }

        let orderList = document.getElementById('order-list').querySelectorAll('input[type = checkbox]');
        console.dir(orderList); 
        if (orderList.length > 0) {
            let total = 0;
            for (let checkbox of orderList) {
                total += itemsMap.get(checkbox.value);
            }
            document.getElementById('total-amount').textContent = total;
            document.getElementById('order-button').disabled = false; 
        } else {
            document.getElementById('order-button').disabled = true; 
        }
        
    }
}


