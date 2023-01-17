
async function tripsData(query,param){
    // 1-LIST ALL THE SUBSCRIBED USERS FOR A TRIP.
    if(query=="user"){
      window.open(
        `https://knuckle-travel.herokuapp.com/tripsData?tripID=${param}`,
        'Interested Users',
        'width=600,height=600')
    }
    // 2-LIST ALL THE TRIPS A USER IS SUBSCRIBED.
    if(query=="trip"){
      window.open(
        `https://knuckle-travel.herokuapp.com/tripsData?userID=${param}`,
        'Interested Users',
        'width=600,height=600')
    }
    if(!param){
      return
    }

  }
  
