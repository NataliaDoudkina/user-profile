const mongoose = require("mongoose");
const zodiac = require("zodiac-signs")("en");
let Profile = mongoose.model("profiles");

// This function adds date of birth and zodiac sign
// dob param should have format "<YYYY-mm-dd>"
module.exports.addDateOfBirthAndZodiac = (id, dob) => {
  console.log("in add zodiac ", typeof dob)
  return new Promise((resolve, reject) => {
    Profile.find({
      userId: id,
    })
      .exec()
      .then((profile) => {
        console.log("here in zodiac")
        let date = parseInt(dob.slice(8));
        console.log("date ", date)
        let month = parseInt(dob.slice(6, 8));
         console.log("month ", month)
        let userZodiac = zodiac.getSignByDate({ day: date, month: month });
        console.log("zodiac ", userZodiac)
        Profile.findOneAndUpdate(
          { userId: id },
          { dob: new Date(dob), zodiacSign: userZodiac.name },
          { new: true }
        )
          .exec()
          .then((profile) => {
            resolve({
              dateOfBirth: profile.dob,
              zodiacSign: profile.zodiacSign,
            });
          })
          .catch((err) => {
            reject(
              `Unable to update date of birth and zodiac sign for user with id: ${id}`
            );
          });
      });
  });
};

module.exports.getDateOfBirth = (id) => {
  return new Promise((resolve, reject) => {
    Profile.find({
      userId: id,
    })
      .exec()
      .then((profile) => {
        resolve(profile.dob);
      })
      .catch((err) => {
        reject(`Unable to get date of birth for user with id: ${id}`);
      });
  });
};

module.exports.getZodiacSign = (id) => {
  return new Promise((resolve, reject) => {
    Profile.find({
      userId: id,
    })
      .exec()
      .then((profile) => {
        resolve(profile.zodiacSign);
      })
      .catch((err) => {
        reject(`Unable to get zodiac sign for user with id: ${id}`);
      });
  });
};
