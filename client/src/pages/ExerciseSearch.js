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
                muscleTarget: exercise.target,
                equipmentUsed: exercise.equipment,
                image: exercise?.gifUrl || '',
            }));
            
            setSearchedExercises(exerciseData.slice(0, 15));
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
            console.log(savedExerciseIds)
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <div>
                <section className="page-section">
                    <div className="row gx-4 gx-lg-5 justify-content-center mb-2">
                        <div className="col-lg-6">
                            <form className="form-group d-flex justify-content-center pt-5" onSubmit={handleFormSubmit}>
                                <select onChange={(e) => setSearchInput(e.target.value)} className="btn dropdown-toggle" aria-label="Default select example">
                                    <option value>Select a muscle to workout</option>
                                    <option value="abductors">Abductors</option>
                                    <option value="abs">Abs</option>
                                    <option value="adductors">Adductors</option>
                                    <option value="biceps">Biceps</option>
                                    <option value="calves">Calves</option>
                                    <option value="cardiovascular%20system">Cardiovascular-System</option>
                                    <option value="delts">Delts</option>
                                    <option value="forearms">Forearms</option>
                                    <option value="glutes">Glutes</option>
                                    <option value="hamstrings">Hamstrings</option>
                                    <option value="lats">Lats</option>
                                    <option value="levator%20scapulae">Levator-Scapulae</option>
                                    <option value="pectorals">Pectorals</option>
                                    <option value="quads">Quads</option>
                                    <option value="serratus%20anterior">Serratus-Anterior</option>
                                    <option value="spine">Spine</option>
                                    <option value="traps">Traps</option>
                                    <option value="triceps">Triceps</option>
                                    <option value="upper%20back">Upper-Back</option>
                                </select>
                                <div className="d-grid">
                                    <button className="button btn-secondary" type='submit' variant='success'>Search Workouts</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </section>
                <div className="container">
                    <div className="row">
                    {searchedExercises.map((exercise) => {
                        return (
                            <div className="col-lg-4 col-md-6 col-sm-12" key={exercise.exerciseId}>
                                <section className="pt-md-5">

                                    {/* <div className="row-cols-md-3 justify-content-center">
                                        <div className="col mb-5"> */}
                                            <div className="card h-100">
                                                <img className="card-img-top" src={exercise.image} alt="..." />
                                                <div className="card-body p-4">
                                                    <div className="text-center">
                                                        <h2 className="exercise-title">{exercise.name}</h2>
                                                        <h5 className="exercise-muscle">{exercise.muscleTarget}</h5>
                                                        <p className="exercise-equipment">{exercise.equipmentUsed}</p>
                                                    </div>
                                                </div>
                                                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                                    <div className="text-center">
                                                        <button
                                                            disabled={savedExerciseIds?.some((savedExerciseId) => savedExerciseId === exercise.exerciseId)}
                                                            onClick={() => handleSaveExercise(exercise.exerciseId)}
                                                            className="button btn-outline-dark mt-auto">
                                                            {savedExerciseIds?.some((savedExerciseId) => savedExerciseId === exercise.exerciseId)
                                                                ? 'This exercise is now saved!'
                                                                : 'Save exercise'}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        {/* </div>
                                    </div> */}

                                </section>
                            </div>

                            // <Card
                            //     key={exercise.exerciseId}
                            //     image={exercise.image}
                            //     name={exercise.name}
                            //     muscleTarget={exercise.muscleTarget}
                            //     equipmentUsed={exercise.equipmentUsed}
                            // />
                        )
                    })
                    }
                </div>
                </div>
            </div >
        </>
    );
};

export default SearchExercises;
