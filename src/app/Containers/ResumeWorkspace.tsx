import React, { useRef, useState } from "react";
import jsPDF from "jspdf";
import { generateDocx } from "../Utility/GenerateDocx";
import Section from "../Components/ResumeSection";
import { useSections } from "../Context/SectionsContext";
import UtilityPanel from "../Components/UtilitiesPanel";
import GenerateButtons from "../Components/GenerateButtons";
import ResumeHeading from "../Components/ResumeHeading";
import ContactDetails from "../Components/ContactDetails";

const ResumeWorkspace: React.FC = () => {
  const resumeRef = useRef<HTMLDivElement>(null);
  const { sections } = useSections();
  const [contactDetails, setContactDetails] = useState<Record<string, string>>(
    {}
  );

  const handleContactDetailsUpdate = (details: Record<string, string>) => {
    setContactDetails(details);
  };

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

  return (
    <div className="flex flex-col items-center justify-center">
      <GenerateButtons
        generatePDF={generatePDF}
        generateDocx={() =>
          resumeRef.current && generateDocx(resumeRef.current, contactDetails)
        }
      />
      <div className="horizontalResume&UtilCont flex">
        <UtilityPanel />
        <div
          ref={resumeRef}
          className="resumePreview h-a4 w-a4 border-2 border-amber-500 bg-white p4 p-msmargin"
        >
          <ResumeHeading />
          <ContactDetails onUpdate={handleContactDetailsUpdate} />
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
  );
};

export default ResumeWorkspace;
