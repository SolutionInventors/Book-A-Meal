function handleSubmit(event){
	let simpleButtons = event.currentTarget.querySelectorAll('button[type=button]'); 
	for(button of simpleButtons){
		button.hidden = ''; 
	}
	let submitButton = event.currentTarget.querySelector('button[type=submit]'); 
	submitButton.hidden = 'hidden'; 
	event.preventDefault(); 
	event.stopPropagation(); 
}

function handleClick(event){
	let simpleButtons = event.currentTarget.querySelectorAll('button[type=button]'); 
	for(button of simpleButtons){
		button.hidden = 'hidden'; 
	}
	let submitButton = event.currentTarget.querySelector('button[type=submit]'); 
	submitButton.hidden = ''; 
	
	
}