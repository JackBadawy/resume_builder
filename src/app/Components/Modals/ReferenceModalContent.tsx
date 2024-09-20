import { useEffect, useState } from "react";

interface ReferenceModalContentProps {
  onConfirm: (content: string[]) => void;
  onClose: () => void;
}

const ReferenceModalContent: React.FC<ReferenceModalContentProps> = ({
  onConfirm,
  onClose,
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");

  const handleConfirm = () => {
    const content = [
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Position: ${position}`,
    ];
    onConfirm(content);
    onClose();
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-2 p-1 rounded text-center bg-slate-600 w-full"
      />
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="mb-2 p-1 rounded text-center bg-slate-600 w-full"
      />
      <input
        type="text"
        placeholder="Position"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        className="mb-2 p-1 rounded text-center bg-slate-600 w-full"
      />
      <div className="flex justify-end gap-4 mt-2">
        <button
          className={`px-4 py-2 rounded ${"bg-gray-600"}`}
          onClick={onClose}
        >
          Cancel
        </button>
        <button onClick={handleConfirm} className="px-4 py-2 bg-bws rounded">
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ReferenceModalContent;
