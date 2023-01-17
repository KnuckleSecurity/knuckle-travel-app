
// LEAVE TRIP POST REQUEST BY PROVIDING A TRIP ID.

const leaveTrip = async (index)=>{
    const tripID = $(`#${index}`)[0].cells[0].textContent
    const result = await fetch('/services/leave-trip',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({tripID})
      }).then(res=>res.json())
      queryTrips('me',"forced")
      if (result.status == "ok"){alerts('success',result.message)}
}
