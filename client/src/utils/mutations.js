import { gql } from '@apollo/client';

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
        user {
            _id
            username
        }
        token
        }
    }
`;

export const LOGIN_USER = gql`
    mutation loginUser($email: String!, $password: String!) {
        login(email: $email, password: $password) {
        token
        user {
            username
            _id
        }
        }
    }
`;

export const DELETE_EXERCISE = gql`
    mutation deleteExercise($exerciseId: ID!) {
        deleteExercise(exerciseId: $exerciseId) {
        _id
        username
        savedExercises {
            bodyPart
            equipmentUsed
            exerciseId
            image
            muscleTarget
            name
        }
        }
    }
`;

export const SAVE_EXERCISE = gql`
    mutation Mutation($input: exerciseData!) {
        saveExercise(input: $input) {
        _id
        username
        savedExercises {
            name
            muscleTarget
            image
            exerciseId
            equipmentUsed
            bodyPart
        }
        }
    }
`;

export const UPDATE_USER = gql`
    mutation Mutation($username: String, $email: String, $password: String) {
        updateUser(username: $username, email: $email, password: $password) {
        _id
        email
        username
        }
    }
`;
