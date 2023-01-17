
// MONGODB MODEL FOR THE TRAVELS SCHEMA.

const mongoose = require('mongoose')

const TravelSchema = new mongoose.Schema(
  {
    locationId: {type: String, required: true, unique: true},
    locationInfo: {type: Object, required: true},
    date: {type: String, required: true},
    interestedUsers: [Array]
  },
  {collection: 'travels'}
)

const model = mongoose.model('TravelSchema', TravelSchema)

module.exports = model
