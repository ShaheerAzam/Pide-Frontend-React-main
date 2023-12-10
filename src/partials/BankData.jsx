import React, { useState, useEffect } from "react";

function BankData({ bankData }) {
  const [userId, setUserId] = useState("");
  const [director1, setDirector1] = useState("");
  const [director2, setDirector2] = useState("");
  const [director3, setDirector3] = useState("");
  const [bankImages, setBankImages] = useState([]);


const arrayOfImageName = [
    "CNIC Copy",
    "Proof of National Tax Number",
    "Letter Head Sample",
    "Rubber Stamp Sample",
    "Copy of the Partnership Deed",
    "SECP Registration/Certificate of Registration Copy",
    "Proof of Business Address",
    "Affidavit",
    "Memorandum of Articles/Association"
];

  useEffect(() => {
    setBankImages(
      Object.values(bankData)
        .map((entity) => entity.fileName)
        .filter((fileName) => fileName !== undefined)
    );
    setUserId(bankData.userId);
    setDirector1(bankData.director1);
    setDirector2(bankData.director2);
    setDirector3(bankData.director3);
  }, [bankData]);

  return (
    <div className="max-w-4xl mx-auto p-4 flex mt-20 flex-col ">
      {director1 && (
        <p className="mb-2">
          <span className="font-semibold">Director 1:</span> {director1}
        </p>
      )}
      {director2 && (
        <p className="mb-2">
          <span className="font-semibold">Director 2:</span> {director2}
        </p>
      )}
      {director3 && (
        <p className="mb-2">
          <span className="font-semibold">Director 3:</span> {director3}
        </p>
      )}

      <div className="flex flex-wrap justify-center">
        {bankImages.map((image, index) => (
          <div key={index} className="mb-8 mr-4">
            <h4 className="mb-2"> {arrayOfImageName[index]}</h4>
            <img
              src={`http://localhost:3000/images/bank/${userId}/${image}`}
              alt={`Image ${index + 1}`}
              className="w-64 h-64 object-cover"
              crossOrigin="anonymous"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BankData;
