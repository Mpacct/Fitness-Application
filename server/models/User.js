const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// import schema from Exercise.js
const exerciseSchema = require('./Exercise');

const userSchema = new Schema({
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
  // set savedExercise to be an array of data that adheres to the exerciseSchema
    savedExercises: [exerciseSchema],
  });

  // set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };
  
  const User = mongoose.model('User', userSchema);
  
  module.exports = User;