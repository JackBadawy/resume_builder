interface GenerateButtonsProps {
  generatePDF: () => void;
  docxFunc: () => void;
}

const GenerateButtons: React.FC<GenerateButtonsProps> = ({
  generatePDF,
  docxFunc,
}) => {
  return (
    <>
      {/* <button
        onClick={generatePDF}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Generate PDF
      </button> */}
      <button
        onClick={docxFunc}
        className="mb-4 mt-4 px-4 py-2 bg-bws text-white rounded"
      >
        Generate Word Doc
      </button>
    </>
  );
};

export default GenerateButtons;
