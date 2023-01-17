
// CONTROLLER OF THE / ENDPOINT.

const path = require('path')
const fs = require('fs')

// RENDER THE HOME PAGE.
const getReq = async (req,resp)=>{
    return resp.render(path.join(__dirname,'..','views','index'),{
        title:'Welcome to the Knuckle Travel.',
        username:req.username
    })
}

module.exports = {getReq}
