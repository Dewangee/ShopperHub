function getuserid(){
    var k =  JSON.parse(localStorage.getItem("key"));
    return k
 }

function getCarts(done){
   $.get('/api/carts',{
       userid : getuserid()
   },(data)=>{
        done(data)
    })
}

function createCart(cart){

     return $(`
    <tr>
    <td>${cart[0]}</td>
    <td>${cart[1]}</td>
    <td>${cart[2]}</td>
    <td>${cart[3]} </td>
  </tr>
  `)
  
}



$(()=>{
    let tablecart = $('#tablecart')

    getCarts((carts)=>{
        console.log(carts)
        for (cart of carts){
           tablecart.append(createCart(cart))
        }
        $('#totalval').text(
            carts[carts.length-1][4]
        )
    
    })
})


