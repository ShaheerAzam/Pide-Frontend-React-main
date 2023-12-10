import React, { useState } from "react";
import axios from "axios";
import SECPFormHandler from "./SECPFormHandler";

const SECPForm = () => {
  const [showSECPFormData, setShowSECPFormData] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    officeAddress: "",
    telephoneNumber: "",
    director1: "",
    director2: "",
    director3: "",
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

    const textInputFields = document.querySelectorAll("input[type='text']");
    textInputFields.forEach((input) => {
      if (!input.value.trim()) {
        errors[input.name] = "Please enter a value.";
        isValid = false;
      } else if (
        input.name === "telephoneNumber" &&
        !/^\d+$/.test(input.value.trim())
      ) {
        errors[input.name] =
          "Please enter a valid telephone number (numbers only).";
        isValid = false;
      }
    });

    setFormErrors(errors);
    return isValid;
  };
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

    data.append("officeAddress", formData.officeAddress);
    data.append("telephoneNumber", formData.telephoneNumber);
    data.append("director1", formData.director1);
    data.append("director2", formData.director2);
    data.append("director3", formData.director3);

    formData.images.forEach((image, index) => {
      data.append(`image${index + 1}`, image);
    });

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/pideReg/secp/",
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
        setShowSECPFormData(true);
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Session Expired! Please login again.");
        window.localStorage.clear();
        window.location.href = "./SignIn";
      } else {
        console.error("Error uploading SECP docs:", error);
        alert("Something went wrong!");
      }
    }
  };

  return (
    <div>
      {showSECPFormData ? (
        <SECPFormHandler />
      ) : (
        <form
          className="max-w-4xl p-8 mx-auto mt-20 bg-white border rounded shadow-md"
          onSubmit={handleSubmit}
        >
          <h2 className="mb-6 text-2xl font-semibold">
            SECP Registration Form
          </h2>

          <div className="mb-4">
            <label
              htmlFor="cnic"
              className="block mb-2 font-medium text-gray-700"
            >
              CNIC (Upload Image)
            </label>
            <input
              type="file"
              id="cnic"
              name="image1"
              accept="image/*"
              className="w-full px-4 py-2 border rounded"
              onChange={handleImageChange}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="memorandum"
                className="block mb-2 font-medium text-gray-700"
              >
                Memorandum (Upload Image)
              </label>
              <input
                type="file"
                id="memorandum"
                name="image2"
                accept="image/*"
                className="w-full px-4 py-2 border rounded"
                onChange={handleImageChange}
              />
            </div>
            <div>
              <label
                htmlFor="complianceForm"
                className="block mb-2 font-medium text-gray-700"
              >
                Compliance Form (Upload Image)
              </label>
              <input
                type="file"
                id="complianceForm"
                name="image3"
                accept="image/*"
                className="w-full px-4 py-2 border rounded"
                onChange={handleImageChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="officeAddress"
                className="block mb-2 font-medium text-gray-700"
              >
                Office Address
              </label>
              <input
                type="text"
                id="officeAddress"
                name="officeAddress"
                className="w-full px-4 py-2 border rounded"
                placeholder="Enter Office Address"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label
                htmlFor="telephoneNumber"
                className="block mb-2 font-medium text-gray-700"
              >
                Telephone Number
              </label>
              <input
                type="text"
                id="telephoneNumber"
                name="telephoneNumber"
                className="w-full px-4 py-2 border rounded"
                placeholder="Enter Telephone Number"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label
                htmlFor="director1"
                className="block mb-2 font-medium text-gray-700"
              >
                Name of Director 1
              </label>
              <input
                type="text"
                id="director1"
                name="director1"
                className="w-full px-4 py-2 border rounded"
                placeholder="Enter Director 1 Name"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label
                htmlFor="director2"
                className="block mb-2 font-medium text-gray-700"
              >
                Name of Director 2
              </label>
              <input
                type="text"
                id="director2"
                name="director2"
                className="w-full px-4 py-2 border rounded"
                placeholder="Enter Director 2 Name"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label
                htmlFor="director3"
                className="block mb-2 font-medium text-gray-700"
              >
                Name of Director 3
              </label>
              <input
                type="text"
                id="director3"
                name="director3"
                className="w-full px-4 py-2 border rounded"
                placeholder="Enter Director 3 Name"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="feeChallan"
              className="block mb-2 font-medium text-gray-700"
            >
              Fee Challan (Upload Image)
            </label>
            <input
              type="file"
              id="feeChallan"
              name="image4"
              accept="image/*"
              className="w-full px-4 py-2 border rounded"
              onChange={handleImageChange}
            />
          </div>

          {Object.keys(formErrors).length > 0 && (
            <div className="px-4 py-3 mb-4 text-red-700 bg-red-100 border border-red-400 rounded">
              {Object.values(formErrors).map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}

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

export default SECPForm;
