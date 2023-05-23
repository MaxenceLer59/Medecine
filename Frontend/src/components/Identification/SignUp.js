import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { auth, db } from "../../../../config/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import "../../styles/Identification.scss";
import "react-toastify/dist/ReactToastify.css";

const SignUp = ({ switch_identification }) => {
  //States
  const [isHovered, setIsHovered] = useState(false);
  const [userSignup, setUserSignup] = useState({
    user_email: "",
    user_password: "",
    user_confirmPassword: "",
  });

  const [passwordFlag, setPasswordFlag] = useState({
    length: false,
    min: false,
    maj: false,
    num: false,
    special: false,
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const checkPassword = () => {
    var flags = {
      length: false,
      min: false,
      maj: false,
      num: false,
      special: false,
    };

    if (userSignup.user_password.length >= 10) {
      flags.length = true;
    }
    if (userSignup.user_password.match(/[a-z]/, "g")) {
      flags.min = true;
    }
    if (userSignup.user_password.match(/[A-Z]/, "g")) {
      flags.maj = true;
    }
    if (userSignup.user_password.match(/[0-9]/, "g")) {
      flags.num = true;
    }
    if (userSignup.user_password.match(/\W|_/g)) {
      flags.special = true;
    }
    const flags_array = Object.values(flags);
    for (let i = 0; i < flags_array.length; i++) {
      if (flags_array[i] === false) {
        toast.error("Le mot de passe ne respecte pas les bonnes pratiques !", toastOptions);
        return false;
      }
    }
    return true;
  };

  const checkSamePassword = () => {
    if (userSignup.user_password !== userSignup.user_confirmPassword) {
      toast.error("Les mots de passes ne correspondent pas !",toastOptions);
      return false;
    }
    return true;
  }

  const signup = async (e) => {
    try {
      e.preventDefault();
      if (checkPassword() && checkSamePassword()) {
        const { user_email, user_password, } = userSignup;
        createUserWithEmailAndPassword(auth, user_email, user_password)
        .then((userCredential) => {
          // Signed in
          const userId = userCredential.user.uid;
          set(ref(db, "users/" + userId), {
            user_email: user_email,
          });
          toast.success('Votre compte à bien était enregistrer vous pouvez maintenant vous connecter !')
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
              user_email: e.target.value,
            });
          }}
        />
        <input
          className="identification-input"
          type="password"
          placeholder="Mot de passe"
          onChange={(e) => {
            setUserSignup({
              ...userSignup,
              user_password: e.target.value,
            });
          }}
        />
        <input
          className="identification-input"
          type="password"
          placeholder="Confirmer le mot de passe"
          onChange={(e) => {
            setUserSignup({
              ...userSignup,
              user_confirmPassword: e.target.value,
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
          S'inscrire
        </button>
        <button
          className="identification-link-button"
          onClick={switch_identification}
        >
          Déjà un compte ?
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
