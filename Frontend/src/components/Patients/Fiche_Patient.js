import React, { useRef, useState } from "react";
import "../../styles/Fiche_Patient.scss";
import man from "../../../public/Image/man.png"

const Fiche_Patient = ({ patient }) => {
  const [clickCoordinates, setClickCoordinates] = useState({ x: 0, y: 0 });

  const handleBodyClick = (event) => {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setClickCoordinates({ x, y });
  };

  return (
    <div className="fiche-container">
      <div className="patient-card-infos-documents">
        <div className="patient-card-infos">
          <div className="patient-card-infos-title">INFORMATIONS</div>
          <div className="patient-card-infos-name">
            <input value={patient.patient_name} />
          </div>
          <div className="patient-card-infos-firstname">
            <input value={patient.patient_firstname} />
          </div>
          <div className="patient-card-infos-birthday">
            <input value={patient.patient_birthday} />
          </div>
        </div>
        <div className="patient-card-documents">DOCUMENTS</div>
      </div>
      <div className="patient-card-dermato">
        <h1>DERMATO</h1>
        <img
          className="body-image"
          src={man}
          alt="body"
          onClick={handleBodyClick}
        />
        {clickCoordinates && (
          <div
            className="click-marker"
            style={{ top: clickCoordinates.y, left: clickCoordinates.x }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default Fiche_Patient;
