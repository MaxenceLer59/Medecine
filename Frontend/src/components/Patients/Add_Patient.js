import React, {useState} from "react";
import "../../styles/Patients.scss"

const Add_Patient = (modal_state) => {

    const [addPatientModal, setAddPatientModal] = useState(modal_state);
    const [patientInfos, setPatientInfos] = useState({
        patient_name: "",
        patient_firstname: "",
        patient_birthday: "",
        patient_phone: "",
    })

    return (
        <>
            {addPatientModal ?
                <div className="modal">
                    <div
                        onClick={() => setAddPatientModal(false)}
                        className="overlay"
                    ></div>
                    <div className="modal-content">
                        <form>
                            <h3>Ajout d'un Patient</h3>
                            <input
                                type="text"
                                placeholder="Nom"
                                onChange={(e) => {
                                    setPatientInfos({
                                        ...patientInfos,
                                        patient_name: e.value
                                    })
                                }}
                            />
                            <input
                                type="text"
                                placeholder="Prénom"
                                onChange={(e) => {
                                    setPatientInfos({
                                        ...patientInfos,
                                        patient_firstname: e.value
                                    })
                                }}
                            />
                            <input
                                type="date"
                                onChange={(e) => {
                                    setPatientInfos({
                                        ...patientInfos,
                                        patient_birthday: e.value
                                    })
                                }}
                            />
                            <input
                                type="tel"
                                placeholder="06..."
                                onChange={(e) => {
                                    setPatientInfos({
                                        ...patientInfos,
                                        patient_phone: e.value
                                    })
                                }}
                            />
                            <button type="submit">
                                Ajouter Patient
                            </button>
                        </form>
                    </div>
                </div>
                :
                null}
        </>
    )
}

export default Add_Patient;