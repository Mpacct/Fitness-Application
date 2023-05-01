const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('savedExercises').populate({
            path: 'savedExercises',
            populate: 'user'
          });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },

    saveExercise: async (parent, { input }, context) => {
      if(context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedExercises: input } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    deleteExercise: async (parent, { exerciseId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedExercises: { exerciseId } } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    
    updateUser: async (parent, { username, email, password }, context) => {
        if (context.user) {
          return await User.findByIdAndUpdate(context.user._id, { username, email, password }, { new: true });
        }
  
        throw new AuthenticationError('Not logged in');
      },
  }
};

module.exports = resolvers;














