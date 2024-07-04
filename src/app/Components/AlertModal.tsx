import { useState, useEffect } from "react";
import { useFileContext } from "../Context/FileContext";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (fileName?: string) => void | Promise<void>;
  message: string;
  fileName?: string;
}

const AlertModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message,
  fileName,
}) => {
  const { fileName: contextFileName, setFileName } = useFileContext();
  const [localFileName, setLocalFileName] = useState<string>(contextFileName);

  useEffect(() => {
    setLocalFileName(contextFileName);
  }, [contextFileName]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (fileName !== undefined) {
      setFileName(localFileName);
      onConfirm(localFileName);
    } else {
      onConfirm();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalFileName(e.target.value);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 fade-in">
      <div className="bg-slate-800 p-6 rounded-lg shadow-md text-white w-80 slide-down">
        <h2 className="text-lg font-semibold mb-2">Confirmation</h2>
        <div className="bg-slate-700 p-1 rounded mb-4 px-2">
          <p className="mb-1">{message}</p>
        </div>
        {fileName !== undefined && (
          <input
            type="text"
            value={localFileName}
            onChange={handleInputChange}
            className="w-full bg-gray-700 p-2 rounded mb-4 text-white"
          />
        )}
        <div className="flex justify-end gap-4">
          <button className="px-4 py-2 bg-gray-600 rounded" onClick={onClose}>
            Cancel
          </button>
          <button className="px-4 py-2 bg-bws rounded" onClick={handleConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
