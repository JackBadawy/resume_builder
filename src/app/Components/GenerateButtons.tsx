interface GenerateButtonsProps {
  generatePDF: () => void;
  generateDocx: () => void;
}

const GenerateButtons: React.FC<GenerateButtonsProps> = ({
  generatePDF,
  generateDocx,
}) => {
  return (
    <>
      <button
        onClick={generatePDF}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Generate PDF
      </button>
      <button
        onClick={generateDocx}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Generate Word Doc
      </button>
    </>
  );
};

export default GenerateButtons;
