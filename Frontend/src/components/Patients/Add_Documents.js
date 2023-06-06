import React, { useState } from "react";
import "../../styles/Patients.scss"
import { ToastContainer } from "react-toastify";
import upload from "../../../public/Image/upload.png"

const Add_Documents = ({ modal_state }) => {

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        setIsSelected(true);
    };

    return (
        <div className="modal">
            <div className="overlay"></div>
            <div className="modal-content">
                <form>
                    <h2 className="new-document-title">Nouveau Document</h2>
                    <div className="new-document-infos">
                        <label htmlFor="upload-file" className="document-input">Ajouter un document...</label>
                        <input id="upload-file" type="file" onChange={handleFileSelect} />
                        <img className="folder-img" src={upload} alt="upload" />
                    </div>

                    <div className="new-document-btn">
                        <button className="new-document-btn-add">
                            Ajouter
                        </button>
                        <button className="new-document-btn-cancel" onClick={modal_state}>
                            Annuler
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>)
};

export default Add_Documents;