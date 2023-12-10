import React, { useState } from "react";
import axios from "axios";

import PSEBFormHandler from "./PSEBFormHandler";

const PSEBForm = () => {
  const [showPSEBFormData, setShowPSEBFormData] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    images: [],
  });
  const validateForm = () => {
    const errors = {};
    let isValid = true;

    const inputFields = document.querySelectorAll("input[type='file']");
    inputFields.forEach((input) => {
      const files = input.files;
      if (!files || files.length === 0) {
        errors[input.name] = "Please upload a file.";
        isValid = false;
      } else {
        for (let i = 0; i < files.length; i++) {
          const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
          if (!allowedExtensions.exec(files[i].name)) {
            errors[input.name] = "Only JPG, JPEG, or PNG files are allowed.";
            isValid = false;
            break;
          }
        }
      }
    });

    setFormErrors(errors);
    return isValid;
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    setFormData({ ...formData, images: [...formData.images, ...files] });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isFormValid = validateForm();
    if (!isFormValid) {
      return;
    }
    const data = new FormData();

    formData.images.forEach((image, index) => {
      data.append(`image${index + 1}`, image);
    });

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/pideReg/pseb/",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${JSON.parse(
              window.localStorage.getItem("token")
            )}`,
          },
        }
      );

      if (response.status === 201) {
        setShowPSEBFormData(true);
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Session Expired! Please login again.");
        window.localStorage.clear();
        window.location.href = "./SignIn";
      } else {
        console.error("Error uploading PSEB docs:", error);
        alert("Something went wrong!");
      }
    }
  };

  return (
    <div  className="max-w-4xl p-8 mx-auto mt-20 bg-white border rounded shadow-md">
      {showPSEBFormData ? (
        <PSEBFormHandler />
      ) : (
    <form
      className="max-w-4xl p-8 mx-auto mt-20 bg-white border rounded shadow-md"
      onSubmit={handleSubmit}
    >
      <h2 className="mb-6 text-lg font-semibold text-center">
        PSEB Registration Form
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="mb-4">
          <label
            htmlFor="cnicDirectors"
            className="block mb-1 font-medium text-gray-700"
          >
            CNIC of Director (Upload Image)
          </label>
          <input
            type="file"
            id="cnicDirectors"
            name="image1"
            accept="image/*"
            className="w-full px-3 py-2 border rounded"
            onChange={handleImageChange}
          />
        </div>
        {/* Add other file input fields similarly */}
        <div className="mb-4">
          <label
            htmlFor="mouSECP"
            className="block mb-1 font-medium text-gray-700"
          >
            Attested Copy of M0U (SECP) (Upload Image)
          </label>
          <input
            type="file"
            id="mouSECP"
            name="image2"
            accept="image/*"
            className="w-full px-3 py-2 border rounded"
            onChange={handleImageChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="incorporationCertificate"
            className="block mb-1 font-medium text-gray-700"
          >
            Incorporation Certificate (SECP) (Upload Image)
          </label>
          <input
            type="file"
            id="incorporationCertificate"
            name="image3"
            accept="image/*"
            className="w-full px-3 py-2 border rounded"
            onChange={handleImageChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="partnershipDeed"
            className="block mb-1 font-medium text-gray-700"
          >
            Partnership Deed (Upload Image)
          </label>
          <input
            type="file"
            id="partnershipDeed"
            name="image4"
            accept="image/*"
            className="w-full px-3 py-2 border rounded"
            onChange={handleImageChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="firmRegistrationCertificate"
            className="block mb-1 font-medium text-gray-700"
          >
            Firm Registration Certificate (Upload Image)
          </label>
          <input
            type="file"
            id="firmRegistrationCertificate"
            name="image5"
            accept="image/*"
            className="w-full px-3 py-2 border rounded"
            onChange={handleImageChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="feeChallanPSEB"
            className="block mb-1 font-medium text-gray-700"
          >
            Fee Challan (Upload Image)
          </label>
          <input
            type="file"
            id="feeChallanPSEB"
            name="image6"
            accept="image/*"
            className="w-full px-3 py-2 border rounded"
            onChange={handleImageChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="businessBankStatement"
            className="block mb-1 font-medium text-gray-700"
          >
            Business Bank Statement (Upload Image)
          </label>
          <input
            type="file"
            id="businessBankStatement"
            name="image7"
            accept="image/*"
            className="w-full px-3 py-2 border rounded"
            onChange={handleImageChange}
          />
        </div>
      </div>

      {Object.keys(formErrors).map((fieldName, index) => {
        return (
          <div key={index} className="text-red-500">
            {formErrors[fieldName]}
          </div>
        );
      })}

      <div className="flex justify-center">
        <button
          type="submit"
          className="px-6 py-3 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
        >
          Submit
        </button>
      </div>
    </form>
    )}
    </div>
  );
};

export default PSEBForm;
