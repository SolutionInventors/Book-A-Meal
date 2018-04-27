function viewDetails(event, detailType) {
    hideDetails = !hideDetails;
    if (hideDetails) event.target.textContent = `Edit`;
    else {
        event.target.textContent = `Hide`;
    }
    document.getElementById('details').hidden = hideDetails;

}
