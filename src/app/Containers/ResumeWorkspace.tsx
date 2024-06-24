//consider moving to containers folder if rendering lots of components
//consider removing outer container
//bg-green-500

"use client";

import jsPDF from "jspdf";
import { useRef } from "react";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  BorderStyle,
  WidthType,
} from "docx";
import { saveAs } from "file-saver";
import SubHeading from "../Components/SubHeading";
import Section from "../Components/ResumeSection";

const ResumeWorkspace = () => {
  const resumeRef = useRef<HTMLDivElement>(null);

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
      } else if (
        htmlElement.tagName.toLowerCase() === "span" &&
        htmlElement.className.includes("bg-bws")
      ) {
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
    <div className="flex flex-col items-center justify-center ">
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
      <div
        ref={resumeRef}
        className=" h-a4 w-a4 border-2 border-amber-500 bg-white p4 p-msmargin"
      >
        <Section subHeadingText="SubHeading 1" />
        <Section subHeadingText="SubHeading 2" />
      </div>
    </div>
  );
};

export default ResumeWorkspace;
