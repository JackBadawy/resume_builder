import { useEffect, useState } from "react";

interface WorkExperienceModalContentProps {
  onConfirm: (content: string[]) => void;
  onClose: () => void;
}

const WorkExperienceModalContent: React.FC<WorkExperienceModalContentProps> = ({
  onConfirm,
  onClose,
}) => {
  const [jobTitle, setJobtitle] = useState("");
  const [employer, setEmployer] = useState("");
  const [employmentPeriod, setSetEmploymentPeriod] = useState("");

  const handleConfirm = () => {
    onConfirm([jobTitle, employer, employmentPeriod]);
    onClose();
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Job Title"
        value={jobTitle}
        onChange={(e) => setJobtitle(e.target.value)}
        className="mb-2 p-1 border"
      />
      <input
        type="text"
        placeholder="Employer"
        value={employer}
        onChange={(e) => setEmployer(e.target.value)}
        className="mb-2 p-1 border"
      />
      <input
        type="text"
        placeholder="Employment Period"
        value={employmentPeriod}
        onChange={(e) => setSetEmploymentPeriod(e.target.value)}
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

export default WorkExperienceModalContent;
