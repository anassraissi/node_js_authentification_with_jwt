const jwt=require('jsonwebtoken');

module.exports=(req,res,next)=>{
const token=req.cookies.token;
try{
        const user=jwt.verify(token,'Raissi')
       return res.redirect('wellcome')
}
catch(err){
    res.clearCookie('token');
    return res.redirect('/login');
}
        

}