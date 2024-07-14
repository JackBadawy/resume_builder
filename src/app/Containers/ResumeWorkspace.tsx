"use client";
import { useState } from "react";
import jsPDF from "jspdf";
import { generateDocx } from "../Utility/GenerateDocx";
import Section from "../Components/ResumeSection";
import { useSections } from "../Context/SectionsContext";
import UtilityPanel from "../Components/UtilitiesPanel";
import GenerateButtons from "../Components/GenerateButtons";
import ResumeHeading from "../Components/ResumeHeading";
import ContactDetails from "../Components/ContactDetails";
import { useContactDetails } from "../Context/ContactDetailsContext";
import { useFileContext } from "../Context/FileContext";
import AlertModal from "../Components/AlertModal";
import { useResumeContext } from "../Context/ResumeMetaContext";

const ResumeWorkspace: React.FC = () => {
  const { sections } = useSections();
  const { resumeRef, a4Ref } = useResumeContext();
  const { contactDetails, linkedInEnabled, addressEnabled } =
    useContactDetails();
  const { fileName, setFileName } = useFileContext();
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  const generatePDF = () => {
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    if (resumeRef.current) {
      const elements = resumeRef.current.querySelectorAll("[data-text]");
      elements.forEach((element: any) => {
        const text = element.innerText;
        const top = parseInt(element.style.top);
        const left = parseInt(element.style.left);
        pdf.text(text, left, top);
      });

      pdf.save("resume.pdf");
    }
  };

  const handleGenerateDocx = () => {
    setIsSaveModalOpen(true);
  };

  const handleSaveConfirm = async (fileName?: string) => {
    if (resumeRef.current && fileName) {
      await generateDocx(
        resumeRef.current,
        contactDetails,
        linkedInEnabled,
        addressEnabled,
        fileName
      );
      setFileName(fileName);
      setIsSaveModalOpen(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <GenerateButtons
        generatePDF={generatePDF}
        docxFunc={handleGenerateDocx}
      />
      <div className="horizontalResume&UtilCont flex">
        <UtilityPanel />
        <div
          className="resumePreview h-a4 w-a4 border-2 border-amber-500 bg-white p-msmargin"
          ref={a4Ref}
        >
          <div className="resumeheightreader" ref={resumeRef}>
            <ResumeHeading />
            <ContactDetails />
            <div className="flex flex-col" id="sectionsContainer">
              {sections.map((section, index) => (
                <Section
                  key={index}
                  subHeadingText={section.heading}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <AlertModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onConfirm={handleSaveConfirm}
        message="Please enter the filename for your resume."
        fileName={fileName}
      />
    </div>
  );
};

export default ResumeWorkspace;
