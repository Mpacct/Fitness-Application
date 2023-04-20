const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    savedExercises: [Exercise]
  }

  type Exercise {
    exerciseId: ID!
    name: String
    bodyPart: String
    muscleTarget: String!
    equipmentUsed: String!
    image: String!
  }

  input exerciseData {
    exerciseId: ID!
    name: String
    bodyPart: String
    muscleTarget: String!
    equipmentUsed: String!
    image: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
   me: User
  }

  type Mutation {
    addUser(
      username: String!
      email: String!
      password: String!
    ): Auth
    saveExercise(
        input: exerciseData!
        ): User
    deleteExercise(
        exerciseId: ID!
    ): User
    updateUser(
      username: String
      email: String
      password: String
    ): User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
