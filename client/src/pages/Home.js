import React from "react";
import Exercises from "./Exercises";
import Dashboard from "../components/Dashboard";
import '../assets/card.css';
import Auth from "../utils/auth"
import { Link } from "react-router-dom";

const loginLink = <Link to="/login">Login</Link>
const signupLink = <Link to="/signup">Signup</Link>

function Home() {

    function handleDashboard() {
        if (!Auth.loggedIn()) {
            return(
                <h2 className="text-center m-5">Please {loginLink} or {signupLink} to View your Dashboard</h2>
            )
        } else {

            return (
                <div>
                    <h2 className="text-center m-5">Personal Dashboard</h2>
                    <Dashboard />
                    <Exercises />
                </div>
            )
        }
    }
    return (
        <div>
        {handleDashboard()}
        </div>
    )
}
export default Home;