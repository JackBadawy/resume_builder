import { useEffect, useRef, ChangeEvent, useCallback } from "react";

interface DynamicWidthInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const DynamicWidthInput: React.FC<DynamicWidthInputProps> = ({
  value,
  onChange,
  placeholder = "",
  className = "",
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const adjustInputWidth = useCallback(() => {
    if (inputRef.current) {
      const tempSpan = document.createElement("span");
      tempSpan.style.visibility = "hidden";
      tempSpan.style.position = "absolute";
      tempSpan.style.whiteSpace = "pre";
      tempSpan.style.font = window.getComputedStyle(inputRef.current).font;
      tempSpan.textContent = inputRef.current.value || placeholder;

      document.body.appendChild(tempSpan);
      const width = tempSpan.getBoundingClientRect().width;
      document.body.removeChild(tempSpan);

      inputRef.current.style.width = `${Math.max(width + 20, 50)}px`;
    }
  }, [placeholder]);

  useEffect(() => {
    adjustInputWidth();
  }, [value, adjustInputWidth]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      onChange={handleInputChange}
      placeholder={placeholder}
      className={`p-2 rounded text-center min-w-[1px] outline-none ${className}`}
      style={{ width: "auto" }}
    />
  );
};

export default DynamicWidthInput;
