
// CONTROLLER OF THE /active-trips ENDPOINT

const Travel = require('../model/travels')
const User = require('../model/user')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const path = require('path')


// RENDER THE MAIN HTML.
const getReq = async (req,resp)=>{
    return resp.render(path.join(__dirname,'..','views','active-trips'),{
        username:req.username
        })
}

// POST REQUEST FOR THIS ENDPOINT RETURNS THE 
// ACTIVE TRIPS.
const postReq = async (req,resp)=>{
    
    const table = new Array()
    const match = await Travel.find({})
    // IF A CLIENT WANTS TO SEE ALL THE ACTIVE TRIPS.
    if(req.body.query == "all"){
        for (let i=0;i<match.length;i++){
        
            if(match[i].interestedUsers.includes(req.username)){continue}
            table.push({"Trip ID":match[i].locationId,
            "Date":match[i].date,
            "Location Info":`-Country: ${match[i].locationInfo["Country"]}-
             Region: ${match[i].locationInfo["Region"]}-
             City: ${match[i].locationInfo["City"]}-`,
            "Interested Users":match[i].interestedUsers.length})
          
        }
    }
    // IF A CLIENT WANTS TO SEE ONLY THE TRIPS HE IS INTERESTED.
    if(req.body.query == "me"){
        for (let i=0;i<match.length;i++){
        
            if(!match[i].interestedUsers.includes(req.username)){continue}
            table.push({"Trip ID":match[i].locationId,
            "Date":match[i].date,
            "Location Info":`-Country: ${match[i].locationInfo["Country"]}-
             Region: ${match[i].locationInfo["Region"]}-
             City: ${match[i].locationInfo["City"]}-`,
            "Interested Users":match[i].interestedUsers.length})
        }
    }
    return resp.send(table)

}
module.exports = {getReq, postReq}
