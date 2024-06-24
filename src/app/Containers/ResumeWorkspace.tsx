"use client";

import jsPDF from "jspdf";
import { useRef } from "react";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
import Section from "../Components/ResumeSection";
import { SectionsProvider, useSections } from "../Context/SectionsContext";
import UtilityPanel from "../Components/UtilitiesPanel";
import GenerateButtons from "../Components/GenerateButtons";
import ResumeHeading from "../Components/ResumeHeading";

const ResumeWorkspace = () => {
  const resumeRef = useRef<HTMLDivElement>(null);
  const { sections } = useSections();

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

  const generateDocx = async () => {
    if (!resumeRef.current) return;

    const elements = Array.from(
      resumeRef.current.querySelectorAll("[data-text]")
    );
    const children = elements.map((element) => {
      const htmlElement = element as HTMLElement;
      let textContent =
        (htmlElement as HTMLTextAreaElement).value || htmlElement.innerText;

      if (htmlElement.tagName.toLowerCase() === "textarea") {
        return new Paragraph({
          children: [
            new TextRun({
              text: textContent,
              size: 22,
              font: "Aptos (body)", //here's where i'll add dynamic font
            }),
          ],
        });
      } else if (htmlElement.tagName.toLowerCase() === "span") {
        return new Paragraph({
          children: [
            new TextRun({
              text: textContent,
              bold: true,
              underline: {},
              size: 32,
              font: "Aptos (body)",
            }),
          ],
        });
      }

      return new Paragraph({
        children: [
          new TextRun({
            text: textContent,
          }),
        ],
      });
    });

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: children,
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, "resume.docx");
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <GenerateButtons generatePDF={generatePDF} generateDocx={generateDocx} />
      <div className="horizontalResume&UtilCont flex">
        <UtilityPanel />
        <div
          ref={resumeRef}
          className="resumePreview h-a4 w-a4 border-2 border-amber-500 bg-white p4 p-msmargin"
        >
          <ResumeHeading />
          {sections.map((subHeadingText, index) => (
            <Section key={index} subHeadingText={subHeadingText} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumeWorkspace;
