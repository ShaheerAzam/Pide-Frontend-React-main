import React, { useState, useEffect } from "react";

function PSEBData({ psebData }) {
  const arrayOfImageName = [
    "CNIC of Director",
    "Attested Copy of M0U",
    "Incorporation Certificate",
    "Partnership Deed",
    "Firm Registration Certificate",
    "Fee Challan",
    "Business Bank Statement"
  ];

  const [userId, setUserId] = useState("");
  const [psebImages, setPsebImages] = useState([]);

  useEffect(() => {
    setPsebImages(
      Object.values(psebData)
        .map((entity) => entity.fileName)
        .filter((fileName) => fileName !== undefined)
    );
    setUserId(psebData.userId);
  }, [psebData]);

  return (
    <div className="max-w-4xl mt-20 mx-auto p-4">
      <div className="grid grid-cols-2 gap-4">
        {psebImages.map((image, index) => (
          <div key={index} className="mb-4">
            <h4 className="mb-2">{arrayOfImageName[index]}</h4>
            <img
              src={`http://localhost:3000/images/pseb/${userId}/${image}`}
              alt={`Image ${index + 1}`}
              className="w-full h-auto"
              crossOrigin="anonymous"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PSEBData;
