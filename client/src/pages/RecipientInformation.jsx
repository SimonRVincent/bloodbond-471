import React from "react";

const RecipientInformation = ({ insertionResult, insertionResult2 }) => {
    console.log("insertionResult:", insertionResult);
    console.log("insertionResult2:", insertionResult2);
  
    if (!insertionResult || !insertionResult2 || insertionResult.length < 1 || insertionResult2.length < 1) {
      return <div>No recipient information found</div>;
    }
  
    return (
      <div className="recipient-info">
        <h1>Recipient Information</h1>
        <p>
          Name: {insertionResult2[0]?.First_name} {insertionResult2[0]?.Last_name}
        </p>
        <p>Blood type: {insertionResult[0]?.Blood_type}</p>
        <p>Rh factor: {insertionResult[0]?.RH_factor}</p>
        <p>Sex: {insertionResult2[0]?.Sex}</p>
        <p>Health condition: {insertionResult[0]?.Health_condition}</p>
      </div>
    );
  };

export default RecipientInformation;
