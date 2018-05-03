window.addEventListener('load', (event)=> {

    let divs   = document.querySelectorAll('.confirm-controls'); 
    for(let div of divs){
        div.hidden = "hidden"; 
    }
    if(getParameterByName('modify')){
        
    }else if(getParameterByName('delete')){

    }else{

    }
});