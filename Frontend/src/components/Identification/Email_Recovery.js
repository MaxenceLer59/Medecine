import React, {useState} from "react";
import Identification from "../../pages/Identification";
import "../../styles/Identification.scss";

const Email_Recovery = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="identification-container">
      <form className="identification-form">
        <h2 className="identification-form-title">
          Récupération du mot de passe
        </h2>
        <input
          className="identification-input"
          type="email"
          placeholder="Adresse e-mail"
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
          Envoyer
        </button>
        <button
          className="identification-link-button"
          onClick={() => <Identification />}
        >
          Retour à la page de Login
        </button>
      </form>
    </div>
  );
};

export default Email_Recovery;
