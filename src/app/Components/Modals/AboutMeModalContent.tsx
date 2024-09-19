import { useState } from "react";
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
  //might have slightly different layout in this one. an insert button that populates the about
  //me para and maybe another modal to warn of existing content being overridden
  //add template btn should be on this page
  const { fullName, jobTitle } = useResumeHeading();

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
