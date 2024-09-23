import React, { useState } from "react";

interface WorkExperienceModalContentProps {
  onConfirm: (content: string[]) => void;
  onClose: () => void;
}

const WorkExperienceModalContent: React.FC<WorkExperienceModalContentProps> = ({
  onConfirm,
  onClose,
}) => {
  const [jobTitle, setJobTitle] = useState("");
  const [employer, setEmployer] = useState("");
  const [employmentPeriod, setEmploymentPeriod] = useState("");
  const [duties, setDuties] = useState<string[]>([""]);
  const [error, setError] = useState("");

  const handleAddDuty = () => {
    setDuties([...duties, ""]);
  };

  const handleDutyChange = (index: number, value: string) => {
    const newDuties = [...duties];
    newDuties[index] = value;
    setDuties(newDuties);
  };

  const validateEmploymentPeriod = (period: string): boolean => {
    const regex = /^\d{4}-\d{4}$/;
    if (!regex.test(period)) {
      setError("Employment period should be in the format YYYY-YYYY");
      return false;
    }

    const [startYear, endYear] = period.split("-").map(Number);
    if (endYear <= startYear) {
      setError("End year should be greater than start year");
      return false;
    }

    return true;
  };

  const validateAllFieldsFilled = (): boolean => {
    if (
      !jobTitle ||
      !employer ||
      !employmentPeriod ||
      duties.every((duty) => !duty.trim())
    ) {
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

    if (!validateEmploymentPeriod(employmentPeriod)) {
      return;
    }

    const content = [
      `Position: ${jobTitle}`,
      `Employer: ${employer}`,
      `Employment Period: ${employmentPeriod}`,
      "Duties:",
      ...duties.filter((duty) => duty.trim() !== "").map((duty) => `• ${duty}`),
    ];
    onConfirm(content);
    onClose();
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Job Title"
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
        className="mb-2 p-1 rounded text-center bg-slate-600 w-full"
      />
      <input
        type="text"
        placeholder="Employer"
        value={employer}
        onChange={(e) => setEmployer(e.target.value)}
        className="mb-2 p-1 rounded text-center bg-slate-600 w-full"
      />
      <input
        type="text"
        placeholder="Employment Period (YYYY-YYYY)"
        value={employmentPeriod}
        onChange={(e) => setEmploymentPeriod(e.target.value)}
        className="mb-2 p-1 rounded text-center bg-slate-600 w-full"
      />
      <div className="mb-2">
        <p className="text-white mb-1">Duties:</p>
        {duties.map((duty, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Duty ${index + 1}`}
            value={duty}
            onChange={(e) => handleDutyChange(index, e.target.value)}
            className="mb-1 p-1 rounded text-center bg-slate-600 w-full"
          />
        ))}
        <button
          onClick={handleAddDuty}
          className="mt-1 px-2 py-1 bg-bws rounded text-sm"
        >
          Add Duty
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <div className="flex justify-end gap-4 mt-2">
        <button className="px-4 py-2 rounded bg-gray-600" onClick={onClose}>
          Cancel
        </button>
        <button onClick={handleConfirm} className="px-4 py-2 bg-bws rounded">
          Confirm
        </button>
      </div>
    </div>
  );
};

export default WorkExperienceModalContent;
