const User = require('../../db').User
const route = require('express').Router()

route.get('/',(req,res)=>{
    User.findAll()  //sends all users in an array
        .then((users)=>{
            res.status(200).send(users)
        })
        .catch((err)=>{
            res.send(500).send({
                error : "Could not retrieve users"
            })
        })
})

route.post('/', (req,res)=>{
    User.create({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        admin: req.body.admin
    })
    .then((user)=>{
        res.status(201).send(user)
    })
    .catch((err)=>{
        res.status(501).send({
            error : "Could not add new user"
        })
    })
})

exports = module.exports = route