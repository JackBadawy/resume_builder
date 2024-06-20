//consider moving to containers folder if rendering lots of components
//consider removing outer container
//bg-green-500

"use client";

import jsPDF from "jspdf";
import { useRef } from "react";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
import TestContent from "./TestContent";

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

  return (
    <div className="flex flex-col items-center justify-center">
      <button
        onClick={generatePDF}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Generate PDF
      </button>
      <div
        ref={resumeRef}
        className="h-a4 w-a4 border-2 border-amber-500 bg-blue-900 relative"
      >
        <TestContent color="bg-green-500" top="top-10" left="left-10" />
        <TestContent color="bg-red-600" top="top-60" left="left-60" />
      </div>
    </div>
  );
};

export default ResumeWorkspace;
