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
      textarea.style.height = "auto";
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
      className="font-aptos text-black text-word-11 w-full border-none resize-none p-0 overflow-hidden"
      placeholder="Enter text here..."
      rows={1}
      onChange={handleTextChange}
      value={sections[index].text}
      style={{ height: "auto" }}
      data-text
    />
  );
};

export default DynamicHeightTxtArea;
