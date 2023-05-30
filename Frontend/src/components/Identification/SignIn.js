import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { auth } from "../../../../config/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import "../../styles/Identification.scss";
import Email_Recovery from "./Email_Recovery";
import Dashboard from "../../pages/Dashboard";

const SignIn = ({ switch_identification }) => {

  const [redirecToDashBoard, setRedirectToDashBoard] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [forgetPassword, setForgetPassword] = useState(false);
  const [userLogin, setUserLogin] = useState({
    user_email: "",
    user_password: "",
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
      const { user_email, user_password } = userLogin;
      const checkInfo = () => {
        if (user_email === "") {
          toast.error("Username can not be empty", toastOptions);
          return false;
        }
        if (user_password === "") {
          toast.error("Password can not be empty", toastOptions);
          return false;
        }
        return true;
      };
      if (checkInfo()) {
        signInWithEmailAndPassword(auth, user_email, user_password)
          .then((userCredential) => {
            toast.success("Vous avez réussi à vous connecter !");
            setRedirectToDashBoard(true);

          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
          });
      }
    } catch (err) {
      throw err;
    }
  };

  return ( redirecToDashBoard ? <Dashboard />
    : forgetPassword == false ?
      <div className="identification-container">
        <form className="identification-form" onSubmit={login}>
          <h2 className="identification-form-title">Connexion</h2>
          <input
            className="identification-input"
            type="text"
            placeholder="Adresse e-mail"
            onChange={(e) => {
              setUserLogin({
                ...userLogin,
                user_email: e.target.value,
              });
            }}
          />
          <input
            className="identification-input"
            type="password"
            placeholder="Mot de passe"
            onChange={(e) => {
              setUserLogin({
                ...userLogin,
                user_password: e.target.value,
              });
            }}
          />
          <button
            className={
              isHovered
                ? "identification-button-hovered"
                : "identification-button"
            }
            type="submit"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Se connecter
          </button>
          <button
            className="identification-link-button"
            onClick={() => setForgetPassword(true)}
          >
            Mot de passe oublié ?
          </button>
          <button
            className="identification-link-button"
            onClick={switch_identification}
          >
            Pas encore de compte ?
          </button>
        </form>
        <ToastContainer />
      </div>
      :
      <Email_Recovery />
  )
};

export default SignIn;
