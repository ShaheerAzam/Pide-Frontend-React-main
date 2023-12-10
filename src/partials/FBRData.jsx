import React, { useState, useEffect } from "react";

function FBRData({ fbrData }) {
  const [userId, setUserId] = useState("");
  const [natureOfBusiness, setNatureOfBusiness] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [fbrImages, setFbrImages] = useState([]);

  const arrayOfImageName = [
    "Copy of Valid CNIC",
    "Copy of Recently Paid Electricity Bill of Business Location",
    "Blank Business Letter Head",
    "Property Papers or Rental Agreement"
  ];

  useEffect(() => {
    setFbrImages(
      Object.values(fbrData)
        .map((entity) => entity.fileName)
        .filter((fileName) => fileName !== undefined)
    );
    setUserId(fbrData.userId);
    setNatureOfBusiness(fbrData.natureOfBusiness);
    setContactNumber(fbrData.contactNumber);
    setEmailAddress(fbrData.emailAddress);
  }, [fbrData]);

  return (
    <div className="max-w-4xl mx-auto mt-20 p-4">
      {contactNumber && (
        <p className="mb-2">
          <span className="font-semibold">Contact Number:</span> {contactNumber}
        </p>
      )}
      {emailAddress && (
        <p className="mb-2">
          <span className="font-semibold">Email Address:</span> {emailAddress}
        </p>
      )}
      {natureOfBusiness && (
        <p className="mb-2">
          <span className="font-semibold">Nature of Business:</span>{" "}
          {natureOfBusiness}
        </p>
      )}

      <div className="flex flex-wrap">
        {fbrImages.map((image, index) => (
          <div key={index} className="m-2 text-center">
            <h4 className="mb-2">{arrayOfImageName[index]}</h4>
            <img
              src={`http://localhost:3000/images/fbr/${userId}/${image}`}
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

export default FBRData;
