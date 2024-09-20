import React from "react";
import { SectionEntry } from "@/app/Context/SectionsContext";
import DynamicHeightTxtArea from "../DynamicHeightTxtArea";
import EntryDeleteButton from "./EntryDeleteButton";

interface EntryProps {
  entry: SectionEntry;
  sectionIndex: number;
  entryIndex: number;
  aboutMe: boolean;
}

const SectionEntryComponent: React.FC<EntryProps> = ({
  entry,
  sectionIndex,
  entryIndex,
  aboutMe,
}) => {
  return (
    <div className="mb-4">
      {aboutMe &&
        entry.entryContent.map((content, contentIndex) => (
          <div key={contentIndex} className="flex mb-2">
            <DynamicHeightTxtArea
              sectionIndex={sectionIndex}
              entryIndex={entryIndex}
            />
          </div>
        ))}
      {!aboutMe &&
        entry.entryContent.map((content, contentIndex) => (
          <div key={contentIndex} className="flex mb-2">
            <p className="font-aptos text-black text-word-11 w-full border-none resize-none p-0 overflow-hidden outline-none">
              {content}
            </p>
          </div>
        ))}
      {!aboutMe && entry.entryContent.length > 0 && (
        <div className="flex justify-end">
          <EntryDeleteButton
            sectionIndex={sectionIndex}
            entryIndex={entryIndex}
          />
        </div>
      )}
    </div>
  );
};

export default SectionEntryComponent;
