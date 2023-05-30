import React, { useState } from "react";
import "../styles/Dashboard.scss"
import Profil from "../components/Profil/Profil";
import Patients from "../components/Patients/Patients";
import logo from "../../public/Image/brand-logo.png"

const Dashboard = () => {

    const [itemSelected, setItemSelected] = useState("");

    return (
        <div className="dashboard-container">
            <div className="sidebar">
                <div className="sidebar-brand">
                    <img src={logo} alt="logo" />
                    <h3>Medecine</h3>
                </div>
                <div className="sidebar-items">
                    <div className="sidebar-item" onClick={() => {setItemSelected('profil')}}>Profil</div>
                    <div className="sidebar-item" onClick={() => {setItemSelected('patients')}}>Liste des Patients</div>
                </div>
                <button className="logout-button">
                    Déconnexion
                </button>
            </div>

            <div className="dashboard-content">
                {itemSelected === 'profil' ? <Profil />
                    :
                    itemSelected === 'patients' ? <Patients />
                        :
                        null}
            </div>
        </div>
    );
};

export default Dashboard;
