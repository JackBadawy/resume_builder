import SubHeading from "./SubHeading";
import DynamicHeightTxtArea from "./DynamicHeightTxtArea";
import { useSections } from "../Context/SectionsContext";

type SectionProps = {
  subHeadingText: string;
  index: number;
};

const Section: React.FC<SectionProps> = ({ subHeadingText, index }) => {
  const { isLoading } = useSections();

  if (isLoading) {
    return (
      <div>
        <SubHeading text="loading" />
        <div className="text-black">Loading section...</div>
      </div>
    );
  }

  return (
    <div>
      <SubHeading text={subHeadingText} />
      <DynamicHeightTxtArea index={index} />
    </div>
  );
};

export default Section;
