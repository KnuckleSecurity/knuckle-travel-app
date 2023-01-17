
// CONTROLLER OF THE /tripsData ENDPOINT.

const path = require('path')
const Travel = require('../model/travels')

const getReq = async (req,resp)=>{
   
    // USER CAN NOT QUERY FOR BOT THE TRIPS AND THE USERS AT THE SAME TIME.
    // THIS ENDPOINT CAN ONLY RESPONSE TO ONE TYPE OF QUERY AT A TIME.
    if(req.query.tripID && req.query.userID){
        return resp.render(path.join(__dirname,'..','views','error'),{
            title:"Please provide a tripID or userID. You can not query both at the same time.",
            username:req.username
            })
    }
    // 1-LIST ALL THE SUBSCRIBED USERS FOR A TRIP.
    if(req.query.tripID){
        const tripID = req.query.tripID
        const match = await Travel.findOne({locationId:tripID})
        if(match == null){
            return resp.render(path.join(__dirname,'..','views','error'),{
                title:"Trip does not exists."
                })
        }
        return resp.send(match.interestedUsers)     
    }
    // 2-LIST ALL THE TRIPS A USER IS SUBSCRIBED.
    if(req.query.userID){
        const userID = req.query.userID
        const match = await Travel.find({interestedUsers:userID})
        if(match.length == 0){
            return resp.render(path.join(__dirname,'..','views','error'),{
                title:"User is not interested in any trips or user does not exist."
                })
        }
        let locations = new Array()
        for(let i = 0;i<match.length;i++){
            locations.push(match[i].locationInfo)
        }
        return resp.send(locations)     
    }
    
    return resp.render(path.join(__dirname,'..','views','error'),{
        title:"Please provide tripID or userID."
    })
}

// 2-LIST ALL THE TRIPS A USER IS SUBSCRIBED. ONLY DIFFRENCE THIS IS 
// A POST REQUEST.
const postReq = async (req,resp)=>{

      const userID = req.body.userID
      const match = await Travel.find({interestedUsers:userID})
      if(match.length == 0){
          return resp.send({"length":0})
      }
      let locations = new Array()
      for(let i = 0;i<match.length;i++){
          let locInfo = match[i].locationInfo
          let object = {
            "Country":locInfo.Country,
            "Region":locInfo.Region,
            "City":locInfo.City,
            "Date":match[i].date
          }
        locations.push(object)
      }
      return resp.send(locations)     
}


module.exports = {getReq, postReq}
