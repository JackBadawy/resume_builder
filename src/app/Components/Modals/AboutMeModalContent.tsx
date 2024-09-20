import { useEffect, useState } from "react";
import SelectionCarosel from "../SelectionCarosel";
import { useResumeHeading } from "@/app/Context/ResumeHeadingContext";

interface AboutMeModalContentProps {
  onConfirm: (content: string[]) => void;
  onClose: () => void;
}

const AboutMeModalContent: React.FC<AboutMeModalContentProps> = ({
  onConfirm,
  onClose,
}) => {
  const { fullName, jobTitle } = useResumeHeading();

  useEffect(() => {
    console.log("jobTitle: ", jobTitle);
  }, [jobTitle]);

  const handleConfirm = () => {
    onConfirm([]);
    onClose();
  };

  return (
    <div>
      <SelectionCarosel
        fullName={fullName}
        jobTitle={jobTitle}
        onConfirm={onConfirm}
      />

      <div className="flex justify-end gap-4">
        <button
          className={`px-4 py-2 rounded ${"bg-gray-600"}`}
          onClick={onClose}
        >
          Cancel
        </button>
        {/* <button onClick={handleConfirm} className="px-4 py-2 bg-bws rounded">
          Confirm
        </button> */}
      </div>
    </div>
  );
};

export default AboutMeModalContent;
