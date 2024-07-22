import { SectionEntry } from "@/app/Context/SectionsContext";
import DynamicHeightTxtArea from "../DynamicHeightTxtArea";

interface EntryProps {
  entry: SectionEntry;
  sectionIndex: number;
  entryIndex: number;
}

const SectionEntryComponent: React.FC<EntryProps> = ({
  entry,
  sectionIndex,
  entryIndex,
}) => {
  return (
    <div>
      <DynamicHeightTxtArea
        sectionIndex={sectionIndex}
        entryIndex={entryIndex}
      />
    </div>
  );
};

export default SectionEntryComponent;
