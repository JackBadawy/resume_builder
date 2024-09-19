import React, { useEffect, useState } from "react";
import { AboutMeTemplateTable } from "../Utility/AboutMeTemplateTable";

interface SelectionCaroselProps {
  fullName: string;
  jobTitle: string;
  onConfirm: (content: string[]) => void;
}

const SelectionCarosel: React.FC<SelectionCaroselProps> = ({
  fullName,
  jobTitle,
  onConfirm,
}) => {
  const [userInfo, setUserInfo] = useState<string[]>([]);
  const [templateIndex, setTemplateIndex] = useState<number>(0);

  /* useEffect(() => {
    console.log("this is a carousel test");
    if (fullName && jobTitle) {
      const firstName = fullName.split(" ")[0];
      setUserInfo([firstName, jobTitle]);
    }
  }, [fullName, jobTitle]); */
  const aboutMeTemplates = AboutMeTemplateTable(userInfo[0], userInfo[1]);

  const handleAddTemplate = () => {
    const selectedTemplate = aboutMeTemplates[templateIndex];
    onConfirm([selectedTemplate]);
  };

  const templateCounter = () => {
    return `${templateIndex + 1} / ${aboutMeTemplates.length}`;
  };

  const returnTemplate = (index: number) => {
    return aboutMeTemplates[index];
  };

  const iterateCounter = (operator: string) => {
    switch (operator) {
      case "+":
        setTemplateIndex(
          templateIndex != aboutMeTemplates.length - 1 ? templateIndex + 1 : 0
        );
        break;
      case "-":
        setTemplateIndex(
          templateIndex != 0 ? templateIndex - 1 : aboutMeTemplates.length - 1
        );
        break;
      default:
        setTemplateIndex(0);
      /* throw "invalid operator passed to about me carosel"; */
    }
  };

  {
    return (
      <div>
        {/* <p>{userInfo[0]}</p>
        <p>{userInfo[1]}</p> */}
        <div className="flex justify-end gap-2 mb-1">
          <button
            onClick={() => iterateCounter("-")}
            className="px-4 py-2 bg-bws rounded mb-1"
          >
            -
          </button>
          <span className="bg-slate-700 p-1 rounded mb-2 px-2">
            {templateCounter()}
          </span>
          <button
            onClick={() => iterateCounter("+")}
            className="px-4 py-2 bg-bws rounded mb-1"
          >
            +
          </button>
        </div>
        <div className="bg-slate-700 p-1 rounded mb-4 px-2 max-w-7xl">
          <p>{returnTemplate(templateIndex)}</p>
        </div>
        <button
          onClick={handleAddTemplate}
          className="px-4 py-2 bg-bws rounded mt-1"
        >
          Add Template
        </button>
      </div>
    );
  }
};

export default SelectionCarosel;
