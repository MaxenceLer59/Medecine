import React, { useContext, useEffect, useState } from "react";
import { onValue, ref, set } from "firebase/database";
import { db } from "../../../../config/firebase-config";
import { UserContext } from "../../../../config/userContext";
import "../../styles/Patients.scss";
import people from "../../../public/Image/people-logo.png"
import loop from "../../../public/Image/loop.png";
import { toast, ToastContainer } from "react-toastify";
import Add_Documents from "./Add_Documents";
import Fiche_Patient from "./Fiche_Patient";

const Patients = () => {
    const [isFichePatient, setIsFichePatient] = useState(false);
    const [addDocumentModal, setAddDocumentModal] = useState(false);
    const [search, setSearch] = useState("");
    const [patientList, setPatientList] = useState([]);
    const [patient, setPatient] = useState(null);
    const [displayPatientList, setDisplayPatientList] = useState([]);
    const userUID = useContext(UserContext).userUID;

    const toastOptions = {
        position: "bottom-right",
        theme: "dark",
        autoClose: 3000,
    };

    const DisplayModal = () => {
        if (addDocumentModal) setAddDocumentModal(false);
        else setAddDocumentModal(true);
    }

    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split("-");
        // Retourner la date formatée dd/mm/yyyy
        return `${day}/${month}/${year}`;
    };

    useEffect(() => {
        const patientsRef = ref(db, "patients");

        onValue(patientsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const patients = Object.values(data);
                // Tri des patients par nom et prénom (ordre alphabétique)
                patients.sort((a, b) => {
                    const lastNameA = a.patient_name.toUpperCase();
                    const lastNameB = b.patient_name.toUpperCase();
                    const firstNameA = a.patient_firstname.toUpperCase();
                    const firstNameB = b.patient_firstname.toUpperCase();

                    if (lastNameA < lastNameB) {
                        return -1;
                    }
                    if (lastNameA > lastNameB) {
                        return 1;
                    }

                    // Si les noms sont identiques, tri par prénom
                    if (firstNameA < firstNameB) {
                        return -1;
                    }
                    if (firstNameA > firstNameB) {
                        return 1;
                    }

                    return 0;
                });
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
                    if (patientName.includes(searchQuery) || patientFirstName.includes(searchQuery)) {
                        searching_patientList.push(patient)
                    }
                })
                if (searching_patientList.length !== 0) {
                    setDisplayPatientList(searching_patientList);
                }
                else {
                    setDisplayPatientList(patientList);
                    toast.error(`${search.toUpperCase()} n'a pas été trouvé !`, toastOptions);
                }
            }
        } catch (err) {
            throw err;
        }
    }

    return (<>
        {isFichePatient ? <Fiche_Patient patient={patient} /> :
            <div className="patients-container">
                <ToastContainer />
                <div className="search-filter">
                    <form onSubmit={searchPatient}>
                        <input type="text" placeholder="Rechercher un patient" onChange={(e) => { setSearch(e.target.value) }} />
                        <button type="submit"><img src={loop} alt="loop" /></button>
                    </form>
                </div>
                <div className="patient-cards">
                    {displayPatientList.map((patient) => {
                        // Vérification si userUID correspond à user.uid
                        if (patient.user_uid === userUID) {
                            return (
                                <div className="patient-card">
                                    <img src={people} alt="people" />
                                    <div className="patient-info">
                                        <p className="patient-info-name-firstname">
                                            <span className="toUpperCaseName">{patient.patient_name} </span>
                                            <span className="capitalizeFirstName">{patient.patient_firstname}</span>
                                        </p>
                                        <p className="patient-info-birthday">Née le: {formatDate(patient.patient_birthday)}</p>
                                    </div>
                                    <div className="patient-btns">
                                        <button className="patient-btn-fiche" onClick={() => {setPatient(patient); setIsFichePatient(true)}}>
                                            Voir Fiche
                                        </button>
                                        <button className="patient-btn-document" onClick={DisplayModal}>
                                            Nouveau Document
                                        </button>
                                        {addDocumentModal ? <Add_Documents modal_state={DisplayModal} /> : null}
                                    </div>
                                </div>
                            );
                        } else {
                            return null; // Ignorer le patient s'il ne correspond pas à l'utilisateur actuel
                        }
                    })}
                </div>
            </div>
        }
    </>
    );
};

export default Patients;
