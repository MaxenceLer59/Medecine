import React, { useState } from "react";
import Profil from "../components/Profil/Profil";
import Patients from "../components/Patients/Patients";
import logo from "../../public/Image/brand-logo.png"
import History from "../components/History/History";
import "../styles/Dashboard.scss"
import Add_Patient from "../components/Patients/Add_Patient";

const Dashboard = () => {

    const [itemSelected, setItemSelected] = useState("");
    const [isHoveredAdd, setIsHoveredAdd] = useState(false);
    const [isHoveredLogout, setIsHoveredLogout] = useState(false);
    const [addPatientModal, setAddPatientModal] = useState(false);

    return (
        <div className="dashboard-container">
            <div className="sidebar">
                <div className="sidebar-brand">
                    <img src={logo} alt="logo" />
                    <h3>Medecine</h3>
                </div>
                <div>
                    <button className={ isHoveredAdd ? "sidebar-add-patient-hovered" : 'sidebar-add-patient'} onClick={() => {setAddPatientModal(true) }} onMouseEnter={() => {setIsHoveredAdd(true)}} onMouseLeave={() => {setIsHoveredAdd(false)}}>
                        Ajouter un patient
                    </button>
                    { addPatientModal ? <Add_Patient modal_state={addPatientModal}/> : null}
                </div>
                <div className="sidebar-items">
                    <div className="sidebar-item" onClick={() => { setItemSelected('profil') }}>Profil</div>
                    <div className="sidebar-item" onClick={() => { setItemSelected('patients') }}>Liste des Patients</div>
                    <div className="sidebar-item" onClick={() => { setItemSelected('history') }}>Historique</div>
                </div>
                <button className={ isHoveredLogout ? "logout-button-hovered" : "logout-button"} onMouseEnter={() => {setIsHoveredLogout(true)}} onMouseLeave={() => {setIsHoveredLogout(false)}}>
                    Déconnexion
                </button>
            </div>

            <div className="dashboard-content">
                {itemSelected === 'profil' ? <Profil />
                    :
                    itemSelected === 'patients' ? <Patients />
                        :
                        itemSelected === 'history' ? <History />
                            :
                            null}
            </div>
        </div>
    );
};

export default Dashboard;
