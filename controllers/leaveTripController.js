
// CONTROLLER OF THE /service/join-trip ENDPOINT

const Travel = require('../model/travels')
const User = require('../model/user')
const bcrypt = require('bcrypt')
const path = require('path')


//PULL THE NAME OF THE CLIENT FROM THE INTERESTED 
//USERS ARRAY IN THE TRIPS COLLECTION.
const postReq = async (req,resp)=>{
    await Travel.updateOne(
        { 'locationId': req.body.tripID },
        { $pull: { "interestedUsers": req.username} }
        );
    const match = await Travel.findOne({'locationId':req.body.tripID})

    // IF NO USERS INTERESTED IN THE TRIP, DROP THE TRIP.
    if (match.interestedUsers.length == 0){
        await Travel.deleteOne({"locationId":req.body.tripID})
    }
    return resp.send({"status":"ok","message":"You left the trip."})

}

module.exports = {postReq}
