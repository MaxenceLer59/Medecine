import React, { useContext, useState } from "react";
import { db } from "../../../../config/firebase-config";
import { ref, set } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';
import "../../styles/Patients.scss";
import { UserContext } from "../../../../config/userContext";
import { ToastContainer, toast } from "react-toastify";

const Add_Patient = ({ modal_state }) => {

    const [patientInfos, setPatientInfos] = useState({
        user_uid: useContext(UserContext).userUID,
        patient_name: "",
        patient_firstname: "",
        patient_birthday: "",
    })

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    const add_patient_to_firestore_database = async (e) => {
        try {
            e.preventDefault();
            if (patientInfos.patient_name !== "" && patientInfos.patient_firstname !== "" && patientInfos.patient_birthday !== "") {
                const patientId = uuidv4();
                set(ref(db, 'patients/' + patientId), patientInfos)
                    .then(
                        () => {
                            toast.success(`${patientInfos.patient_name.toUpperCase()} ${patientInfos.patient_firstname} à bien été ajouté !`);
                        })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(errorCode, errorMessage);
                        toast.error('Une erreur est survenue veuillez recommencer.', toastOptions)
                    });;
            } else {
                toast.error('Les champs ne doivent pas être vide !', toastOptions)
            }
        } catch (err) {
            throw err;
        }
    }

    return (
        <div className="modal">
            <div onClick={modal_state} className="overlay" />
            <div className="modal-content">
                <form onSubmit={add_patient_to_firestore_database}>
                    <h2 className="new-patient-title">Nouveau Patient</h2>
                    <div className="new-patient-infos">
                        <input
                            type="text"
                            placeholder="Nom*"
                            onChange={(e) => {
                                setPatientInfos({
                                    ...patientInfos,
                                    patient_name: e.target.value.toUpperCase().toString()
                                })
                            }}
                        />
                        <input
                            type="text"
                            placeholder="Prénom*"
                            onChange={(e) => {
                                setPatientInfos({
                                    ...patientInfos,
                                    patient_firstname: e.target.value.toLowerCase().toString()
                                })
                            }}
                        />
                        <input
                            type="date"
                            placeholder="(jj/mm/aaaa)*"
                            onChange={(e) => {
                                setPatientInfos({
                                    ...patientInfos,
                                    patient_birthday: e.target.value.toString()
                                })
                            }}
                        />
                    </div>
                    <div className="new-patient-btn">
                        <button className="new-patient-btn-add" onClick={add_patient_to_firestore_database}>
                            Ajouter
                        </button>
                        <button className="new-patient-btn-cancel" onClick={modal_state}>
                            Annuler
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Add_Patient;