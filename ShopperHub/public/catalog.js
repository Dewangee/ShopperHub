
function getProducts(done){
    $.get('/api/products', (data) =>{
        done(data)
    })
}



function addtocart(){
    let btn = $('button')
    console.log(btn)
    for (let i=0; i<btn.length;i++){
        btn[i].onclick = function(event){
            let productid = event.target.id
            console.log(productid)
            let userid= JSON.parse(localStorage.getItem("key"))
            $.post('/api/carts',{
                'userid': userid,
                'productid': productid
            }, function(data){
                console.log(data)
            })

        }
    }
}




function createProductCard(product){
    return $(`
    <div class="col-md-3  card" style="border: 10% ; margin : 3%; text-align: center; background-color: dimgrey; "  > 
    <div class = "card-body" style=" text-decoration-color: white;">
    <h3 class= "card-title"> ${product['name']} </h3>
    <span class="card-text" style="display:block; "> ${product['manufacturer']} </span>
    <span class="card-text" style="display:block; font-weight:bold ; margin-top: 1%"> Rs. ${product['price']} </span>
    <center>
    <button class = "btn btn-class" style="display:block;margin-top: 1%; margin-bottom: 3%" id=${product["id"]}> Add to cart </button>
    </center>
    </div>
    </div>
    `)
}


$(()=>{
    let productdiv = $('#productdiv')
    getProducts((products)=>{
        productdiv.empty();
        for (product of products){
            productdiv.append(createProductCard(product))
        }
        addtocart()
    })
})