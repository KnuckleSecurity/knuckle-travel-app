
// CROSS ORIGIN RESOURCE SHARING SETTINGS.

const corsWhiteList = ['http://localhost:5055']

const corsOptions = {
  origin: (origin, callback) => {
    if (corsWhiteList.indexOf(origin) !== -1 || !origin){
      callback(null, true)
    }else{
      callback(new Error('Cross origin resource sharing is not allowed for this domain.'))
    }
  },
  optionsSuccessStatus: 200
}

module.exports = corsOptions
