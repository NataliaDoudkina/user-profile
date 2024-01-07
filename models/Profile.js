const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema(
  {
    userId: {
      type: String,
      unique: true,
    },
    name: String,
    dob: Date,
    zodiacSign: String,
   
    reason: [String],
    location: {
      type: Map,
      of: String,
    },
    bio: String,
    photos: [String],
  },
  {
    timestamps: true,
  }
);

mongoose.model("profiles", profileSchema);
