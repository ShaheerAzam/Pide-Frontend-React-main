import React, { useState } from "react";
import SECPForm from "./SECPForm";
import PSEBForm from "./PSEBForm";
import BankForm from "./BankForm";
import FBRForm from "./FBRForm";
import FBRRegistrationGuide from "./FBRGuide";
import SECPRegistrationGuide from "./SECPGuide";
import BankAccountOpeningGuide from "./BankGuide";
import PSEBRegistrationGuide from "./PSEBGuide";

const Homepage = () => {
  const [activeStep, setActiveStep] = useState(1);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return <SECPRegistrationGuide onNext={() => handleStepChange(2)} />;
      case 2:
        return <FBRRegistrationGuide onNext={() => handleStepChange(3)} />;
      case 3:
        return <BankAccountOpeningGuide onNext={() => handleStepChange(4)} />;
      case 4:
        return <PSEBRegistrationGuide onNext={() => handleStepChange(4)} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mt-20 mx-auto p-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Software House Registration Portal</h1>
        <p className="text-lg">Simplify the registration process for software houses in Pakistan.</p>
        <p className="text-lg">Assistance in navigating SECP, FBR, PSEB, and bank account procedures.</p>
      </header>

      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4">Key Features</h2>
            <ul className="list-disc pl-6 text-lg">
              <li className="mb-2">Step-by-step guides for SECP, FBR, PSEB, and bank account opening.</li>
              <li className="mb-2">Hassle-free document upload functionality.</li>
              <li className="mb-2">Clear instructions for each registration step.</li>
            </ul>
          </div>
          <div className="border p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4">How It Works</h2>
            <p className="text-lg mb-4">Follow simple steps to register your software house.</p>
            <p className="text-lg mb-4">Navigate through each process effortlessly.</p>
            <p className="text-lg mb-4">Securely submit required documents at your convenience.</p>
          </div>
        </div>
      </section>

      <h2 className="text-3xl font-bold mb-6 text-center">Registration Steps</h2>
      <div className="flex justify-center mb-8">
        <div className="flex items-center justify-between w-full">
          <StepButton
            stepNumber={1}
            isActive={activeStep === 1}
            onClick={() => handleStepChange(1)}
            label="SECP"
          />
          <StepButton
            stepNumber={2}
            isActive={activeStep === 2}
            onClick={() => handleStepChange(2)}
            label="FBR"
          />
          <StepButton
            stepNumber={3}
            isActive={activeStep === 3}
            onClick={() => handleStepChange(3)}
            label="Bank"
          />
          <StepButton
            stepNumber={4}
            isActive={activeStep === 4}
            onClick={() => handleStepChange(4)}
            label="PSEB"
          />
          {/* Add more step buttons as needed */}
        </div>
      </div>
      {renderStepContent()}
    </div>
  );
};

const StepButton = ({ stepNumber, isActive, onClick, label }) => {
  return (
    <button
      className={`${
        isActive
          ? "bg-blue-500 text-white"
          : "bg-gray-200 text-gray-600 hover:bg-gray-300"
      } px-4 py-2 rounded`}
      onClick={onClick}
    >
      Step {stepNumber}: {label}
    </button>
  );
};

export default Homepage;
