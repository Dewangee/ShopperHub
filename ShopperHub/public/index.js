function addUser(namereg, usernamereg, passwordreg, adminreg, done){
    $.post('/api/users', {
        name : namereg,
        username : usernamereg,
        password : passwordreg,
        admin : adminreg

    }, function(data){
        done(data)
    })

}

function getUsers(done){
    $.get('/api/users', (data) =>{
        done(data)
    })
}

function redirect(link){
    window.location.href =link;
}

$(function () {
    let namereg = $('#namereg')
    let usernamereg = $('#usernamereg')
    let passreg = $('#passreg')
    let adminreg = document.getElementById("adminreg")
    let usernamelogin = $('#usernamelogin')
    let  passlogin = $('#passlogin')

  
    $('#submitreg').click(function () {
       addUser(
            namereg.val(),
            usernamereg.val(),
            passreg.val(),
            adminreg.checked,
            function (user) {
                window.alert("Added " + user.name + " to Database")
            }
        )
       
    })

    $('#submitlogin').click(function(){
        getUsers( (users)=>{
            for (user of users){
               if (user["username"] == usernamelogin.val() ){
                    if (user["password"] == passlogin.val()){
                        localStorage.setItem("key", JSON.stringify(user["id"]))
                        if (user["admin"]==true){
                            redirect("./add.html")
                        }
                        else{
                            redirect("./catalog.html")
                        }
                        break;
                    }
                    else{
                        window.alert("Incorrect Username/ Password")
                    }
                }
            }
        })
    })

})
