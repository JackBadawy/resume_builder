import React, { useState } from "react";
import { useSections } from "../Context/SectionsContext";
import { useModal } from "../Context/ModalContext";
import ATSModal from "./Modals/ATSModal";

interface GenerateButtonsProps {
  generatePDF: () => void;
  docxFunc: () => void;
}

const GenerateButtons: React.FC<GenerateButtonsProps> = ({
  generatePDF,
  docxFunc,
}) => {
  const { sections } = useSections();
  const { openModal } = useModal();
  const [isATSModalOpen, setIsATSModalOpen] = useState(false);

  const generateDocumentAttemptValidityCheck = (func: () => void) => {
    const emptySectionsCheck = sections.every(
      (section) =>
        section.sectionContent.length &&
        section.sectionContent.every((item) => !item.entryContent.includes(""))
    );
    if (emptySectionsCheck) {
      func();
    } else {
      openModal("Please fill out or delete all unpopulated sections");
    }
  };

  const handleATSClick = () => {
    setIsATSModalOpen(true);
  };

  return (
    <>
      <button
        onClick={() => generateDocumentAttemptValidityCheck(docxFunc)}
        className="mb-4 mt-4 px-4 py-2 bg-bws text-white rounded"
      >
        Generate Word Doc
      </button>
      <button
        onClick={handleATSClick}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        What is ATS?
      </button>
      <ATSModal
        isOpen={isATSModalOpen}
        onClose={() => setIsATSModalOpen(false)}
      />
    </>
  );
};

export default GenerateButtons;
