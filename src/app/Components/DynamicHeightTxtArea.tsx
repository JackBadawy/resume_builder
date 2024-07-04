import { useRef, useMemo, useCallback, useLayoutEffect } from "react";
import { useSections } from "../Context/SectionsContext";
import debounce from "lodash/debounce";
interface DynamicHeightTextareaProps {
  index: number;
}

const DynamicHeightTxtArea: React.FC<DynamicHeightTextareaProps> = ({
  index,
}) => {
  const { sections, setSections } = useSections();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const textValue = useMemo(() => sections[index].text, [sections, index]);

  const adjustTextareaHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, []);

  const debouncedAdjustHeight = useMemo(
    () => debounce(adjustTextareaHeight, 100),
    [adjustTextareaHeight]
  );

  useLayoutEffect(() => {
    adjustTextareaHeight();
  }, [textValue, adjustTextareaHeight]);

  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newSections = [...sections];
      newSections[index].text = e.target.value;
      setSections(newSections);
      debouncedAdjustHeight();
    },
    [sections, index, setSections, debouncedAdjustHeight]
  );

  return (
    <textarea
      ref={textareaRef}
      className="font-aptos text-black text-word-11 w-full border-none resize-none p-0 overflow-hidden outline-none"
      placeholder="Enter text here..."
      rows={1}
      onChange={handleTextChange}
      value={textValue}
      style={{ height: "auto" }}
      data-text
    />
  );
};

export default DynamicHeightTxtArea;
