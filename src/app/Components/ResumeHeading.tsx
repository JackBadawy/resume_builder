import { useState } from "react";
import { useResumeHeading } from "../Context/ResumeHeadingContext";
import ValidationModal from "../Components/Modals/ValidationModal";

const ResumeHeading: React.FC = () => {
  const { fullName, setFullName, jobTitle, setJobTitle } = useResumeHeading();
  const [editName, setEditName] = useState<boolean>(false);
  const [editJob, setEditJob] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const validateName = (name: string) => {
    if (name.trim().length === 0) {
      setValidationError("Name cannot be empty.");
      return false;
    }
    return true;
  };

  const validateJobTitle = (title: string) => {
    if (title.trim().length === 0) {
      setValidationError("Job title cannot be empty.");
      return false;
    }
    return true;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    if (field === "name") {
      setFullName(e.target.value);
    }
    if (field === "job") {
      setJobTitle(e.target.value);
    }
  };

  const handleBlur = (field: string) => {
    if (field === "name") {
      if (validateName(fullName)) {
        setEditName(false);
      }
    }
    if (field === "job") {
      if (validateJobTitle(jobTitle)) {
        setEditJob(false);
      }
    }
  };

  const handleFocus = (field: string) => {
    if (field === "name" && fullName === "Click to Enter Name...") {
      setFullName("");
    }
    if (field === "job" && jobTitle === "Click to Enter Job Title...") {
      setJobTitle("");
    }
  };

  return (
    <div className="resumeHeading text-black flex flex-col">
      <input
        value={fullName}
        onChange={(e) => handleChange(e, "name")}
        onFocus={() => handleFocus("name")}
        onBlur={() => handleBlur("name")}
        placeholder="Click to Enter Name..."
        className="text-word-25 font-aptos font-bold focus:outline-none"
        id="fullName"
        autoComplete="off"
        data-text
      />

      <input
        value={jobTitle}
        onChange={(e) => handleChange(e, "job")}
        onFocus={() => handleFocus("job")}
        onBlur={() => handleBlur("job")}
        placeholder="Click to Enter Job Title..."
        className="text-word-18 font-aptos font-bold mb-3 focus:outline-none "
        id="jobTitle"
        autoComplete="off"
        data-text
      />
      <hr className="font-bold font-black border-black" />
      <ValidationModal
        isOpen={!!validationError}
        onClose={() => setValidationError(null)}
        message={validationError || ""}
      />
    </div>
  );
};

export default ResumeHeading;
