let transactions = [{
    customer: 'Johnny Cage', 
    itemsBought: [
        { meal: 'Rice', cost: 3200 }, 
        { meal: 'Beans', cost: 4000 }, 
        { meal: 'Garri', cost: 1000 }, 
        { meal: 'Nkwobi', cost: 800 }, 
    ], 
    date: new Date(),
},
{
        customer: 'Jedu Kn',
        itemsBought: [
            { meal: 'Cheese', cost: 3200 },
            { meal: 'Burger', cost: 4000 },
            { meal: 'Tiwo', cost: 1000 },
            { meal: 'Nkwobi', cost: 800 },
        ],
        date: new Date(),
    },
{
    customer: 'Somto Ogene',
    itemsBought: [
        { meal: 'Plantain', cost: 5200 },
        { meal: 'Egg', cost: 500 },
        { meal: 'French Fries', cost: 7000 },
        { meal: 'Nkwobi', cost: 800 },
    ],
    date: new Date(2018, 0, 1),
}];
let transactionsMap = new Map(); 
let hideDetails = true; 

window.addEventListener('load', (e) => {
    transactions.forEach((item) => {
        transactionsMap.set(item.customer, item);
    });
    document.getElementById('details').hidden = hideDetails; 
}); 

function viewDetails(event, detailType) {
    hideDetails = !hideDetails;
    if (hideDetails) event.target.textContent = `View Details`;
    else {
        event.target.textContent = `Hide Details`
    }
    document.getElementById('details').hidden = hideDetails;

}

function displayHistory(ulId, date = new Date()) {
    document.getElementById(ulId).innerHTML = "";
    let transArr =
        [...transactionsMap.values()]
            .filter((item) =>
                item.date.getFullYear() == date.getFullYear() &&
                item.date.getMonth() == date.getMonth() &&
                item.date.getDate() == date.getDate());
    console.log(transArr.length);
    let dayTotal = 0; 
    transArr.forEach((transObj) => {
        let transDate = transObj.date;
       
        let ul = document.createElement('ul');
        let historyItem = document.createElement('li');
        historyItem.innerHTML = `<h3>Details of order made by ${transObj.customer} at ${getTimeHelper(date)}</h3 >`;
        let total = 0;
        historyItem.style.backgroundImage = 'url()'; 

        ul.className = "meal-list";
        ul.append(historyItem); 
        
        transObj.itemsBought.forEach((item) => {
            let li = document.createElement('li');
            li.textContent = `${item.meal} ${item.cost}`;
            ul.append(li);
            total += item.cost;
        });

        let li = document.createElement('li');
        li.innerHTML = `<em>Total:  ${total}<em>`;
        ul.append(li);
        let finalDiv = document.createElement('div'); 
        finalDiv.className = "history-details"; 
        finalDiv.append(ul); 
        document.getElementById(ulId).append(finalDiv); 
       dayTotal += total; 
    });
    document.getElementById('revenue').textContent = dayTotal;
    document.getElementById('transaction-heading').textContent = `Summary of transactions for ${date.toDateString()}`;
    return transArr.length; 

    function getTimeHelper(date) {
        let hours = date.getHours(); 
        let mins = date.getMinutes(); 

        mins = mins > 9 ? mins : "0" + mins; 
        hours = hours > 9 ? hours : "0" + hours; 
        return `${hours}:${mins} GMT`; 
    }
}

function handleDateChange(event) {
    let selectedDate = new Date(event.target.value);
    let itemsInserted = displayHistory('details', selectedDate); 
    document.getElementById('view-details-button').disabled = !itemsInserted;
    document.getElementById('total-orders').textContent = itemsInserted; 
}
