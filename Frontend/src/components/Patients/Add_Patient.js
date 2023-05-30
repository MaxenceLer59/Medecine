import React, { useContext, useState } from "react";
import { db } from "../../../../config/firebase-config";
import { ref, set } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';
import "../../styles/Patients.scss";
import { UserContext } from "../../../../config/userContext";
import { ToastContainer, toast } from "react-toastify";

const Add_Patient = (modal_state) => {

    const [addPatientModal, setAddPatientModal] = useState(modal_state);
    const [patientInfos, setPatientInfos] = useState({
        user_uid: useContext(UserContext).userUID,
        patient_name: "",
        patient_firstname: "",
        patient_birthday: "",
        patient_phone: "",
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
            if (patientInfos.patient_name !== "" && patientInfos.patient_firstname !== "") {
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
                toast.error('Le nom et le prénom ne doivent pas être vide !', toastOptions)
            }
        } catch (err) {
            throw err;
        }
    }

    return (
        <>
            {addPatientModal ?
                <div className="modal">
                    <div
                        onClick={() => setAddPatientModal(false)}
                        className="overlay"
                    ></div>
                    <div className="modal-content">
                        <form onSubmit={add_patient_to_firestore_database}>
                            <h3>Ajout d'un Patient</h3>
                            <input
                                type="text"
                                placeholder="Nom"
                                onChange={(e) => {
                                    setPatientInfos({
                                        ...patientInfos,
                                        patient_name: e.target.value.toString()
                                    })
                                }}
                            />
                            <input
                                type="text"
                                placeholder="Prénom"
                                onChange={(e) => {
                                    setPatientInfos({
                                        ...patientInfos,
                                        patient_firstname: e.target.value.toString()
                                    })
                                }}
                            />
                            <input
                                type="date"
                                onChange={(e) => {
                                    setPatientInfos({
                                        ...patientInfos,
                                        patient_birthday: e.target.value.toString()
                                    })
                                }}
                            />
                            <input
                                type="tel"
                                placeholder="06..."
                                onChange={(e) => {
                                    setPatientInfos({
                                        ...patientInfos,
                                        patient_phone: e.target.value.toString()
                                    })
                                }}
                            />
                            <button type="submit">
                                Ajouter Patient
                            </button>
                        </form>
                    </div>
                    <ToastContainer />
                </div>
                :
                null}
        </>
    )
}

export default Add_Patient;