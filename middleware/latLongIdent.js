
// GET LAT LONG VALUES FROM THE GEOLOCATION API BY PROVIDING 
// LOCATION INFORMATION
const getLatLong = async (req,resp,next)=>{

    // IF THE CLIENT RUNNING THIS MIDDLEWARE BY CALLING THE 
    // /weatherForecast ENDPOINT, GATHER THE LOCATION INFORMATION 
    // FROM THE QUERY PARAMETERS. THIS BLOCK OF CODE BEING EXECUTED
    // WHEN USER MANUALLY QUERIES THE ENDPOINT.
    if (String(req.originalUrl).includes("/weatherForecast")){
      address = `${req.query.Country} ${req.query.Region} ${req.query.City}`
      if(!req.query.Country || !req.query.Region || !req.query.City){
        return resp.send("Please provide location.")
      }
    }else{
      // THIS GEOLOCATION SERVICE IS ALSO NEEDED WHEN USER SUBMITS
      // A NEW TRIP PROPOSAL. IN THAT CASE, CLIENT DOES NOT CALL FOR  
      // ./weatherForecast ENDPOINT. BUT THIS MIDDLEWARE GETS EXECUTED REGARDLESS.
      // WHEN SUBMITTING THE TRIP WITH A POST REQUEST, 
      // THE LOCATION INFO LOCATED IN THE BODY.
      addressJson = req.body.suggestion
      address = `${addressJson.Country} ${addressJson.Region} ${addressJson.City}`
    }
    
    // MAKE AN API CALL FOR RESULTS.
    const request = `https://maps.googleapis.com/maps/api/geocode/json?new_forward_geocoder=true&address=${address}&key=AIzaSyABpH3dmVKd4eO9aPrlR_-khjhJ4em9wz0`
    const result = await fetch(request,{
      method:"GET",
    }).then(res=>res.json())
    req.lat = result.results[0].geometry.location.lat
    req.long = result.results[0].geometry.location.lng
    next()
    
  }
  
  module.exports = getLatLong
