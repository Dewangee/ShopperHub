
function addProduct(nameadd, manuadd, priceadd, done){
    $.post('/api/products', {
        name : nameadd,
        manufacturer : manuadd,
        price : priceadd,
    }, 
    function(data){
        done(data)
    })
}

$(function () {
    let nameadd = $('#nameadd')
    let manuadd = $('#manuadd')
    let priceadd = $('#priceadd')

    $('#submitadd').click(function () {
       addProduct(
            nameadd.val(),
            manuadd.val(),
            priceadd.val(),
            function (product) {
                var  wel = document.createElement('div');
                wel.className = "alert alert-success";
                wel.innerHTML= "Product added successfully."
                document.getElementById("add_div").appendChild(wel);
            })
       
    })
})
