function getExistionMealOptions(){
	let existingMealOptions = [ //this array should be retrieved from a database
	    { name: 'Rice', amount: 2000 }, 
	    { name: 'Beans', amount: 1000 }, 
	    { name: 'Bananas', amount: 200 }, 
	    {name: 'Foofoo', amount: 1500}, 
	]; 
	let itemsMap = new Map();
	existingMealOptions.forEach((item) => {
	    itemsMap.set(item.name, item.amount); 
	}); 

	return itemsMap; 
}


function initList(event, addType = 'append'){
    console.log('Entered!');
    let ul = document.getElementById('existing-meal-ul');
    console.dir('ul = ' + ul);
    for (let [name, amount] of itemsMap.entries()) {
        let li = document.createElement('li');

        let innerHTML = `<label>${name} <span>${amount} </span></label><label for="${name}-checkbox"></label> <input id="${name}-checkbox" type="checkbox" name="selectedMeal" value="${name}" />`;
        innerHTML = `<label for="${name}-checkbox">${name} <span>${amount} </span></label>
                <div class="checkbox">
                    
                    <input id="${name}-checkbox" type="checkbox" name="selectedMeal" value=${name} />
                    <label for="${name}-checkbox"></label>
                </div>`

        li.innerHTML = innerHTML;
        console.dir('ul = ' + ul);
        if (addType == 'prepend') {
            ul.prepend(li);
        } else {
            ul.append(li);
        }
       
    }

    let buttons = document.getElementsByTagName('button'); 
    for (let button of buttons) {
        button.disabled = true; 
    }
    
} 

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    let regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);

    let results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function getSelectedItems(event) {
    let total = 0;
    for (let checkbox of event.currentTarget.querySelectorAll('input[name=selectedMeal]')) {
        checkbox.parentElement.parentElement.className = "";
    }
    let checkboxes = event.currentTarget.querySelectorAll('input[name=selectedMeal]:checked');


    for (let checkbox of checkboxes) {
        checkbox.parentElement.parentElement.className = "item-selected";
        total += itemsMap.get(checkbox.value);
    }

    let selectedItems = checkboxes.length;
    console.dir('selecetedItems= ' + selectedItems);
    
    return { selectedItems, total };

}