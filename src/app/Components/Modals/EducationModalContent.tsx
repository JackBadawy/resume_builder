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
        className="mb-2 p-1 rounded text-center bg-slate-600 w-full"
      />
      <input
        type="text"
        placeholder="School"
        value={school}
        onChange={(e) => setSchool(e.target.value)}
        className="mb-2 p-1 rounded text-center bg-slate-600 w-full"
      />
      <input
        type="text"
        placeholder="Position"
        value={timePeriod}
        onChange={(e) => setTimePeriod(e.target.value)}
        className="mb-2 p-1 rounded text-center bg-slate-600 w-full"
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

export default EducationModalContent;
