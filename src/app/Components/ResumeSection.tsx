import React from "react";
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

  if (isLoading) {
    return (
      <div>
        <SubHeading text="loading" />
        <div className="text-black">Loading section...</div>
      </div>
    );
  }

  const isReferences = section.heading === "References";

  return (
    <div>
      <SubHeading text={subHeadingText} />
      <SectionHelperBtn section={section} index={index} />
      {isReferences ? (
        <div className="flex flex-wrap gap-20">
          {section.sectionContent.map((entry, entryIndex) => (
            <div key={`${section.heading}.${entry.id}`}>
              <SectionEntryComponent
                entry={entry}
                sectionIndex={index}
                entryIndex={entryIndex}
                aboutMe={false}
                heading={section.heading}
              />
            </div>
          ))}
        </div>
      ) : (
        section.sectionContent.map((entry, entryIndex) => (
          <SectionEntryComponent
            key={`${section.heading}.${entry.id}`}
            entry={entry}
            sectionIndex={index}
            entryIndex={entryIndex}
            aboutMe={section.heading === "About Me"}
            heading={section.heading}
          />
        ))
      )}
    </div>
  );
};

export default Section;
