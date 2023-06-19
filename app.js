const express=require('express')
const jwt=require('jsonwebtoken')

const app=express();

app.get('/',(req,res)=>{
        res.json({
            message: 'Wellcome to the API',
        })
})

app.post('/api/post',verifyToken,(req,res)=>{
    jwt.verify(req.token,'secretkey',(err,authData)=>{
            if(err) res.sendStatus(404)
            res.json({
                message: 'Wellcome to the API',
                authData   
                /*
                        {
            "message": "Wellcome to the API",
            "authData": {
                "user": {
                    "id": 1,
                    "username": "Raissi Anass",
                    "email": "anass@raissi.com"
                },
                "iat": 1687092837  //time stamp
    }*/
                
                
            })
    })

})
app.post('/api/login',(req,res)=>{
        //mock user
        const user={
            id: 1,
            username:'Raissi Anass',
            email:'anass@raissi.com',   
        }
        jwt.sign({user},'secretkey',(err,token)=>{
            res.json({
                token
            })
        })
})

//format of token 
// Authorisation bearer <access_token >


//verify token

function verifyToken(req,res,next){
        const bearerHeader=req.headers['authorization']  
/* The HTTP Authorization request 
    header can be used to provide credentials that authenticate a user agent with a server
*/

        //check if bearer is undefined
        if(typeof bearerHeader !='undefined'){
                //split at the space
            const bearer=bearerHeader.split(' ');
            //get token from array
            const bearerToken=bearer[1];  //index 0 => 'token' , index 1 => token value
            //set the token
            req.token=bearerToken;
            //next
            next();
        }       
        else{
            res.sendStatus(403)  // forbidden
        }
}

app.listen(5000,()=>console.log('Server started on port 5000'))
