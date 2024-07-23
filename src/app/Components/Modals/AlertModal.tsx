import { useState, useEffect } from "react";
import DynamicWidthInput from "../DynamicWidthInput";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: (content?: string[]) => void;
  message: string;
  fileName?: string;
  renderContent?: () => JSX.Element;
}

const AlertModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message,
  fileName,
  renderContent,
}) => {
  const [localFileName, setLocalFileName] = useState<string>(fileName || "");

  const handleConfirm = () => {
    if (onConfirm) {
      if (fileName) {
        onConfirm([localFileName]);
      } else {
        onConfirm();
      }
    }
    onClose();
  };

  if (!isOpen) return null;

  const handleInputChange = (value: string) => {
    setLocalFileName(value);
  };

  const renderFileNameInput = () => {
    if (fileName !== undefined) {
      return (
        <div className="flex justify-center mb-4">
          <DynamicWidthInput
            value={localFileName}
            onChange={handleInputChange}
            placeholder=""
            className="bg-gray-700 text-white"
          />
          <p className="p-2 pl-1 rounded text-center min-w-[1px] outline-none">
            .docx & pdf
          </p>
        </div>
      );
    }
    return null;
  };

  const renderButtons = () => {
    return (
      <div className="flex justify-end gap-4">
        <button
          className={`px-4 py-2 rounded ${
            onConfirm ? "bg-gray-600" : "bg-bws"
          }`}
          onClick={onClose}
        >
          Cancel
        </button>
        {onConfirm && (
          <button className="px-4 py-2 bg-bws rounded" onClick={handleConfirm}>
            Confirm
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 fade-in">
      <div className="bg-slate-800 p-6 rounded-lg shadow-md text-white w-80 slide-down">
        <h2 className="text-lg font-semibold mb-2">Confirmation</h2>
        <div className="bg-slate-700 p-1 rounded mb-4 px-2">
          <p className="mb-1">{message}</p>
        </div>
        {renderContent && renderContent()}
        {renderFileNameInput()}
        {renderButtons()}
      </div>
    </div>
  );
};

export default AlertModal;
