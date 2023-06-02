import React, { useContext, useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "../../../../config/firebase-config";
import { UserContext } from "../../../../config/userContext";
import "../../styles/Patients.scss";
import people from "../../../public/Image/people-logo.png"
import loop from "../../../public/Image/loop.png";
import { toast } from "react-toastify";

const Patients = () => {
    const [search, setSearch] = useState("");
    const [patientList, setPatientList] = useState([]);
    const [displayPatientList, setDisplayPatientList] = useState([]);
    const userUID = useContext(UserContext).userUID;

    useEffect(() => {
        const patientsRef = ref(db, "patients");

        onValue(patientsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const patients = Object.values(data);
                setPatientList(patients);
                setDisplayPatientList(patients);
            }
        });
    }, []);

    const searchPatient = async (e) => {
        try {
            e.preventDefault();
            if (search === "" || search === null) setDisplayPatientList(patientList);
            else {
                let searching_patientList = []
                patientList.filter((patient) => {
                    const patientName = patient.patient_name.toLowerCase();
                    const patientFirstName = patient.patient_firstname.toLowerCase();
                    const searchQuery = search.toLowerCase();
                    if (patientName === searchQuery || patientFirstName === searchQuery) {
                        searching_patientList.push(patient)
                    }
                })
                if (searching_patientList.length !== 0) {
                    setDisplayPatientList(searching_patientList);
                }
                else console.dir('Patient not found');
            }
        } catch (err) {
            throw err;
        }
    }

    return (
        <div className="patients-container">
            <form onSubmit={searchPatient}>
                <input type="text" placeholder="Rechercher un patient" onChange={(e) => { setSearch(e.target.value) }} />
                <span className="separate" />
                <button type="submit"><img src={loop} alt="loop" /></button>
            </form>
            {displayPatientList.map((patient) => {
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
