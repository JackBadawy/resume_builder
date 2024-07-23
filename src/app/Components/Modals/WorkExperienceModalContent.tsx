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
      <button
        onClick={handleConfirm}
        className="bg-bws text-white p-2 px-4 rounded-full mx-4 mb-4"
      >
        +
      </button>
    </div>
  );
};

export default WorkExperienceModalContent;
