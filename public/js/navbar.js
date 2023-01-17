
// SWITCH BETWEEN NAVIGATION BARS DEPENDING ON THE LOG-IN STATUS.
if (document.cookie.includes("Authorization")){
    setTimeout(()=>{$("#logoutButton").css("display", "inline-block")},0)
}else{
    setTimeout(()=>{$("#loginButton").css("display", "inline-block")
                    $("#registerButton").css("display", "inline-block")
    },0)
    
}
