import React, { useState } from "react";
import Profil from "../components/Profil/Profil";
import Patients from "../components/Patients/Patients";
import logo from "../../public/Image/brand-logo.png"
import History from "../components/History/History";
import "../styles/Dashboard.scss"
import Add_Patient from "../components/Patients/Add_Patient";
import { auth } from "../../../config/firebase-config";
import { signOut } from "firebase/auth";
import Identification from "./Identification";

const Dashboard = () => {
    const [isConnected, setIsConnected] = useState(true);
    const [itemSelected, setItemSelected] = useState("");
    const [addPatientModal, setAddPatientModal] = useState(false);

    const DisplayModal = () => {
        if (addPatientModal) setAddPatientModal(false);
        else setAddPatientModal(true);
    }

    const LogOut = async (e) => {
        try {
            e.preventDefault();
            await signOut(auth).then(setIsConnected(false));
        } catch (err) {
            throw (err)
        }
    }

    return (isConnected ?
        <div className="dashboard-container">
            <div className="sidebar">
                <div className="sidebar-brand">
                    <img src={logo} alt="logo" />
                    <h3>Medecine</h3>
                </div>
                <div className="sidebar-btn-add-patient">
                    <button className='sidebar-add-patient' onClick={DisplayModal}>
                        Ajouter un patient
                    </button>
                    {addPatientModal ? <Add_Patient modal_state={DisplayModal} /> : null}
                </div>
                <div className="sidebar-items">
                    <div className="sidebar-item" onClick={() => { setItemSelected('profil') }}>Profil</div>
                    <div className="sidebar-item" onClick={() => { setItemSelected('patients') }}>Liste des Patients</div>
                    <div className="sidebar-item" onClick={() => { setItemSelected('history') }}>Historique</div>
                </div>
                <button className="logout-button" onClick={LogOut}>
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
        :
        <Identification />
    );
};

export default Dashboard;
