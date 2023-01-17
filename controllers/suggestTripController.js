
// CONTROLLER OF THE /suggest-trip ENDPOINT.

const Travel = require('../model/travels')
const crypto = require('crypto')
const path = require('path')
const getReq = async (req,resp)=>{
    return resp.render(path.join(__dirname,'..','views','suggestTrip'),{
        username:req.username
        })
}

const postReq = async (req,resp)=>{
    if (!req.body.suggestion || !req.body.date){return resp.send({"status":"error","message":"Insufficent data.","data":""})}

    // CREATE A UNIQUE ID FOR THE PROPOSED TRIP. LOCATION INFO AND DATE OF THE TRIP 
    // WILL BE CONCATANATED. THE RESULTED STRING WILL BE HASHED WITH SHA1. 
    // THEREFORE EACH ENTRY ID WILL BE UNIQUE.
    const locationId = crypto.createHash('sha1').update(JSON.stringify(req.body.suggestion)+req.body.date).digest('hex')
    const locationInfo = req.body.suggestion
    const date = req.body.date

    // IF IT IS NOT A TRIP PROPOSAL, IT CAN BE TWO THINGS.
    if(req.body.submit == "no"){
        // USER MAY WANT TO GET THE FORECAST FOR THAT LOCATION.
        if(req.body.weather=="yes"){
            return resp.send({"status":"ok","message":`Forecast data for ${locationInfo.City}` ,"data":req.weatherForecast})
        }
        // OR GET LAT LONG GEOLOCATION COORDINATIONS FOR THE GOOGLE MAPS.
        return resp.send({"status":"ok","message":`Viewing ${locationInfo.City}` ,"data":{"lat":req.lat,"long":req.long}})
    }

    // IF IT IS A TRIP PROPOSAL, QUERY THE DATABASE IF THE TRIP ALREADY IS PROPOSED.
    const match = await Travel.findOne({ locationId }).lean()
    let message;
    if (!match){
        // IF THE ID IS UNIQUE, PUSH THE PROPOSED TRIP.
        await Travel.create({locationId, locationInfo, date})
        await Travel.updateOne(
            { 'locationId': locationId },
            { $push: { "interestedUsers": req.username} }
            );
        message = "Trip advice pushed into the system, and you will be notified when enough people are attending."
    }else{
        if (!match.interestedUsers.includes(req.username)){
            // IF THE TRIP IS ALREADY CREATED, PUT THE USER IN THE INTERESTED USERS LIST.
            await Travel.updateOne(
                { 'locationId': match.locationId },
                { $push: { "interestedUsers": req.username} }
                );
            message = "Trip already exists. Your name successfully added to the interested people's list."
        }else{
            // IF THE TRIP IS ALREADY CREATED, AND THE USER ALREADY IS INTERESTED, DENY.
            message="You are already signed to this list."
        }
    }
    
    return resp.send({"status":"ok","message":message,"data":{"lat":req.lat,"long":req.long}})
}

module.exports = {getReq, postReq}
