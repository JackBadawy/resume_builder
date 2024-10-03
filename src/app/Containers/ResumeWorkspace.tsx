"use client";
import jsPDF from "jspdf";
import { generateDocx } from "../Utility/GenerateDocx";
import ResumeSection from "../Components/ResumeSection";
import { useSections } from "../Context/SectionsContext";
import UtilityPanel from "./UtilitiesPanel";
import GenerateButtons from "../Components/GenerateButtons";
import ResumeHeading from "../Components/ResumeHeading";
import ContactDetails from "../Components/ContactDetails";
import { useContactDetails } from "../Context/ContactDetailsContext";
import { useFileContext } from "../Context/FileContext";
import { useModal } from "../Context/ModalContext";
import { useResumeContext } from "../Context/ResumeMetaContext";
import { useResumeHeading } from "../Context/ResumeHeadingContext";

const ResumeWorkspace: React.FC = () => {
  const { sections } = useSections();
  const { resumeRef, a4Ref } = useResumeContext();
  const { contactDetails, linkedInEnabled, addressEnabled } =
    useContactDetails();
  const { fileName, setFileName } = useFileContext();
  const { openModal, closeModal } = useModal();
  const { fullName, jobTitle } = useResumeHeading();

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
    openModal(
      "Please enter the filename for your resume.",
      handleSaveConfirm,
      fileName
    );
  };

  const handleSaveConfirm = async (fileName?: string[]) => {
    if (resumeRef.current && fileName && fileName.length > 0) {
      const actualFileName = fileName[0];
      await generateDocx(
        sections,
        {
          ...contactDetails,
          fullName: fullName,
          jobTitle: jobTitle,
        },
        linkedInEnabled,
        addressEnabled,
        actualFileName
      );
      setFileName(actualFileName);
      closeModal();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mb-7">
      <GenerateButtons
        generatePDF={generatePDF}
        docxFunc={handleGenerateDocx}
      />
      <div className="horizontalResume&UtilCont grid grid-cols-[1fr_auto_1fr]">
        <UtilityPanel />
        <div
          className="resumePreview h-a4 w-a4 shadow-2xl bg-white p-msmargin"
          ref={a4Ref}
        >
          <div className="resumeheightreader" ref={resumeRef}>
            <ResumeHeading />
            <ContactDetails />
            <div className="flex flex-col" id="sectionsContainer">
              {sections.map((section, index) => (
                <ResumeSection
                  key={index}
                  subHeadingText={section.heading}
                  section={section}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeWorkspace;
