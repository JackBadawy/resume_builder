type SubheadingProp = {
  text: string;
};

const SubHeading: React.FC<SubheadingProp> = ({ text }) => {
  return (
    <span
      className=" w-64 h-10 font-aptos text-2xl font-bold underline text-black text-word-16"
      data-text
    >
      {text}
    </span>
  );
};

export default SubHeading;
