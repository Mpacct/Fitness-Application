// require('dotenv').config();

const options = {
    method: 'GET',
    headers: {
        'content-type': 'application/octet-stream',
        'X-RapidAPI-Key': '6a5ef253a8msh266dbfc2cba0995p1fa83ejsn4bcfab9bf690',
        'X-RapidAPI-Host': 'exercises2.p.rapidapi.com'
    }
};

  export const searchExerciseAPI = async (query) => {
    const url = `https://exercises2.p.rapidapi.com/?muscleTarget=${query}&count=15`;
    const data = await fetch(url, options);
    return data.json();
  };