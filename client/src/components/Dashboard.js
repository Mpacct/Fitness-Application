import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {

    return (

        <div className="page-section">
            <div className="container">
                <div className="text-center">
                    <h3 className="section-subheading text-muted m-4"></h3>
                </div>
                <div className="row text-center">
                    <div className="col-md-6">
                        <span className="fa-stack fa-4x">
                            <i className="fas fa-circle fa-stack-2x"></i>
                            <i className="fas fa-solid fa-comment fa-stack-1x fa-inverse"></i>
                        </span>
                        <h4 className="my-3">Chat</h4>
                        <p className="text-muted d-flex align-items-end">Chat with your doctor, physical therapist or personal trainer to get personalized help.</p>
                        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div className="text-center d-flex align-items-end justify-content-center">
                                <a className="button btn-outline-dark mt-auto" href="#"
                                >Coming Soon
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <span className="fa-stack fa-4x">
                            <i className="fas fa-circle fa-stack-2x"></i>
                            <i className="fas fa-dumbbell fa-stack-1x fa-inverse"></i>
                        </span>
                        <h4 className="my-3">Exercises</h4>
                        <p className="text-muted">Stay motivated and active! Plan your workout routine and browse your saved exercises.</p>
                        <div className="text-center d-flex align-items-end justify-content-center">
                            <Link to="/savedExercises" className="button btn-outline-dark mt-auto" 
                            >View Saved Exercises
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}