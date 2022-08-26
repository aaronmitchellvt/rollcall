const mongoose = require("mongoose");

const eventSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: String
    },
    hours: {
      type: String
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Event', eventSchema)
