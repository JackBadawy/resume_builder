type TestContentProps = {
  color: string;
  top: string;
  left: string;
};

const TestContent: React.FC<TestContentProps> = ({ color, top, left }) => {
  return (
    <span className={`${color} absolute ${top} ${left} font-sans `} data-text>
      TEST CONTENT!!!
    </span>
  );
};

export default TestContent;
