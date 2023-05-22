import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "../../styles/Identification.scss"

const SignUp = ({ switch_identification }) => {

    //States
    const [userSignup, setUserSignup] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    const [passwordFlag, setPasswordFlag] = useState({
        length: false,
        min: false,
        maj: false,
        num: false,
        special: false,
    });

    //Check functions
    const checkUsername = () => {
        if (userSignup.username.length < 3) {
            toast.error("Username should be greater than 3 characters", toastOptions);
            return false;
        }
        return true;
    };

    const checkEmail = () => {
        if (userSignup.email === "") {
            toast.error("Email is required", toastOptions);
            return false;
        } else {
            const regex =
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            const check = regex.test(String(userSignup.email).toLowerCase());
            if (!check) {
                toast.error("Invalid Email", toastOptions);
                return false;
            }
            return true;
        }
    };

    const checkPassword = () => {
        var flags = {
            length: false,
            min: false,
            maj: false,
            num: false,
            special: false,
        };

        if (userSignup.password.length >= 10) {
            flags.length = true;
        }
        if (userSignup.password.match(/[a-z]/, "g")) {
            flags.min = true;
        }
        if (userSignup.password.match(/[A-Z]/, "g")) {
            flags.maj = true;
        }
        if (userSignup.password.match(/[0-9]/, "g")) {
            flags.num = true;
        }
        if (userSignup.password.match(/\W|_/g)) {
            flags.special = true;
        }
        const flags_array = Object.values(flags);
        for (let i = 0; i < flags_array.length; i++) {
            if (flags_array[i] === false) {
                toast.error("Password does not meet site standards", toastOptions);
                return false;
            }
        }
        return true;
    };

    const checkSamePassword = () => {
        if (userSignup.password !== userSignup.confirmPassword) {
            toast.error(
                "Password and Confirm Password should be same !",
                toastOptions
            );
            return false;
        }
        return true;
    };


    const signup = async (e) => {
        try {
            e.preventDefault();
            if (
                checkUsername() &&
                checkEmail() &&
                checkPassword() &&
                checkSamePassword()
            ) {
                const { username, email, password } = userSignup;
                const response = await axios.post(registerRoute,
                    {
                        username,
                        email,
                        password,
                    }
                );
                if (response.data.status === false) {
                    toast.error(
                        response.data.msg,
                        toastOptions);
                }
                if (response.data.status === true) {
                    alert(
                        "Your Account has been Created !"
                    );
                }
            }
        } catch (err) {
            throw err;
        }
    };


    return (
        <div className="identification-container">
            <form className="identification-form">
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
                        setUserLogin({
                            ...userLogin,
                            confirmPassword: e.target.value,
                        })
                    }} />
                <button className="identification-button" type="submit">S'inscrire</button>
                <button className="identification-link-button" onClick={switch_identification}>Déjà un compte ?</button>
            </form>
            <ToastContainer />
        </div>
    )
};

export default SignUp;