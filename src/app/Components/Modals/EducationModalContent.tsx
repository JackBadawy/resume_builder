import { useState } from "react";

interface EducationModalContentProps {
  onConfirm: (content: string[]) => void;
  onClose: () => void;
}

const EducationModalContent: React.FC<EducationModalContentProps> = ({
  onConfirm,
  onClose,
}) => {
  const [certification, setCertification] = useState<string>("");
  const [school, setSchool] = useState<string>("");
  const [timePeriod, setTimePeriod] = useState<string>("");
  const [error, setError] = useState<string>("");

  const validateStudyPeriod = (period: string): boolean => {
    const regex = /^\d{4}-\d{4}$|^\d{4}-Present$/i;
    if (!regex.test(period)) {
      setError(
        "Study period should be in the format YYYY-YYYY or YYYY-Present"
      );
      return false;
    }

    if (period.toLowerCase() !== "present") {
      const [startYear, endYear] = period.split("-").map(Number);
      if (endYear <= startYear) {
        setError("End year should be greater than start year");
        return false;
      }
    }

    return true;
  };

  const validateAllFieldsFilled = (): boolean => {
    if (!certification.trim() || !school.trim() || !timePeriod.trim()) {
      setError("Please fill in all fields");
      return false;
    }
    return true;
  };

  const handleConfirm = () => {
    setError("");

    if (!validateAllFieldsFilled()) {
      return;
    }

    if (!validateStudyPeriod(timePeriod)) {
      return;
    }

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
        placeholder="Certification e.g., Bachelor of Arts"
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
        placeholder="Study Period (YYYY-YYYY or YYYY-Present)"
        value={timePeriod}
        onChange={(e) => setTimePeriod(e.target.value)}
        className="mb-2 p-1 rounded text-center bg-slate-600 w-full"
      />
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
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
