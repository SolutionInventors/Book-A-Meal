'use strict'; 
window.addEventListener('load', ()=> {
	let divs   = document.querySelectorAll('.confirm-controls'); 
	for(let div of divs){
		div.hidden = 'hidden'; 
	}
	if(getParameterByName('modify')){
		document.body.className = 'confirm-page manage-meals modify-page'; 
	}else if(getParameterByName('delete')){
		document.body.className = 'confirm-page manage-meals delete-page'; 
	}else if(getParameterByName('create')){
		document.body.className = 'confirm-page create-meal create-page'; 
	}else if(getParameterByName('buy')){
		document.body.className = 'customer confirm-page make-order-page order-meals'; 
	}else if(getParameterByName('modify')){
		document.className = 'customer confirm-page modify-order-page';
	}
	else{
		document.body.className = 'confirm-page invite-caterer'; 
	}
});

function handleImageChange(event){
	let image = event.target.files[0];
	let imgElem = event.currentTarget.querySelector('img'); 
	imgElem.src = URL.createObjectURL(image); 
}