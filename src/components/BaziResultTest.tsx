import React from 'react';

interface BaziResultTestProps {
  onBack: () => void;
}

const BaziResultTest: React.FC<BaziResultTestProps> = ({ onBack }) => {
  console.log('TEST COMPONENT IS RUNNING!');
  
  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        TEST COMPONENT IS RENDERING!
      </h1>
      <button
        onClick={onBack}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
      >
        Back
      </button>
    </div>
  );
};

export default BaziResultTest;
