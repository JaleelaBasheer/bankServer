const users = require('../model/usersSchema');
const jwt = require('jsonwebtoken');
const router = require('../routes/router');

// register logic

exports.register = async(req,res)=>{
    console.log(`Inside register function`);
    // res.status(200).json("Register Request received...")

    // get data from req body
     const {username,acno,password} = req.body


    try{
            // check acno in users model

        const result = await users.findOne({acno})
        if(result){
    // if yes, acno exist,send response as "already exist"
    res.status(406).json("Account already exist...Please Login!!!")

        }
        else{
                // if acno not exist, add to users model,send response as "successfully registered" 
                const newuser = new users({
                    username,acno,password,balance:5000,transactions:[]
                })
                // to save changes to mongodb
               await newuser.save()
            //    send response as "success"
            res.status(200).json(newuser)
        }
}
catch(err){
    res.status(401).json(err)
}
}

//login logic
exports.login = async(req,res)=>{
    // get data from req body
  
    const{acno,password} = req.body

   try {
    // check acno in mongodb
   const bankUser= await users.findOne({acno})
   if(bankUser){
    // user already exist--login success
const token = jwt.sign({loginAcno:acno},"supersecretkey12345")

    res.status(200).json(
        {
        loginUser:bankUser,token
    })

   }
   else{
    res.status(404).json("Invalid account or Password")
   }
}
catch(err){
    res.status(401).json(err)
}


}

// get balance

exports.getbalance = async(req,res)=>{

    // get acno from req
    const {acno} = req.params
    // check acno is exist
    try{
       
        const response= await users.findOne({acno})
        if(response){
            // acno exist
            res.status(200).json(response.balance)
        }
        else{
            res.status(404).json("Account not found")
 
        }

    }
    catch(err){
        res.status(401).json(err)

    }
}
// fund transfer
exports.fundtransfer = async(req,res)=>{
    console.log("Inside fund transfer");

    // debit acno
    const {loginData} = req
    console.log(loginData);
//         // get data from req:credit acno and amount
       const {creditacno,amount}=req.body
       let amt = Number(amount)

   try {//    check debit acno in mongodb
    const debituser = await users.findOne({acno:loginData})
    console.log(debituser);

    // check credit user detail
    const credituser= await users.findOne({acno:creditacno})
    console.log(credituser);


    if(loginData==creditacno){
        res.status(406).json("Operation denied")
    }
    else{

        if(credituser){
            // sufficient balance for debit user
            console.log("Check sufficient balance");
    
            if(debituser.balance>= amt){
                console.log("Sufficient balance");
               
                debituser.balance-=amt
                debituser.transactions.push({
                    transaction_type:"DEBIT",amount:amt,toAcno:creditacno,fromAcno:loginData
                })
                await debituser.save()
                credituser.balance+=amt
                credituser.transactions.push({
                    transaction_type:"CREDIT",amount:amt,toAcno:creditacno,fromAcno:loginData
                })
            
                await credituser.save()
                res.status(200).json("Transaction completed successfully..You can perform next transaction after sometime!!!")
            }
           
            else{
                res.status(406).json("Insufficient Balance!!!")    

            }
            
        }
        else{
            res.status(404).json("Transaction failed...Invalid credit account details!!!!")

        }
    }

   
}
catch(err){
    res.status(401).json(err)

}
}

// transactions


exports.gettransactions = async (req,res)=>{
    console.log("Inside transaction Function");
    // get account number to fetch transaction

    const { loginData }= req

    // get all details from mongoDb

    try{
        const userDetails = await users.findOne({acno:loginData})
        if (userDetails){

            const {transactions} = userDetails

            console.log(transactions);
            res.status(200).json(transactions)

        }
        else{
            res.status(404).json("Invalid account details")
        }

    }
    catch(err){
        res.status(401).json()

    }
}

// delete account

exports.deleteAcno = async(req,res)=>{

    // get login data from token
    const { loginData }= req

    try{
       await users.deleteOne({acno:loginData})
       res.status(200).json("Account removed successfully!!!! ")

    }
    catch(err){
        res.status(401).json(err);
    }


}
