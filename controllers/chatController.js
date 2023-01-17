
// CONTROLLER OF THE /chat ENDPOINT

const path = require('path')
const fs = require('fs')

const getReq = async (req, resp)=>{
    // PREVENT NICKNAME SPOOFING IN THE CHAT.
    if(req.query.username != req.username){
        return resp.status(403).render(path.join(__dirname,'..','views','error'),{
            title:"You can not spoof your username.",
            username:req.username
        })
    }
    // RENDER THE CHAT INTERFACE
    return resp.sendFile(path.join(__dirname,'..','views','chat.html'))
}

module.exports = {getReq}
