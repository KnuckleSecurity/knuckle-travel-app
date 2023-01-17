
// CONTROLLER OF THE /register ENDPOINT

const path = require('path')
const User = require('../model/user')
const Travels = require('../model/travels')
const bcrypt = require('bcrypt')
const getReq = async (req,resp)=>{
    return resp.render(path.join(__dirname,'..','views','register'))
}

const postReq = async (req,resp)=>{
    const { username, password: plainPassword } = req.body;

    const user = await User.findOne({ username }).lean()
    if(user){return resp.status(409).json({"status": 'error', "message": 'Username already in use !'})}

    // FOLLOWING FIVE IF BLOCKS ARE DENYING USER TO SET A WEAK PASSWORD.
    if (!username || !plainPassword){
      return resp.status(400).json({"status": 'error', "message": 'Please fill the blanks.'})
    }
    if (!username || typeof username != 'string'){
      return resp.status(400).json({"status": 'error', "message": 'Invalid username'})
    }
    if (!plainPassword || typeof plainPassword != 'string'){
      return resp.status(400).json({"status": 'error', "message": 'Please enter some password'})
    }
    if (plainPassword.length < 5){
      return resp.status(400).json({"status": 'error', "message": 'Password can not be less then 5 characters.'})
    }
    if (username.length < 5){
      return resp.status(400).json({"status": 'error', "message": 'Username can not be less then 5 characters.'})
    }
    // HASH THE PASSWORD WITH THE BCRYPT ALGORITHM. IT IS  
    // NOT SAFE TO KEEP PASSWORDS IN PLAIN TEXT IN A DATABASE.
    const password = bcrypt.hashSync(plainPassword, 10)
    // CREATE THE USER IN DATABASE.
    try {
        await User.create({
          username,
          password
      })
      return resp.json({"status": 'ok', "message": 'User have created without any problem.'})
    } catch (error){
      if (error.code === 11000){
        return resp.status(500).json({"status": 'error', "message": 'Something went wrong.'})
      }
      throw error
    }
}
module.exports = {getReq, postReq}
