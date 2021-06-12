const bcrype =require('bcrypt');
class Router {
    constructor( app,db){
        this.login(app,db);
        this.logout(app,db);
        this.isLoggedIn(app,db);
    }
    login(app,db){
        app.post('/login',(req,res)=>{
            let username =req.body.username.toLowerCase();
            let password = req.body.password;
            if(username.length >0 && password.length >0){
                res.json({
                    success:true,
                    msg:'Login Success'
                })
            }else{
                res.json({
                    success:false,
                    msg:'Wrong Username or Password'
                })
            }
        })
    }
    logout(app,db){
        app.post('/logout',(req,res)=>{
            console.log('requested logout');
            res.json({
                success:true,
                msg:'Login Success'
            })
        })
    }
    isLoggedIn(app,db){
        app.post('/isLoggedIn',(req,res)=>{
            console.log('requested login check');
            res.json({
                success:true,
                msg:'Login Success'
            })
        })
    }
}
module.exports =Router;