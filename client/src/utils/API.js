require('dotenv').config();

const options = {
    method: 'GET',
    headers: {
        'content-type': 'application/octet-stream',
        'X-RapidAPI-Key': process.env.API_KEY,
        'X-RapidAPI-Host': 'exercises2.p.rapidapi.com'
    }
};

export const searchExerciseAPI = (query) => {
    const url = `https://exercises2.p.rapidapi.com/?muscleTarget=${query}`;
    return fetch(url, options);
  };