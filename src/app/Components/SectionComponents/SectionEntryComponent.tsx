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
  const renderContent = (content: string) => {
    if (content === "Duties:") {
      return (
        <p className="font-aptos text-black text-word-11 w-full border-none resize-none p-0 font-bold">
          {content}
        </p>
      );
    }
    if (content.startsWith("• ")) {
      return (
        <p className="font-aptos text-black text-word-11 w-full border-none resize-none p-0 pl-4">
          {content}
        </p>
      );
    }
    const parts = content.split(": ");
    if (parts.length > 1) {
      return (
        <p className="font-aptos text-black text-word-11 w-full border-none resize-none p-0">
          <strong>{parts[0]}:</strong> {parts.slice(1).join(": ")}
        </p>
      );
    }
    return (
      <p className="font-aptos text-black text-word-11 w-full border-none resize-none p-0">
        {content}
      </p>
    );
  };

  return (
    <div className="relative">
      {aboutMe &&
        entry.entryContent.map((content, contentIndex) => (
          <div key={contentIndex}>
            <DynamicHeightTxtArea
              sectionIndex={sectionIndex}
              entryIndex={entryIndex}
            />
          </div>
        ))}
      {!aboutMe &&
        entry.entryContent.map((content, contentIndex) => (
          <div key={contentIndex} className="mb-0.5">
            {renderContent(content)}
          </div>
        ))}
      {!aboutMe && entry.entryContent.length > 0 && (
        <EntryDeleteButton
          sectionIndex={sectionIndex}
          entryIndex={entryIndex}
        />
      )}
    </div>
  );
};

export default SectionEntryComponent;
