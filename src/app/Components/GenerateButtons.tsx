import { useState } from "react";
import { useSections } from "../Context/SectionsContext";
import { useModal } from "../Context/ModalContext";
import AlertModal from "./Modals/AlertModal";

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
  const generateDocumentAttemptValidityCheck = (func: () => void) => {
    const emptySectionsCheck = sections.every(
      (section) => section.sectionContent //need to fix
    );
    if (emptySectionsCheck) {
      func();
    } else {
      openModal("Please fill out or delete all unpopulated sections");
    }
  };

  return (
    <>
      {/* <button
        onClick={generatePDF}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Generate PDF
      </button> */}
      <button
        onClick={() => generateDocumentAttemptValidityCheck(docxFunc)}
        className="mb-4 mt-4 px-4 py-2 bg-bws text-white rounded"
      >
        Generate Word Doc
      </button>
    </>
  );
};

export default GenerateButtons;
