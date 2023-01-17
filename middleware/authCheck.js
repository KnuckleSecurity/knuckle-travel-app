

const path = require('path')
const authCheck = (req, resp, next)=>{

    // IF THERE IS NO ACCESS TOKEN, CLIENT IS UNAUTHORIZED.
    if(req.JWTexists==false){
        if(req.method == "GET"){
            return resp.status(401).render(path.join(__dirname,'..','views','error'),{
                title:"Unauthorized."
            })
        }
        if(req.method == "POST"){
            resp.status(401).send({"status":"error","message":"Unauthorized"})
        }
    }
    req.id=req.id;
    return next()
}

module.exports = authCheck
