"use client";
import React, { useEffect, useState } from "react";
import SubHeading from "./SubHeading";
import { useSections } from "../Context/SectionsContext";
import SectionHelperBtn from "./SectionComponents/SectionHelperBtn";
import SectionEntryComponent from "./SectionComponents/SectionEntryComponent";
import { Section as SectionType } from "../Context/SectionsContext";

interface SectionProps {
  subHeadingText: string;
  section: SectionType;
  index: number;
}

const Section: React.FC<SectionProps> = ({
  subHeadingText,
  section,
  index,
}) => {
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
          <SectionHelperBtn section={subHeadingText} />
          {section.sectionContent &&
            section.sectionContent.map((entry, entryIndex) => (
              <SectionEntryComponent
                key={entry.id}
                entry={entry}
                sectionIndex={index}
                entryIndex={entryIndex}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default Section;
