import React from 'react';

const SECPRegistrationGuide = ({ onNext }) => {
  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow-lg">
      <h1 className="text-2xl font-bold mb-4">How to Register with SECP</h1>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Step 1: Prepare Required Documents</h2>
        <p>Gather the following documents:</p>
        <ul className="list-disc ml-8">
          <li>Identity Card</li>
          <li>Memorandum Certificate</li>
          <li>Compliance Form</li>
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Step 2: Provide Company Information</h2>
        <p>Fill in the necessary company details:</p>
        <ul className="list-disc ml-8">
          <li>Office Address</li>
          <li>Telephone Contact</li>
          <li>Names of All Directors</li>
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Step 3: Fee Challan Submission</h2>
        <p>Submit the required fee challan along with the documents mentioned above.</p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Step 4: Submission</h2>
        <p>Compile all documents and submit them to the Security Exchange Commission of Pakistan (SECP).</p>
      </div>

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={onNext}>
        Next
      </button>
    </div>
  );
};

export default SECPRegistrationGuide;
