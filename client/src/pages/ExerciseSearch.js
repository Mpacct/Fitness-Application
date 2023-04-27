import React, { useState, useEffect } from 'react';
import Auth from '../utils/auth';
import { saveExerciseIds, getSavedExercises } from '../utils/localStorage';
import { SAVE_EXERCISE } from '../utils/mutations';
import { useMutation } from '@apollo/client';
import { searchExerciseAPI } from '../utils/API';
import Card from '../components/Card';
import '../assets/exerciseSearch.css';


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
                <section className="page-section">
                    <div className="row gx-4 gx-lg-5 justify-content-center mb-5">
                        <div className="col-lg-6">
                            <form className="form-group" onSubmit={handleFormSubmit}>
                                <select onChange={(e) => setSearchInput(e.target.value)} className="btn dropdown-toggle" aria-label="Default select example">
                                    <option value>Select a muscle to workout</option>
                                    <option value="abductors">Abductors</option>
                                    <option value="abs">Abs</option>
                                    <option value="abbuctors">Abbuctors</option>
                                    <option value="biceps">Biceps</option>
                                    <option value="calves">Calves</option>
                                    <option value="cardiovascular-system">Cardiovascular-System</option>
                                    <option value="delts">Delts</option>
                                    <option value="forearms">Forearms</option>
                                    <option value="glutes">Glutes</option>
                                    <option value="hamstrings">Hamstrings</option>
                                    <option value="lats">Lats</option>
                                    <option value="levator-scapulae">Levator-Scapulae</option>
                                    <option value="pectorals">Pectorals</option>
                                    <option value="quads">Quads</option>
                                    <option value="serratus-anterior">Serratus-Anterior</option>
                                    <option value="spine">Spine</option>
                                    <option value="traps">Traps</option>
                                    <option value="triceps">Triceps</option>
                                    <option value="upper-back">Upper-Back</option>
                                </select>
                                <div className="d-grid">
                                <button className="button btn-secondary" type='submit' variant='success'>Search Workouts</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </section>
                {
                    searchedExercises.map((exercise) => {
                        return (
                            <Card 
                                key={exercise.exerciseId}
                                image={exercise.image}
                                name={exercise.name}
                                muscleTarget={exercise.muscleTarget}
                                equipmentUsed={exercise.equipmentUsed}
                            />
                        )
                    })
                }
            </div >
        </>
    );
};

export default SearchExercises;
