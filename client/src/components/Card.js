import React from "react";
import '../assets/card.css';

function Card(props) {
    return (
        <div>
            <section className="py-5">
                <div className="container">
                <div className="col">
                    <div className="row-cols-md-3 justify-content-center">
                        <div className="col mb-5">
                            <div className="card h-100">
                                <img className="card-img-top" src={props.image} alt="..." />
                                <div className="card-body p-4">
                                    <div className="text-center">
                                        <h2 className="exercise-title">{props.name}</h2>
                                        <h5 className="exercise-muscle">{props.muscleTarget}</h5>
                                        <p className="exercise-equipment">{props.equipmentUsed}</p>

                                    </div>
                                </div>
                                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                    <div className="text-center">
                                        <a className="button btn-outline-dark mt-auto" href="#"
                                        >Save Exercise
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Card;