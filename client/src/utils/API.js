// require('dotenv').config();
// const API_KEY = process.env.REACT_APP_API_KEY
// console.log(API_KEY)
const options = {
    method: 'GET',
    headers: {
        'content-type': 'application/octet-stream',
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
        'X-RapidAPI-Host': 'exercises2.p.rapidapi.com'
    }
};
  export const searchExerciseAPI = async (query) => {
    const url = `https://exercises2.p.rapidapi.com/?muscleTarget=${query}&count=15`;
    const data = await fetch(url, options);
    return data.json();
  };