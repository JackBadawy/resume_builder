import { useEffect, useRef } from "react";
import { useSections } from "../Context/SectionsContext";

interface DynamicHeightTextareaProps {
  index: number;
}

const DynamicHeightTxtArea: React.FC<DynamicHeightTextareaProps> = ({
  index,
}) => {
  const { sections, setSections } = useSections();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const textValue = sections[index].text;

  useEffect(() => {
    adjustTextareaHeight();
  }, [textValue]);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      // textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newSections = [...sections];
    newSections[index].text = e.target.value;
    setSections(newSections);
    adjustTextareaHeight();
  };

  return (
    <textarea
      ref={textareaRef}
      className="font-aptos text-black text-word-11 w-full border border-gray-300 rounded h-auto resize-none overflow-hidden p-2"
      placeholder="Enter text here..."
      onChange={handleTextChange}
      value={sections[index].text}
      data-text
    />
  );
};

export default DynamicHeightTxtArea;
