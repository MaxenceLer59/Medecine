import React from "react";
import "../../styles/Patients.scss"
import { ToastContainer } from "react-toastify";

const Add_Documents = ({modal_state}) => {

    return (
        <div className="modal">
            <div onClick={modal_state} className="overlay" />
            <div className="modal-content">
                <form>
                    <h2 className="new-patient-title">Nouveau Document</h2>
                    <div className="new-patient-infos">
                        <input type="file" />
                    </div>
                    <div className="new-patient-btn">
                        <button className="new-patient-btn-add">
                            Ajouter
                        </button>
                        <button className="new-patient-btn-cancel" onClick={modal_state}>
                            Annuler
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>)
};

export default Add_Documents;