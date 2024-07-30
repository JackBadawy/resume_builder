import { useRef, useMemo, useCallback, useLayoutEffect, useState } from "react";
import { useSections } from "../Context/SectionsContext";
import { useResumeContext } from "../Context/ResumeMetaContext";
import { useModal } from "../Context/ModalContext";

interface DynamicHeightTextareaProps {
  sectionIndex: number;
  entryIndex: number;
}

const DynamicHeightTxtArea: React.FC<DynamicHeightTextareaProps> = ({
  sectionIndex,
  entryIndex,
}) => {
  const { sections, setSections } = useSections();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const textValue = useMemo(
    () => sections[sectionIndex].sectionContent[entryIndex].entryContent,
    [sections, sectionIndex, entryIndex]
  );
  /* const textValue = useMemo(
    () => sections[sectionIndex].sectionContent[entryIndex].entryContent || "",
    [sections, sectionIndex, entryIndex]
  ); */
  const { resumeRef, heightMinusPadding } = useResumeContext();
  const { openModal } = useModal();

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
          openModal("Adding more text will exceed the page limit.");
          textarea.value = textValue;
          adjustTextareaHeight();
          return;
        }

        setSections((prevSections) => {
          const updatedSections = [...prevSections];
          updatedSections[sectionIndex].sectionContent[
            entryIndex
          ].entryContent = newText;
          return updatedSections;
        });

        adjustTextareaHeight();
      }
    },
    [
      adjustTextareaHeight,
      checkHeight,
      sectionIndex,
      entryIndex,
      setSections,
      openModal,
      textValue,
    ]
  );

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
    </>
  );
};

export default DynamicHeightTxtArea;
