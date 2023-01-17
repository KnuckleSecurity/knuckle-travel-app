
// CONTROLLER OF THE /lobby ENDPOINT

const path = require('path')
const fs = require('fs')
const Travel = require('../model/travels')

const getReq = async (req, resp)=>{

    const table = new Array()
    const match = await Travel.find({})

    //CREATE A COLLECTION FROM ALL THE AVAILABLE TRIPS.
    // PUT THEM IN AN ARRAY.
    for (let i=0;i<match.length;i++){
    
        table.push(
        {"Trip ID":match[i].locationId,
        "date":match[i].date,
        "country":match[i].locationInfo["Country"],
        "city":match[i].locationInfo["City"],
        "region":match[i].locationInfo["Region"]})
        
      
    }
    return resp.render(path.join(__dirname,'..','views','lobby'),{
    trips:table,
    username:req.username
    })
}

module.exports = {getReq}
