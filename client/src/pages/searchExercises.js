import React, { useState, useEffect } from 'react';
import Auth from '../utils/auth';
import { saveExerciseIds, getSavedExercises } from '../utils/localStorage';
import { SAVE_EXERCISE } from '../utils/mutations';
import { useMutation } from '@apollo/client';
import { searchExerciseAPI } from '../utils/API';
import Card from '../components/Card';


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
            console.log(searchInput)
            const response = await searchExerciseAPI(searchInput);
            console.log(response);

            const exerciseData = response.map((exercise) => ({
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
        <>
            <div>
                <form className="dropdown show" onSubmit={handleFormSubmit}>
                    <select onChange={(e) => setSearchInput(e.target.value)} className="form-select" aria-label="Default select example">
                        <option value>Open this select menu</option>
                        <option value="abs">One</option>
                        <option value="biceps">Two</option>
                        <option value="calves">Three</option>
                    </select>
                    <button type='submit' variant='success'>Search</button>
                </form>
            </div>
            <div>
                {searchedExercises.map((exercise) => {
                    return (
                        <Card key={exercise.exerciseId}
                            image={exercise.image}
                            name={exercise.name}
                            muscleTarget={exercise.muscleTarget}
                            equipmentUsed={exercise.equipmentUsed}
                        />
                    )
                })}
            </div>
        </>
    );
};

export default SearchExercises;
