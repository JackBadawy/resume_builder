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
      <button
        onClick={handleConfirm}
        className="bg-bws text-white p-2 px-4 rounded-full mx-4 mb-4"
      >
        +
      </button>
    </div>
  );
};

export default ReferenceModalContent;
