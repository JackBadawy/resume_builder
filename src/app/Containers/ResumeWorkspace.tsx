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
      let textContent = "";
      let backgroundColor = "";
      let color = htmlElement.style.color.replace("#", "") || "000000"; // Default text color to black

      if (htmlElement.tagName.toLowerCase() === "textarea") {
        textContent = (htmlElement as HTMLTextAreaElement).value;
        backgroundColor = "FFFFFF";
        color = "000000";

        return new Paragraph({
          children: [
            new TextRun({
              text: textContent,
              color: color,
            }),
          ],
          border: {
            top: { size: 2, color: "000000", style: BorderStyle.SINGLE },
            bottom: { size: 2, color: "000000", style: BorderStyle.SINGLE },
            left: { size: 2, color: "000000", style: BorderStyle.SINGLE },
            right: { size: 2, color: "000000", style: BorderStyle.SINGLE },
          },
        });
      } else if (
        htmlElement.tagName.toLowerCase() === "span" &&
        htmlElement.className.includes("bg-bws")
      ) {
        textContent = htmlElement.innerText;
        backgroundColor = "be1e2d"; // Custom color

        return new Paragraph({
          children: [
            new TextRun({
              text: textContent,
              bold: true,
              color: "FFFFFF", // Text color white for contrast
            }),
          ],
          shading: {
            fill: backgroundColor,
          },
          alignment: "center",
          width: {
            size: 3840, // 256 pixels * 15 twips/pixel
            type: WidthType.DXA,
          },
          height: {
            size: 1440, // 96 pixels * 15 twips/pixel
            type: WidthType.DXA,
          },
        });
      } else {
        textContent = htmlElement.innerText;
        backgroundColor = "FFFFFF"; // Default background color
      }

      const textRun = new TextRun({
        text: textContent,
        bold: true,
        color: color,
      });

      return new Paragraph({
        children: [textRun],
        shading: {
          fill: backgroundColor,
        },
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
        className=" h-a4 w-a4 border-2 border-amber-500 bg-white p4"
      >
        <div className="flex flex-col">
          <SubHeading />
          <textarea className="text-black" data-text>
            text
          </textarea>
        </div>
      </div>
    </div>
  );
};

export default ResumeWorkspace;
