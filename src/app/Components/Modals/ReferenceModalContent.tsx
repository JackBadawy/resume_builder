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
    const content = `name ${name}, phone ${phone}, position ${position}`;
    onConfirm([content]);
    onClose();
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-2 p-1 border"
      />
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="mb-2 p-1 border"
      />
      <input
        type="text"
        placeholder="Position"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        className="mb-2 p-1 border"
      />
      <div className="flex justify-end gap-4">
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
