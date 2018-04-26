const jwt = require('jsonwebtoken');
const secretkey = 'U)-=aF^(8%hts$oeL#h3/c*+F"p7';  
const customers = {
    chinedu: {
        username: 'chinedu', 
        password: '12323', 
        email: 'email@email.com', 
        userType: 'customer', 
    }
}; 
const caterers = {
    chidiebere: {
        username: 'chidiebere', 
        password: '12323', 
        email: 'email@email.com', 
        userType: 'caterer', 
    }
}; 


function getUser(username, userType){
    if(userType == 'customer') return customers[username]; 
    else if(userType =='caterer') return  caterers[username]; 
}

function createToken(userObj, resp){
    let userType = userObj.userType; 
    if(userType == 'customer')  customers[userObj.username] =userObj; 
    else{
        caterers[userObj.username] =userObj; 
    }  
    jwt.sign({user: userObj},secretkey, (err, token)=> {
        resp.status(201).json({token}); 
    } );
}


function changePassword(username, newPassword, userType){
    if(userType== 'customer') customer[username].password = newPassword; 
    else if(userType== 'caterer') caterers[username].password = newPassword; 
}


function verify(req, resp, next){
    const bearerHeader = req.headers['authorization']; 

    if(typeof bearerHeader!== 'undefined'){
        token = bearerHeader.split(' ')[1]; 
        req.token = token; 
        next(); 
        
    }else{
        resp.status(403).send({
            error: {message:'Restricted to unauthorized users. Provide authentification and try again.'}
        })
    }
}

function exists(user, typeToTest){
    if(user.userType == typeToTest ){
        if(typeToTest == 'customer' && customers[user.username]){
            return  customers[user.username].email == user.email; 
        }else if(typeToTest == 'caterer' && caterers[user.username] ){
            return  caterers[user.username].email == user.email; 
        }
    }
    return false; 
}
function processRequest(req, resp, userType,  callback){
    jwt.verify(req.token, secretkey,(err, authData)=> { 
        if(err){
            resp.status(403).send({
                error: {message: 'Authentification failed'}, 
            })
        }else if(userType == 'both' || authData.user.userType == userType){
            callback(authData.user);
        }else{
            resp.status(403).send({
                error: {message: `Action is unauthorised for ${authData.user.userType}s`}, 
            }) 
        }
    });
}
module.exports = {
    verify, createToken, 
    processRequest, 
    getUser, exists, 
    changePassword, 
}