
// LOGIN POST REQUEST BY PROVIDING A USERNAME AND PASSWORD.


const button = document.getElementById('submit-button')
document.getElementById('fieldPassword1').addEventListener("keypress", function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    button.click();
  }
}); 
async function loginUser(){
    // const username = document.getElementById('uname').value
    // const password = document.getElementById('psw').value
    //

    const username = document.getElementById('fieldUsername1').value
    const password = document.getElementById('fieldPassword1').value   
  
    const result = await fetch('/login',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    }).then(res=>res.json())

    if(result.status=="ok"){
      alerts('success',`${result.message}`)
      
      setTimeout(()=>{window.location.replace("/");},3000)
    }
    else if(result.status=="error"){alerts('danger',result.message)}

    if(result.error == "Logged IN!") setTimeout(function(){location.reload()},1000)
    
  }
  
