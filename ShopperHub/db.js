const sequelize = require('sequelize')

const db = new sequelize('catalog', 'shopper', '',{
    host : 'localhost',
    dialect : 'mysql',
    pool : {
        min :0,
        max : 5,
    }
})

const User = db.define('users',{
    id : {
        type : sequelize.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },
    name: {
        type : sequelize.STRING,
        allowNull : false
    },
    username:{
        type : sequelize.STRING,
        allowNull : false
    },
    password:{
        type : sequelize.STRING,
        allowNull : false
    },
    admin:{
        type : sequelize.BOOLEAN
    }
})

const Product = db.define('products',{
    id: {
        type : sequelize.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },
    name : {
        type : sequelize.STRING,
        allowNull : false
    },
    manufacturer : sequelize.STRING,
    price: {
        type : sequelize.FLOAT,
        allowNull : false,
        defaultValue : 0.0
    }

})

const Cart = db.define('carts', {
    userid : {
        type : sequelize.STRING,
    },
    productid : {
        type : sequelize.STRING,
    },
    quantity : {
        type : sequelize.INTEGER,
    }
})

db.sync()
    .then( ()=> console.log("Database has been synced"))
    .catch((err)=> console.log("Error creating database sync"))

exports = module.exports ={
    User, Product, Cart
}