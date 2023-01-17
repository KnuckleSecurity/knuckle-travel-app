
const jwt = require('jsonwebtoken')
const fs = require('fs')
const publicKey = fs.readFileSync('data/public.key')

const verifyAccessJWT = (req, resp, next)=>{
  req.JWTverified=false
  req.JWTexists=false;
  const cookies = req.cookies

  // CHECK IF THERE IS ANY ACCESS JWT FOR AUTH
  if (cookies.Authorization){
    req.JWTexists=true;
    const token = cookies.Authorization.split(' ')[1]
    // IF JWT ACCESS TOKEN EXISTS, CHECK IF IT IS EXPIRED OR VALID
    jwt.verify(token, publicKey, async(err,decoded)=>{
      // IF IT IS VALID, SET BOOLEAN VARIABLE TRUE
      if (!err ){
          req.JWTverified = true                  
          req.decoded = decoded
          req.username = decoded.username
        }
      }
      // IF JWT IS UNVALID, SET BOOLEAN FALSE
    )
  }
  return next()
}

module.exports = verifyAccessJWT
