import React from "react";

const BloodRequestInfo = ({ result }) => {
  
    // if (!result insertionResult.length < 1 || insertionResult2.length < 1) {
    //   return <div>No recipient information found</div>;
    // }
  
    return (
        <div className="bloodRequest">
        <h3>Blood ID: {result[0].Blood_ID}</h3>
        <h3>Blood group: {result[0].Blood_group}</h3>
        <h3>RH factor: {result[0].RH_factor}</h3>
        <h3>Volume: {result[0].Blood_volume}mL</h3>
        <h3>Red blood cells: {result[0].Red_blood_cells}</h3>
        <h3>White blood cells: {result[0].White_blood_cells}</h3>
        <h3>Platelets: {result[0].Platelets}</h3>
        <h3>Status: {result[0].Blood_status}</h3>

      </div>
    );
  };

export default BloodRequestInfo;