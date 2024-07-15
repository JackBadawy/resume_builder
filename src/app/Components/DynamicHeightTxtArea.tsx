import { useRef, useMemo, useCallback, useLayoutEffect, useState } from "react";
import { useSections } from "../Context/SectionsContext";
import debounce from "lodash/debounce";
import { useResumeContext } from "../Context/ResumeMetaContext";
import AlertModal from "./AlertModal";

interface DynamicHeightTextareaProps {
  index: number;
}

const DynamicHeightTxtArea: React.FC<DynamicHeightTextareaProps> = ({
  index,
}) => {
  const { sections, setSections } = useSections();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const textValue = useMemo(() => sections[index].text, [sections, index]);
  const { resumeRef, heightMinusPadding } = useResumeContext();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const adjustTextareaHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, []);

  const checkHeight = useCallback(() => {
    if (resumeRef.current) {
      const currentHeight = resumeRef.current.scrollHeight;
      if (currentHeight > heightMinusPadding) {
        return false;
      }
    }
    return true;
  }, [resumeRef, heightMinusPadding]);

  useLayoutEffect(() => {
    adjustTextareaHeight();
  }, [textValue, adjustTextareaHeight]);

  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const textarea = textareaRef.current;
      if (textarea) {
        const newText = e.target.value;
        textarea.value = newText;
        adjustTextareaHeight();

        if (!checkHeight()) {
          setIsModalOpen(true); // Open the modal when height limit is exceeded
          textarea.value = textValue; // Revert to previous value
          adjustTextareaHeight();
          return;
        }

        const newSections = [...sections];
        newSections[index].text = newText;
        setSections(newSections);
      }
    },
    [sections, index, setSections, adjustTextareaHeight, checkHeight, textValue]
  );

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
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
      <AlertModal
        isOpen={isModalOpen}
        onClose={closeModal}
        message="Adding more text will exceed the page height."
      />
    </>
  );
};

export default DynamicHeightTxtArea;
