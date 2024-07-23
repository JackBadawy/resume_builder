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
    <div>
      {entry.entryContent.length && (
        <div className="flex">
          <DynamicHeightTxtArea
            sectionIndex={sectionIndex}
            entryIndex={entryIndex}
          />
          {!aboutMe && (
            <EntryDeleteButton
              sectionIndex={sectionIndex}
              entryIndex={entryIndex}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default SectionEntryComponent;
