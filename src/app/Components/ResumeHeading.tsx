import { useState } from "react";

const ResumeHeading = () => {
  const [fullname, setFullname] = useState<string>("");
  const [jobTitle, setJobTitle] = useState<string>("");
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

  const handleFocus = (thing: string) => {
    if (thing === "name" && fullname === "Click to Enter Name...") {
      setFullname("");
    }
    if (thing === "job" && jobTitle === "Click to Enter Job Title...") {
      setJobTitle("");
    }
  };

  return (
    <div className="resumeHeading text-black flex flex-col">
      <input
        value={fullname}
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
