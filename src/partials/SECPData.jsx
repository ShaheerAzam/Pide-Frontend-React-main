import React, { useState, useEffect } from "react";

function SECPData({ secpData }) {
  const [userId, setUserId] = useState("");
  const [officeAddress, setOfficeAddress] = useState("");
  const [telephoneNumber, setTelephoneNumber] = useState("");
  const [director1, setDirector1] = useState("");
  const [director2, setDirector2] = useState("");
  const [director3, setDirector3] = useState("");
  const [secpImages, setSecpImages] = useState([]);

  const arrayOfImageName = [
    "CNIC",
    "Memorandum",
    "Compliance Form",
    "Fee Challan",
  ];

  useEffect(() => {
    setSecpImages(
      Object.values(secpData)
        .map((entity) => entity.fileName)
        .filter((fileName) => fileName !== undefined)
    );

    setUserId(secpData.userId);
    setDirector1(secpData.director1);
    setDirector2(secpData.director2);
    setDirector3(secpData.director3);
    setOfficeAddress(secpData.officeAddress);
    setTelephoneNumber(secpData.telephoneNumber);
  }, [secpData]);

  return (
    <div className="max-w-4xl mt-20 mx-auto p-4">
      {telephoneNumber && (
        <p className="mb-2">
          <span className="font-semibold">Telephone Number:</span>{" "}
          {telephoneNumber}
        </p>
      )}
      {officeAddress && (
        <p className="mb-2">
          <span className="font-semibold">Office Address:</span>{" "}
          {officeAddress}
        </p>
      )}
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

      <div className="flex flex-wrap">
        {secpImages.map((image, index) => (
          <div key={index} className="text-center mr-4 mb-4">
            <h4 className="mb-2">{arrayOfImageName[index]}</h4>
            <img
              src={`http://localhost:3000/images/secp/${userId}/${image}`}
              alt={`Image ${index + 1}`}
              className="w-48 h-48 object-cover mx-auto"
              crossOrigin="anonymous"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SECPData;
