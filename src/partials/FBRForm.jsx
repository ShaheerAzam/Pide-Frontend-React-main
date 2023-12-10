import React, { useState } from "react";
import axios from "axios";
import FBRFormHandler from "./FBRFormHandler";

const FBRForm = () => {
  const [showFBRFormData, setShowFBRFormData] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    contactNumber: "",
    emailAddress: "",
    natureOfBusiness: "",
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
      }
    });

    const textInputFields = document.querySelectorAll("input[type='text']");
    textInputFields.forEach((input) => {
      if (!input.value.trim()) {
        errors[input.name] = "Please enter a value.";
        isValid = false;
      }
    });

    const emailAddress = document.getElementById("emailAddress");
    if (emailAddress && !/\S+@\S+\.\S+/.test(emailAddress.value)) {
      errors["emailAddress"] = "Please enter a valid email address.";
      isValid = false;
    }

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

    data.append("contactNumber", formData.contactNumber);
    data.append("emailAddress", formData.emailAddress);
    data.append("natureOfBusiness", formData.natureOfBusiness);

    formData.images.forEach((image, index) => {
      data.append(`image${index + 1}`, image);
    });

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/pideReg/fbr/",
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
        setShowFBRFormData(true);
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Session Expired! Please login again.");
        window.localStorage.clear();
        window.location.href = "./SignIn";
      } else {
        console.error("Error uploading FBR docs:", error);
        alert("Something went wrong!");
      }
    }
  };

  return (
    <div>
      {showFBRFormData ? (
        <FBRFormHandler />
      ) : (
        <form
          className="max-w-4xl p-8 mx-auto mt-20 bg-white border rounded shadow-md"
          onSubmit={handleSubmit}
        >
          <h2 className="mb-6 text-lg font-semibold text-center">
            FBR Registration Form
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="mb-4">
              <label
                htmlFor="cnicCopy"
                className="block mb-1 font-medium text-gray-700"
              >
                Copy of Valid CNIC (Upload Image)
              </label>
              <input
                type="file"
                id="cnicCopy"
                name="image1"
                accept="image/*"
                className="w-full px-3 py-2 border rounded"
                onChange={handleImageChange}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="electricityBill"
                className="block mb-1 font-medium text-gray-700"
              >
                Copy of Recently Paid Electricity Bill of Business Location
                (Upload Image)
              </label>
              <input
                type="file"
                id="electricityBill"
                name="image2"
                accept="image/*"
                className="w-full px-3 py-2 border rounded"
                onChange={handleImageChange}
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="businessLetterHead"
              className="block mb-1 font-medium text-gray-700"
            >
              Blank Business Letter Head (Upload Image)
            </label>
            <input
              type="file"
              id="businessLetterHead"
              name="image3"
              accept="image/*"
              className="w-full px-3 py-2 border rounded"
              onChange={handleImageChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="propertyPapers"
              className="block mb-1 font-medium text-gray-700"
            >
              Property Papers or Rental Agreement (Rental Agreement printed on
              Rs. 200/- stamp paper) (Upload Image)
            </label>
            <input
              type="file"
              id="propertyPapers"
              name="image4"
              accept="image/*"
              className="w-full px-3 py-2 border rounded"
              onChange={handleImageChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="contactNumbers"
              className="block mb-1 font-medium text-gray-700"
            >
              Contact Numbers (Landline)
            </label>
            <input
              type="text"
              id="contactNumbers"
              name="contactNumber"
              className="w-full px-3 py-2 border rounded"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="emailAddress"
              className="block mb-1 font-medium text-gray-700"
            >
              Valid Email Address
            </label>
            <input
              type="text"
              id="emailAddress"
              name="emailAddress"
              className="w-full px-3 py-2 border rounded"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="natureOfBusiness"
              className="block mb-1 font-medium text-gray-700"
            >
              Nature of Business
            </label>
            <input
              type="text"
              id="natureOfBusiness"
              name="natureOfBusiness"
              className="w-full px-3 py-2 border rounded"
              onChange={handleInputChange}
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
export default FBRForm;
