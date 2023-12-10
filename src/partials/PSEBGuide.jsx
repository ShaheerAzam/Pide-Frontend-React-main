import React from 'react';

const PSEBRegistrationGuide = ({ onNext }) => {
  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Registering with PSEB - Step by Step Guide</h1>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Step 1: Gather Required Documents</h2>
        <p>Ensure you have the following documents:</p>
        <ul className="list-disc ml-8">
          <li>CNIC of all directors</li>
          <li>Attested copy of Memorandum of Understanding (SECP)</li>
          <li>Incorporation certificate (SECP)</li>
          <li>Partnership deed</li>
          <li>Firm registration certificate</li>
          <li>Fee challan</li>
          <li>Business bank statement</li>
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Step 2: Submission and Approval</h2>
        <p>Submit the required documents to PSEB. After submission, wait for the approval process.</p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Step 3: Receive License</h2>
        <p>Once approved, you'll receive the license allowing you to benefit from PSEB schemes.</p>
      </div>

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={onNext}>
        Next
      </button>
    </div>
  );
};

export default PSEBRegistrationGuide;
