const Cart = require('../../db').Cart
const Product = require('../../db').Product
const route = require('express').Router()


route.get('/',(req,res)=>{
    let userid = (req.query.userid)
    Cart.findAll({
        where :{
            'userid' : userid
        }

    })  //sends all users in an array
        .then((carts)=>{
            console.log(carts.length)
            let arr = []
            let total =0
            for (let i=0; i<carts.length; i++)
            {
                let q = carts[i]["quantity"]
                let pid = carts[i]["productid"]
                
                Product.findAll({
                    where :{
                        'id' : pid
                    }
                })
                    .then((prod)=>{
                       total = total+q*prod[0]["price"]
                       arr.push([prod[0]["name"], prod[0]["price"], q, q*prod[0]["price"],total])
                        
                        if (carts.length==(i+1)){
                            
                            res.status(200).send(arr)
                        }
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
                
            }
        })
        .catch((err)=>{
            res.status(500).send({
                error : "Could not retrieve carts"
            })
        })
})


route.post('/', (req,res)=>{

    let userid = (req.body.userid)
    let productid =  (req.body.productid)

    Cart.findAll({
        where: {
            'userid' : userid,
            'productid' : productid
        }
    })
    .then((cart)=>{
        if(JSON.stringify(cart)==="[]"){
            Cart.create({
                userid : userid,
                productid :productid,
                quantity : 1
            })
            .then((cart)=>{
                res.status(201).send(cart)
            })
            .catch((err)=>{
                res.status(501).send({
                    error : "Could not add new cart value"
                })
            })

        }
        else{
            let q = cart[0]["quantity"]
            q++
            cart[0].update({
                quantity: q 
            }).then(()=>{

            })
        }
    
    })
    .catch((err)=>{
        
        console.log(err)
    })
   
})

exports = module.exports = route