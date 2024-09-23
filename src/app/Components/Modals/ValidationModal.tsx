import React from "react";

interface ValidationModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const ValidationModal: React.FC<ValidationModalProps> = ({
  isOpen,
  onClose,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 fade-in">
      <div className="bg-slate-800 p-6 rounded-lg shadow-md text-white w-96 slide-down">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Validation Error</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="text-left">
          <p className="mb-4">{message}</p>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-bws rounded hover:bg-opacity-80 transition-colors"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ValidationModal;
