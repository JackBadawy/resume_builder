import React from "react";

interface ATSModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ATSModal: React.FC<ATSModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 fade-in">
      <div className="bg-slate-800 p-6 rounded-lg shadow-md text-white w-160 slide-down">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">What is ATS?</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="text-left">
          <p className="mb-2">
            ATS stands for Applicant Tracking System. It&apos;s a software used
            by employers to manage job applications and screen resumes. Here are
            some key points about ATS:
          </p>
          <ul className="list-disc list-inside mb-4 ml-4">
            <li>
              ATS helps employers filter and sort large volumes of resumes
            </li>
            <li>
              It scans resumes for relevant keywords related to the job
              description
            </li>
            <li>
              Simple, clean formatting is often better for ATS readability
            </li>
            <li>
              Using industry-standard section headings can improve your
              resume&apos;s ATS performance
            </li>
          </ul>
          <p>
            To make your resume more ATS-friendly, focus on including relevant
            keywords from the job description and using a clear, simple layout.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ATSModal;
