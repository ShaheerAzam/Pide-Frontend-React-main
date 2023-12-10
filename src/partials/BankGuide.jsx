import React from 'react';

const BankAccountOpeningGuide = ({ onNext }) => {
  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow-lg">
      <h1 className="text-2xl font-bold mb-4">How to Open a Bank Account for Your Company</h1>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Step 1: Gather Required Documents</h2>
        <p>Ensure you have the following documents:</p>
        <ul className="list-disc ml-8">
          <li>CNIC copy of all signatories</li>
          <li>Proof of the national tax number</li>
          <li>Letterhead sample</li>
          <li>Rubber stamp sample</li>
          <li>Copy of the partnership deed</li>
          <li>SECP registration/certificate of registration copy</li>
          <li>Proof of business address</li>
          <li>Affidavit</li>
          <li>Memorandum of articles/association</li>
          <li>List of Board of Directors</li>
          <li>Licenses copy (if applicable)</li>
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Step 2: Submit the Documents</h2>
        <p>Submit the required documents to initiate the account opening process.</p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Step 3: Verification</h2>
        <p>The bank will verify the provided information and documents.</p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Step 4: Account Activation</h2>
        <p>Once all documents are verified and approved, your company's bank account will be activated.</p>
      </div>

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={onNext}>
        Next
      </button>
    </div>
  );
};

export default BankAccountOpeningGuide;
