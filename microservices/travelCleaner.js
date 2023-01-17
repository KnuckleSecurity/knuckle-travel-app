

const mongoose= require('mongoose');
const uri = "mongodb+srv://burak:F8PRY3LxQeL87CL1@cluster0.bw3ng9v.mongodb.net/?retryWrites=true&w=majority";
const Travel = require('../model/travels')

const travelCleaner = async ()=>{

    // QUERIES THE DATABASE IN SOME INTERVAL TO SEE IF THERE IS 
    // ANY TRIP WITH NO INTERESTED USER. IF THERE IS, DROP THAT TRIP.
    const match = await Travel.find({  }).lean()
    for (let i=0;i<match.length;i++){

        if (match[i].interestedUsers.length == 0){
            await Travel.deleteOne({"locationId":match[i].locationId})
        }

    }
}

const clean = async()=>{
    const interval =  setInterval(() => {
        travelCleaner();
      }, 1000)
  
    mongoose.connect(uri).then(()=>{interval},err=>{console.log("error")})
}

clean()

