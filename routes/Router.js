const bcrype =require('bcrypt');
class Router {
    constructor( app,db){
        this.login(app,db);
        this.logout(app,db);
        this.isLoggedIn(app,db);
        this.getborrowers(app,db);
        this.getbooks(app,db);
        this.addborrower(app,db);
        this.addbook(app,db);
        this.editbook(app,db);
        this.editborrower(app,db);
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
    getborrowers(app,db){
        app.post('/getborrowers',async (req,res)=>{
            console.log('requesting for borrowers');
            //let msg =[];
            await db.query(
                "select * from borrowers",
                (err, result) => {
                  if (err) throw err;
                  //console.log(result);
                  res.json({
                    success:true,
                    msg: result
                })
                }
              );
            
        })
    }

    addborrower(app,db){
        app.post('/addborrower',async (req,res)=>{
            console.log('requesting to add borrower');
            const name = req.body.borrower_name;
            const address = req.body.address;
            const phn = req.body.phn;
            await db.query(
                `insert into borrowers (borrower_name, address, phn) values (? ,? ,?)`,
                [name,address,phn],
                (err, result) => {
                  if (err) throw err;
                  //console.log(result);
                  res.json({
                    success:true
                })
                }
              );
            
        })
    }

    getbooks(app,db){
        app.post('/getbooks',async (req,res)=>{
            console.log('requesting for books');
            //let msg =[];
            await db.query(
                "select * from books",
                (err, result) => {
                  if (err) throw err;
                  //console.log(result);
                  res.json({
                    success:true,
                    msg: result
                })
                }
              );
            
        })
    }
    addbook(app,db){
        app.post('/addbook',async (req,res)=>{
            console.log('requesting to add borrower');
            const name = req.body.book_name;
            const author = req.body.author;
            const yop = req.body.yop;
            const publisher = req.body.publisher;
            const quantity= req.body.quantity;
            const avaliable = req.body.quantity;    //time of adding avaliableis same as quantity
            await db.query(
                `insert into books (book_name, author, yop, publisher, quantity, avaliable) values (? ,? ,? ,? ,? ,?)`,
                [name,author,yop,publisher,quantity,avaliable],
                (err, result) => {
                  if (err) throw err;
                  //console.log(result);
                  res.json({
                    success:true
                })
                }
              );
            
        })
    }
    editbook(app,db){
        app.post('/editbook',async (req,res)=>{
            console.log('requesting to edit book');
            const id=   req.body.book_id;
            const name = req.body.book_name;
            const author = req.body.author;
            const yop = req.body.yop;
            const publisher = req.body.publisher;
            await db.query(
                `update books set book_name=?, author=?, yop=?, publisher=?  where book_id=?`,
                [name,author,yop,publisher,id],
                (err, result) => {
                  if (err) throw err;
                  //console.log(result);
                  res.json({
                    success:true
                })
                }
              );
            
        })
    }
    editborrower(app,db){
        app.post('/editborrower',async (req,res)=>{
            console.log('requesting to edit borrower');
            const {borrower_id:id,borrower_name:name,address,phn}=req.body;
            await db.query(
                `update borrowers set borrower_name=(?), address=(?), phn=(?)  where borrower_id=(?)`,
                [name,address,phn,id],
                (err, result) => {
                  if (err) throw err;
                  //console.log(result);
                  res.json({
                    success:true
                })
                }
              );
            
        })
    }
}
module.exports =Router;