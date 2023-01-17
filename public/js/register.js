
// REGISTER POST REQUEST BY PROVIDING A USERNAME AND PASSWORD.

async function registerUser(){
  const username = document.getElementById('fieldUsername1').value
  const password = document.getElementById('fieldPassword1').value   
  const result = await fetch('/register',{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  }).then(res=>res.json())
  if(result.status=="ok"){alerts('success',result.message)}
  else if(result.status=="error"){alerts('danger',result.message)}
}
