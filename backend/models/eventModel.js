const mongoose = require("mongoose");

const eventSchema = mongoose.Schema(
  {
    title: {
      type: String,
      // required: true,
    },
    date: {
      type: String
    },
    hours: {
      type: String
    },
    weatherDate: {
      type: String
    },
    layoutImg: {
      type: String
    },
    players: {
      type: Array
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Event', eventSchema)
