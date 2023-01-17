
// CONTROLLER OF THE /tripsData ENDPOINT.

const getReq = async (req,resp)=>{
    // RETURN THE FORECAST AS JSON.
    return resp.send(req.weatherForecast)
}

const postReq = async (req,resp)=>{
    if (!req.body.suggestion){return resp.send({"status":"error","message":"Insufficent data.","data":""})}
    // RETURN THE FORECAST AS JSON.
    return resp.send({"status":"ok","message":`Forecast data for ${locationInfo.City}` ,"data":req.weatherForecast})
   
}

module.exports = {getReq, postReq}
