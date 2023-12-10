import React from 'react';

const FBRRegistrationGuide = ({ onNext }) => {
  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow-lg">
      <h1 className="text-2xl font-bold mb-4">How to Register with FBR</h1>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Step 1: Gather Required Documents</h2>
        <p>Prepare the following documents:</p>
        <ul className="list-disc ml-8">
          <li>Valid CNIC</li>
          <li>Copy of Recently Paid Electricity Bill of Business Location</li>
          <li>Blank Business Letter Head</li>
          <li>Property Papers or Rental Agreement</li>
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Step 2: Application Submission</h2>
        <p>Submit the documents to the Federal Board of Revenue (FBR) for the national tax number (NTN).</p>
      </div>

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={onNext}>
        Next
      </button>
    </div>
  );
};

export default FBRRegistrationGuide;
