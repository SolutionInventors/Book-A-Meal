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

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    let regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);

    let results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

console.log(getParameterByName("name", "?name=John")); 

