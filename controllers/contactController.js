
// CONTROLLER OF THE /contacts ENDPOINT

const path = require('path')
const fs = require('fs')

const getReq = async (req, resp)=>{
    return resp.render(path.join(__dirname,'..','views','contacts'),{
      username:req.username
  })
}

module.exports = {getReq}
