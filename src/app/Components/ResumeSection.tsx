import SubHeading from "./SubHeading";
import { useSections } from "../Context/SectionsContext";

type SectionProps = {
  subHeadingText: string;
  index: number;
};

const Section: React.FC<SectionProps> = ({ subHeadingText, index }) => {
  const { sections, setSections } = useSections();

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newSections = [...sections];
    newSections[index].text = e.target.value;
    setSections(newSections);
  };

  return (
    <div className="mb-4">
      <SubHeading text={subHeadingText} />
      <textarea
        className="text-black w-full mt-2 p-2 border border-gray-300 rounded"
        placeholder="Enter text here..."
        value={sections[index].text}
        onChange={handleTextChange}
        data-text
      ></textarea>
    </div>
  );
};

export default Section;
