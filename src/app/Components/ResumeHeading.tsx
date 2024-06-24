import { useState } from "react";

const ResumeHeading = () => {
  const [fullname, setFullname] = useState<string>("Click to Enter Name...");
  const [jobTitle, setJobTitle] = useState<string>(
    "Click to Enter Job Title..."
  );
  const [editName, setEditName] = useState<boolean>(false);
  const [editJob, setEditJob] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    thing: string
  ) => {
    if (thing === "name") {
      setFullname(e.target.value);
    }
    if (thing === "job") {
      setJobTitle(e.target.value);
    }
  };

  return (
    <div className="resumeHeading text-black">
      <input
        value={fullname}
        onChange={(e) => handleChange(e, "name")}
        onBlur={() => setEditName(false)}
        className="text-word-20 font-aptos"
      />

      <input
        value={jobTitle}
        onChange={(e) => handleChange(e, "job")}
        onBlur={() => setEditJob(false)}
        className="text-word-20 font-aptos"
      />
    </div>
  );
};

export default ResumeHeading;
