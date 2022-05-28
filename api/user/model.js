const mongoose = require('mongoose')
// const uniqueValidator = require('mongoose-unique-validator');
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function(v) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid email"
      },
      required: [true, "Email required"]
    },
    token: {
      type: String,
    },
    tokenExpire: {
      type: Date,
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

module.exports = mongoose.model('User', UserSchema);