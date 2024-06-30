import SubHeading from "./SubHeading";
import DynamicHeightTxtArea from "./DynamicHeightTxtArea";

type SectionProps = {
  subHeadingText: string;
  index: number;
};

const Section: React.FC<SectionProps> = ({ subHeadingText, index }) => {
  return (
    <div>
      <SubHeading text={subHeadingText} />
      <DynamicHeightTxtArea index={index} />
    </div>
  );
};

export default Section;
