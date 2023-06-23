const express=require('express')
const jwt=require('jsonwebtoken')


module.exports=async(req,res)=>{

        const {usename,password}=req.body;
        if(usename =="" && password ==""){
            res.status(403).json({

                error:'invalid login'
            })
        }
        const token=jwt.sign({usename},'Raissi',{expiresIn:'1s'});  
        res.cookie('token',token,{
            httpOnly: true,
        })
        // token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODc0NDAyMTMsImV4cCI6MTY4NzQ0MzgxM30.LCpIOzMrH2iWzD8TOIGt5p2FDGHR0Gqfacj_kw0xNI4 
        return res.redirect('/wellcome')


}