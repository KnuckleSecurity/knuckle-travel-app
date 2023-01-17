
// CONTROLLER OF THE /service/join-trip ENDPOINT

const Travel = require('../model/travels')
const User = require('../model/user')
const bcrypt = require('bcrypt')
const path = require('path')


//PUSH THE NAME OF THE CLIENT TO THE INTERESTED 
//USERS ARRAY IN THE TRIPS COLLECTION.
const postReq = async (req,resp)=>{
    await Travel.updateOne(
        { 'locationId': req.body.tripID },
        { $push: { "interestedUsers": req.username} }
        );
        return resp.send({"status":"ok","message":"Thanks for joinin to the trip !"})

}

module.exports = {postReq}
