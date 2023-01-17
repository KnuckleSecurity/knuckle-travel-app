
// PUT A TRIP PROPOSAL REQUEST TO THE API BY PROVIDING 
// LOCATION INFO AND DATE.

const button = document.getElementById('submitButton')

async function submitSuggestion(submit){
    // event.preventDefault()
    const city = $('#city')[0].value
    const region = $('#region')[0].value
    const country = $("#country option:selected").text();
  
    if(!city || !region || !country){
      alerts("warning","Please select for all boxes.")
      return
    }

    if(document.querySelector('input[type="date"]').value==""){
      alerts("warning","Please select a date.")
      return
    }
    const dateControl = document.querySelector('input[type="date"]');
    const suggestion = {'Country':country, 'Region':region, 'City':city}

    const result = await fetch('/suggest-trip',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
    body: JSON.stringify({"date":dateControl.value,"suggestion":suggestion,"submit":submit})
    }).then(res=>res.json())
    if (result.status == "ok"){alerts('success',result.message)}
    if (result.status == "err"){alerts('danger',result.message)}
    seeLocation(result.data.lat, result.data.long)
  
}









