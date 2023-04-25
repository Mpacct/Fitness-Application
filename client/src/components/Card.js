import React from "react";

function Card(props) {
    return (
        <div className="container px-4 px-lg-5 mt-5">
            <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                <div className="col mb-5">
                    <div className="card h-100">
                        <img className="card-img-top" src={props.image} alt="..." />
                        <div className="card-body p-4">
                            <div className="text-center">
                                <h5 className="fw-bolder">{props.name}</h5>
                                <h5 className="fw-bolder">{props.muscleTarget}</h5>
                                <h5 className="fw-bolder">{props.equipmentUsed}</h5>

                            </div>
                        </div>
                        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div className="text-center">
                                <a className="btn btn-outline-dark mt-auto" href="#"
                                >View options
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;