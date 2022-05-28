const mongoose = require('mongoose')
// const uniqueValidator = require('mongoose-unique-validator');
const { Schema } = mongoose;

const VideoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    url: {
        type: String,
        required: true,
        validate: {
          // validates if the value is a valid url string
          validator: function(v) {
            return /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/.test(v);
          },
          message: props => `${props.value} is not a valid url!`
        }
    },
    thumbnailUrl: {
        type: String,
        required: false,
        validate: {
          validator: function(v) {
            return /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/.test(v);
          },
          message: props => `${props.value} is not a valid url!`
        },
    },
    isPrivate: {
        type: Boolean,
        required: true
    },
    timesViewed: {
        type: Number,
        required: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

module.exports = mongoose.model('Video', VideoSchema)