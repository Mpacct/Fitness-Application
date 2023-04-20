const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedExercises` array in User.js
const exerciseSchema = new Schema({
  // saved exercise id from API
  exerciseId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  bodyPart: {
    type: String,
  },
  muscleTarget: {
    type: String,
    required: true,
  },
  equipmentUsed: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = exerciseSchema;