import React, { useState } from "react";
import { useResumeHeading } from "../Context/ResumeHeadingContext";

const ResumeHeading: React.FC = () => {
  const { fullName, setFullName, jobTitle, setJobTitle } = useResumeHeading();
  const [editName, setEditName] = useState<boolean>(false);
  const [editJob, setEditJob] = useState<boolean>(false);

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
        onBlur={() => setEditName(false)}
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
        onBlur={() => setEditJob(false)}
        placeholder="Click to Enter Job Title..."
        className="text-word-18 font-aptos font-bold mb-3 focus:outline-none "
        id="jobTitle"
        autoComplete="off"
        data-text
      />
      <hr className="font-bold font-black border-black" />
    </div>
  );
};

export default ResumeHeading;
