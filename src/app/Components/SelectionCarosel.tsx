import React, { useEffect, useState } from "react";
import { AboutMeTemplateTable } from "../Utility/AboutMeTemplateTable";

interface SelectionCaroselProps {
  fullName: string;
  jobTitle: string;
}

const SelectionCarosel: React.FC<SelectionCaroselProps> = ({
  fullName,
  jobTitle,
}) => {
  const [userInfo, setUserInfo] = useState<string[]>([]);
  useEffect(() => {
    console.log("this is a carousel test");
    if (fullName && jobTitle) {
      const firstName = fullName.split(" ")[0];
      setUserInfo([firstName, jobTitle]);
    }
  }, [fullName, jobTitle]);
  const aboutMeTemplates = AboutMeTemplateTable(userInfo[0], userInfo[1]);

  const addTemplate = () => {
    //
  };

  {
    return (
      <div>
        <p>{userInfo[0]}</p>
        <p>{userInfo[1]}</p>
        <div className="bg-slate-700 p-1 rounded mb-4 px-2 w-max">
          <p>{aboutMeTemplates[0]}</p>
        </div>
        <button className="px-4 py-2 bg-bws rounded mt-1">Add Template</button>
      </div>
    );
  }
};

export default SelectionCarosel;
