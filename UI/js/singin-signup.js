let currentUser = 'customer';

window.addEventListener('load', () => {
	currentUser = getParameterByName('user');
	if(currentUser == 'caterer'){
		let anchors = document.querySelectorAll('a[name=signup]'); 
		for(let anchor of anchors){
			anchor.parentElement.remove();  
		}
		document.querySelector('form').action= 'caterer-page.html'; 
	}else{
		document.querySelector('form').action= 'today-menu-page.html'; 
	}
}); 

function handleClick(event){
	if(event.target.tagName.toUpperCase() == 'A'){
		let name = event.target.name; 
		document.body.className =`signinsignup ${name}`; 
	}
    
}