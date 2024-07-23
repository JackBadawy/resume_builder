import { useState } from "react";

interface EducationModalContentProps {
  onConfirm: (content: string[]) => void;
  onClose: () => void;
}
interface EducationEntry {
  certification: string;
  school: string;
  timePeriod: string;
}

const EducationModalContent: React.FC<EducationModalContentProps> = ({
  onConfirm,
  onClose,
}) => {
  const [certification, setCertification] = useState<string>("");
  const [school, setSchool] = useState<string>("");
  const [timePeriod, setTimePeriod] = useState<string>("");

  const handleConfirm = () => {
    const newEntry: EducationEntry = { certification, school, timePeriod };
    onConfirm([
      `Certification: ${certification}`,
      `School: ${school}`,
      `Time Period: ${timePeriod}`,
    ]);
    onClose();
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Certification eg; bachelor of arts"
        value={certification}
        onChange={(e) => setCertification(e.target.value)}
        className="mb-2 p-1 border text-black"
      />
      <input
        type="text"
        placeholder="School"
        value={school}
        onChange={(e) => setSchool(e.target.value)}
        className="mb-2 p-1 border text-black"
      />
      <input
        type="text"
        placeholder="Position"
        value={timePeriod}
        onChange={(e) => setTimePeriod(e.target.value)}
        className="mb-2 p-1 border text-black"
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

export default EducationModalContent;
