"use client";
import SubHeading from "./SubHeading";
import DynamicHeightTxtArea from "./DynamicHeightTxtArea";
import { useSections } from "../Context/SectionsContext";
import { useEffect, useState } from "react";

type SectionProps = {
  subHeadingText: string;
  index: number;
};

const Section: React.FC<SectionProps> = ({ subHeadingText, index }) => {
  const { isLoading } = useSections();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  return (
    <div>
      {isLoading ? (
        <div>
          <SubHeading text="loading" />
          <div className="text-black">Loading section...</div>
        </div>
      ) : (
        <div>
          <SubHeading text={subHeadingText} />
          <DynamicHeightTxtArea index={index} />
        </div>
      )}
    </div>
  );
};

export default Section;
