import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { removeExerciseId } from '../utils/localStorage';
import { GET_ME } from '../utils/queries';
import { DELETE_EXERCISE } from '../utils/mutations';

const Exercises = () => {
    const { loading, error, data } = useQuery(GET_ME);
    const [deleteExercise] = useMutation(DELETE_EXERCISE);

    const userData = data?.me || [];

    const handleDeleteExercise = async (exerciseId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
            return false;
        }
        try {
            await deleteExercise({ variables: { exerciseId } });
            removeExerciseId(exerciseId);
        }
        catch (err) {
            console.error(err);
        }
    };

    if (loading) {
        return <h2>LOADING....</h2>
    }
    if (error) {
        return <h2>{error.message}</h2>
    }

    console.log(data?.me);


    return (
        <div className="container">
            <div className="row">
                {userData.savedExercises.map((exercise) => {
                    return (
                        <div className="col-4" key={exercise.exerciseId}>
                            <section className="pt-md-5">
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
                                                className="button btn-outline-dark mt-auto" onClick={()=> handleDeleteExercise(exercise.exerciseId)}>
                                                Delete 
                                            </button>
                                        </div>
                                    </div>
                                </div>


                            </section>
                        </div>
                    )
                })
                }
            </div>
        </div>
    );
}
export default Exercises;