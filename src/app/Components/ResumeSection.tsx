import SubHeading from "./SubHeading";

type SectionProps = {
  subHeadingText: string;
};

const Section: React.FC<SectionProps> = ({ subHeadingText }) => {
  return (
    <div className="mb-4">
      <SubHeading text={subHeadingText} />
      <textarea
        className="text-black w-full mt-2 p-2 border border-gray-300 rounded"
        placeholder="Enter text here..."
        data-text
      ></textarea>
    </div>
  );
};

export default Section;
