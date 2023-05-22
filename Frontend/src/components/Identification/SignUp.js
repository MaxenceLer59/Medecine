import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import ENDPOINTS from "../../api/endpoints"
import {POST} from "../../api/axios"
import "../../styles/Identification.scss"

const SignUp = ({ switch_identification }) => {

    const registerRoute = ENDPOINTS.USER_SIGNUP
    //States
    const [isHovered, setIsHovered] = useState(false);
    const [userSignup, setUserSignup] = useState({
        user_email: "",
        user_password: "",
        user_confirmPassword: "",
    })

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };


    const signup = async (e) => {
        try {
            e.preventDefault();
            const { user_email, user_password } = userSignup;
            const response = await POST(registerRoute,
                {
                    user_email,
                    user_password,
                }
            );
            if (response.status === 201) {
                alert(
                    "Your Account has been Created !"
                );
            }

        } catch (err) {
            throw err;
        }
    };


    return (
        <div className="identification-container">
            <form className="identification-form" onSubmit={signup}>
                <h2 className="identification-form-title">S'inscrire</h2>
                <input
                    className="identification-input"
                    type="email"
                    placeholder="Adresse e-mail"
                    onChange={(e) => {
                        setUserSignup({
                            ...userSignup,
                            email: e.target.value,
                        })
                    }} />
                <input
                    className="identification-input"
                    type="password"
                    placeholder="Mot de passe"
                    onChange={(e) => {
                        setUserSignup({
                            ...userSignup,
                            password: e.target.value,
                        })
                    }} />
                <input
                    className="identification-input"
                    type="password"
                    placeholder="Confirmer le mot de passe"
                    onChange={(e) => {
                        setUserSignup({
                            ...userSignup,
                            user_confirmPassword: e.target.value,
                        })
                    }} />
                <button className={isHovered ? 'identification-button-hovered' : 'identification-button'} type="submit" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>S'inscrire</button>
                <button className="identification-link-button" onClick={switch_identification}>Déjà un compte ?</button>
            </form>
            <ToastContainer />
        </div>
    )
};

export default SignUp;