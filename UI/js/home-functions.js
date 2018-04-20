
window.addEventListener('load', () => {
    let user = getParameterByName('user');
    let hideDiv = user == "caterer"? "customer": "caterer"; 
    document.getElementById(`${hideDiv}-actions`).hidden = "hidden";
}); 