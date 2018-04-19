
window.addEventListener('load', () => {
    let user = getParameterByName('user');
    user = user ? user : "customer"; 
    document.getElementById(`${user}-actions`).hidden = "hidden";
}); 