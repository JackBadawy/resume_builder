import { useState } from "react";
import { useSections } from "../Context/SectionsContext";
import AlertModal from "./AlertModal";

interface GenerateButtonsProps {
  generatePDF: () => void;
  docxFunc: () => void;
}

const GenerateButtons: React.FC<GenerateButtonsProps> = ({
  generatePDF,
  docxFunc,
}) => {
  const { sections } = useSections();
  const [isOpen, setIsOpen] = useState(false);
  const generateDocumentAttemptValidityCheck = (func: () => void) => {
    const emptySectionsCheck = sections.every(
      (section) => section.text.trim() != ""
    );
    if (emptySectionsCheck) {
      func();
    } else {
      setIsOpen(true);
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
      <AlertModal
        isOpen={isOpen}
        onClose={function (): void {
          setIsOpen(false);
        }}
        message={"Please fill out or delete all unpopulated sections"}
      />
    </>
  );
};

export default GenerateButtons;
