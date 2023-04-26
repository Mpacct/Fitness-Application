// require('dotenv').config();

const options = {
    method: 'GET',
    headers: {
        'content-type': 'application/octet-stream',
        'X-RapidAPI-Key': ,
        'X-RapidAPI-Host': 'exercises2.p.rapidapi.com'
    }
};

export const searchExerciseAPI = (query) => {
    const url = `https://exercises2.p.rapidapi.com/?muscleTarget=${query}&count=15`;
    return fetch(url, options)
//     .then(function(response){
//         response.json().then(function(data){
//             return data;
//         })
//     })
  };