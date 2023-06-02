import React, { useContext, useEffect, useState } from "react";
import { onValue, ref, getDatabase } from "firebase/database";
import { db } from "../../../../config/firebase-config";
import { UserContext } from "../../../../config/userContext";
import "../../styles/Patients.scss";
import people from "../../../public/Image/people-logo.png"
import loop from "../../../public/Image/loop.png";

const Patients = () => {
    const [patientList, setPatientList] = useState([]);
    const userUID = useContext(UserContext).userUID;

    useEffect(() => {
        const database = getDatabase();

        const patientsRef = ref(database, "patients");

        onValue(patientsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const patients = Object.values(data);
                setPatientList(patients);
            }
        });
    }, []);

    return (
        <div className="patients-container">
            <form>
                <input type="text" placeholder="Rechercher un patient"/>
                <span className="separate"/>
                <img src={loop} alt="loop"/>
            </form>
            {patientList.map((patient) => {
                // Vérification si userUID correspond à user.uid
                if (patient.user_uid === userUID) {
                    return (
                        <div className="patient-card">
                            <img src={people} alt="people" />
                            <p>
                                <span className="toUpperCase">{patient.patient_name} </span> 
                                {patient.patient_firstname}
                            </p>
                        </div>
                    );
                } else {
                    return null; // Ignorer le patient s'il ne correspond pas à l'utilisateur actuel
                }
            })}
        </div>
    );
};

export default Patients;
