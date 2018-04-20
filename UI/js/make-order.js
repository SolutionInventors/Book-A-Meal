let itemsMap = getExistionMealOptions(); 


function handleSelectEvent(event) {
    let itemObj = getSelectedItems(event);

    if (itemObj.selectedItems > 0) {
        document.getElementById('order-button').disabled = false;
    } else {
        document.getElementById('order-button').disabled = true;
    }
    
   
}