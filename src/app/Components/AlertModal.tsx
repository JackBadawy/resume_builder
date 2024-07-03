interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 fade-in">
      <div className="bg-slate-800 p-6 rounded-lg shadow-md text-white w-80 slide-down">
        <h2 className="text-lg font-semibold mb-2">Confirmation</h2>
        <div className="bg-slate-700 p-1 rounded mb-4 px-2">
          <p className="mb-1">{message}</p>
        </div>
        <div className="flex justify-end gap-4">
          <button className="px-4 py-2 bg-gray-600 rounded" onClick={onClose}>
            Cancel
          </button>
          <button className="px-4 py-2 bg-bws rounded" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
