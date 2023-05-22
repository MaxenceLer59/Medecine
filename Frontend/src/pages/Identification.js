import React from 'react';
import '../styles/Identification.scss';

const Identification = () => {
  return (
    <div className="login-container">
      <form className="login-form">
        <h2 className="login-form-title">Connexion</h2>
        <input className="login-input" type="text" placeholder="Nom d'utilisateur" />
        <input className="login-input" type="password" placeholder="Mot de passe" />
        <button className="login-button" type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default Identification;
