import React, { useState } from "react";
import axios from "axios";
import BankFormHandler from "./BankFormHandler";

const BankForm = () => {
  const [showBankFormData, setShowBankFormData] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
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

    data.append("director1", formData.director1);
    data.append("director2", formData.director2);
    data.append("director3", formData.director3);

    formData.images.forEach((image, index) => {
      data.append(`image${index + 1}`, image);
    });

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/pideReg/bank/",
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
        setShowBankFormData(true);
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Session Expired! Please login again.");
        window.localStorage.clear();
        window.location.href = "./SignIn";
      } else {
        console.error("Error uploading bank docs:", error);
        alert("Something went wrong!");
      }
    }
  };

  return (
    <div  className="max-w-4xl p-8 mx-auto mt-20 bg-white border rounded shadow-md">
      {showBankFormData ? (
        <BankFormHandler />
      ) : (
    <form
      className="max-w-4xl p-8 mx-auto mt-20 bg-white border rounded shadow-md"
      onSubmit={handleSubmit}
    >
      <h2 className="mb-6 text-lg font-semibold text-center">
        Bank Registration Form
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="mb-4">
          <label
            htmlFor="cnicCopy"
            className="block mb-1 font-medium text-gray-700"
          >
            CNIC Copy(Upload Image)
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
            htmlFor="nationalTaxProof"
            className="block mb-1 font-medium text-gray-700"
          >
            Proof of National Tax Number (Upload Image)
          </label>
          <input
            type="file"
            id="nationalTaxProof"
            name="image2"
            accept="image/*"
            className="w-full px-3 py-2 border rounded"
            onChange={handleImageChange}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="letterHeadSample"
            className="block mb-1 font-medium text-gray-700"
          >
            Letter Head Sample (Upload Image)
          </label>
          <input
            type="file"
            id="letterHeadSample"
            name="image3"
            accept="image/*"
            className="w-full px-3 py-2 border rounded"
            onChange={handleImageChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="rubberStampSample"
            className="block mb-1 font-medium text-gray-700"
          >
            Rubber Stamp Sample (Upload Image)
          </label>
          <input
            type="file"
            id="rubberStampSample"
            name="image4"
            accept="image/*"
            className="w-full px-3 py-2 border rounded"
            onChange={handleImageChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="partnershipDeedCopy"
            className="block mb-1 font-medium text-gray-700"
          >
            Copy of the Partnership Deed (Upload Image)
          </label>
          <input
            type="file"
            id="partnershipDeedCopy"
            name="image5"
            accept="image/*"
            className="w-full px-3 py-2 border rounded"
            onChange={handleImageChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="secpRegistrationCopy"
            className="block mb-1 font-medium text-gray-700"
          >
            SECP Registration/Certificate of Registration Copy (Upload Image)
          </label>
          <input
            type="file"
            id="secpRegistrationCopy"
            name="image6"
            accept="image/*"
            className="w-full px-3 py-2 border rounded"
            onChange={handleImageChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="businessAddressProof"
            className="block mb-1 font-medium text-gray-700"
          >
            Proof of Business Address (Upload Image)
          </label>
          <input
            type="file"
            id="businessAddressProof"
            name="image7"
            accept="image/*"
            className="w-full px-3 py-2 border rounded"
            onChange={handleImageChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="affidavitCopy"
            className="block mb-1 font-medium text-gray-700"
          >
            Affidavit (Upload Image)
          </label>
          <input
            type="file"
            id="affidavitCopy"
            name="image8"
            accept="image/*"
            className="w-full px-3 py-2 border rounded"
            onChange={handleImageChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="articlesMemorandumCopy"
            className="block mb-1 font-medium text-gray-700"
          >
            Memorandum of Articles/Association (Upload Image)
          </label>
          <input
            type="file"
            id="articlesMemorandumCopy"
            name="image9"
            className="w-full px-3 py-2 border rounded"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="mb-4">
          <label
            htmlFor="director1"
            className="block mb-1 font-medium text-gray-700"
          >
            Director 1
          </label>
          <input
            type="text"
            id="director1"
            name="director1"
            className="w-full px-3 py-2 border rounded"
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="director2"
            className="block mb-1 font-medium text-gray-700"
          >
            Director 2
          </label>
          <input
            type="text"
            id="director2"
            name="director2"
            className="w-full px-3 py-2 border rounded"
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="director3"
            className="block mb-1 font-medium text-gray-700"
          >
            Director 3
          </label>
          <input
            type="text"
            id="director3"
            name="director3"
            className="w-full px-3 py-2 border rounded"
            onChange={handleInputChange}
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
          className="px-6 py-3 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none "
        >
          Submit
        </button>
      </div>
    </form>
    )}
    </div>
  );
};

export default BankForm;
