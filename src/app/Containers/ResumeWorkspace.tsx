import React, { useRef, useState } from "react";
import jsPDF from "jspdf";
import { Document, Packer, Paragraph, TextRun, BorderStyle } from "docx";
import { saveAs } from "file-saver";
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

  const generateDocx = async () => {
    if (!resumeRef.current) return;

    const elements = Array.from(
      resumeRef.current.querySelectorAll("[data-text]")
    );

    const contactParagraphs = Object.entries(contactDetails).map(
      ([key, value]) =>
        new Paragraph({
          children: [
            new TextRun({
              text: value,
              size: 22,
              font: "Aptos (body)",
            }),
          ],
        })
    );

    const horizontalLineParagraph = new Paragraph({
      border: {
        bottom: {
          color: "000000",
          space: 1,
          style: BorderStyle.SINGLE,
          size: 6,
        },
      },
    });

    const filteredElements = elements.filter(
      (element) => !(element as HTMLInputElement).id.includes("contactDetail")
    );

    const children = filteredElements
      .map((element) => {
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
              new TextRun({
                break: 1,
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
        } else if (
          htmlElement.tagName.toLowerCase() === "input" &&
          !htmlElement.id.includes("contactDetail")
        ) {
          const isJobTitle = htmlElement.id === "jobTitle";
          const headingParagraph = new Paragraph({
            children: [
              new TextRun({
                text: textContent,
                bold: true,
                size: isJobTitle ? 36 : 50,
                font: "Aptos (body)",
              }),
            ],
          });

          if (isJobTitle) {
            const horizontalLineParagraph = new Paragraph({
              border: {
                bottom: {
                  color: "000000",
                  space: 1,
                  style: BorderStyle.SINGLE,
                  size: 6,
                },
              },
            });

            const breakParagraph = new Paragraph({
              children: [
                new TextRun({
                  break: 1,
                }),
              ],
            });

            return [headingParagraph, horizontalLineParagraph, breakParagraph];
          }

          return headingParagraph;
        }

        return new Paragraph({
          children: [
            new TextRun({
              text: textContent,
            }),
          ],
        });
      })
      .flat();

    const docChildren = [
      ...children.slice(0, 3),
      ...contactParagraphs,
      horizontalLineParagraph,
      ...children.slice(3),
    ];

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: docChildren,
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
          <ContactDetails onUpdate={handleContactDetailsUpdate} />
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
  );
};

export default ResumeWorkspace;
