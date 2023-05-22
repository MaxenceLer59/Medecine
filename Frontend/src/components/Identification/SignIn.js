import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "../../styles/Identification.scss"

const SignIn = ({switch_identification}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [userLogin, setUserLogin] = useState({
        email: "",
        password: "",
    });

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    const login = async (e) => {
        try {
            e.preventDefault();
            const { username, password } = userLogin;
            const checkInfo = () => {
                if (username === "") {
                    toast.error("Username can not be empty", toastOptions);
                    return false;
                }
                if (password === "") {
                    toast.error("Password can not be empty", toastOptions);
                    return false;
                }
                return true;
            };
            if (checkInfo()) {
                const response = await axios.post(loginRoute, userLogin);
                if (response.data.status === false) {
                    toast.error(response.data.msg, toastOptions);
                }
                if (!response.data.error) {
                }
            }
        } catch (err) {
            throw err;
        }
    };

    return (
        <div className="identification-container">
            <form className="identification-form">
                <h2 className="identification-form-title">Connexion</h2>
                <input
                    className="identification-input"
                    type="text"
                    placeholder="Adresse e-mail"
                    onChange={(e) => {
                        setUserLogin({
                            ...userLogin,
                            email: e.target.value,
                        })
                    }} />
                <input
                    className="identification-input"
                    type="password"
                    placeholder="Mot de passe"
                    onChange={(e) => {
                        setUserLogin({
                            ...userLogin,
                            password: e.target.value,
                        })
                    }} />
                <button className={isHovered ? 'identification-button-hovered' : 'identification-button'} type="submit" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>Se connecter</button>
                <button className="identification-link-button" onClick={switch_identification}>Pas encore de compte ?</button>
            </form>
            <ToastContainer />
        </div>
    )
}

export default SignIn;