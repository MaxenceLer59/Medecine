import React, {useState} from "react";
import { ToastContainer, toast } from "react-toastify";
import { auth } from "../../../../config/firebase-config";
import { sendPasswordResetEmail } from "firebase/auth";
import Identification from "../../pages/Identification";
import "../../styles/Identification.scss";

const Email_Recovery = () => {
  const [identificationPage, setIdentificationPage] = useState(false);
  const [email, setEmail] = useState("");

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark", 
  };

  const handleFormSubmit = (e) => {
    try {
      e.preventDefault();
      // Envoi de l'e-mail de réinitialisation du mot de passe
      sendPasswordResetEmail(auth, email.toString())
      .then(() => {
        toast.success(`Un e-mail de réinitialisation a été envoyé à votre adresse e-mail ${email}!`);
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/invalid-email') toast.error(`Ce compte n'existe pas !`, toastOptions);
        else toast.error(`Une erreur s'est produite lors de l'envoi de l'e-mail de réinitialisation. Veuillez recommencer !`, toastOptions);
      });
    } catch(err) {
      throw err
    }
  };
  return (
    identificationPage == false ? 
    <div className="identification-container">
      <form className="identification-form" onSubmit={handleFormSubmit}>
        <h2 className="identification-form-title">
          Récupération du mot de passe
        </h2>
        <input
          className="identification-input"
          type="email"
          placeholder="Adresse e-mail"
          onChange={(e) => {
            setEmail({
              ...email,
              email: e.target.value
            })
          }}
        />
        <button className="identification-button" type="submit">Envoyer</button>
        <button className="identification-link-button" onClick={() => setIdentificationPage(true)}>Retour à la page de Login</button>
      </form>
      <ToastContainer />
    </div>
  :
  <Identification />
  );
};

export default Email_Recovery;
