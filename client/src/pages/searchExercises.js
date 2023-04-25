import React, { useState, useEffect } from 'react';
import Auth from '../utils/auth';
import { saveExerciseIds, getSavedExercises } from '../utils/localStorage';
import { SAVE_EXERCISE } from '../utils/mutations';
import { useMutation } from '@apollo/client';
import { searchExerciseAPI } from '../utils/API';


const SearchExercises = () => {
    const [searchInput, setSearchInput] = useState('');
    const [searchedExercises, setSearchedExercises] = useState([]);
    const [savedExerciseIds, setSavedExerciseIds] = useState(getSavedExercises());
    const [saveExercise] = useMutation(SAVE_EXERCISE);

    useEffect(() => {
        return () => saveExerciseIds(savedExerciseIds);
    });

    // create method to search for exercises and set state on form submit
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!searchInput) {
            return false;
        }

        try {
            const response = await searchExerciseAPI(searchInput);

            if (!response.ok) {
                throw new Error('something went wrong!');
            }

            const { items } = await response.json();

            const exerciseData = items.map((exercise) => ({
                exerciseId: exercise.id,
                name: exercise.name || ['No exercise to display'],
                bodyPart: exercise.bodyPart,
                muscleTarget: exercise.muscleTarget,
                equipmentUsed: exercise.equipmentUsed,
                image: exercise?.image || '',
            }));

            setSearchedExercises(exerciseData);
            setSearchInput('');
        } catch (err) {
            console.error(err);
        }
    };

    const handleSaveExercise = async (exerciseId) => {
        const exerciseToSave = searchedExercises.find((exercise) => exercise.exerciseId === exerciseId);

        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const response = await saveExercise({
                variables: { input: exerciseToSave },
            });

            if (!response) {
                throw new Error('something went wrong!');
            }

            // if exercise successfully saves to user's account, save exercise id to state
            setSavedExerciseIds([...savedExerciseIds, exerciseToSave.exerciseId]);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <h1>Search for Exercises!</h1>
    );
};

export default SearchExercises;
