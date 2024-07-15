"use client";
import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface ResumeContextType {
  resumeRef: React.RefObject<HTMLDivElement>;
  a4Ref: React.RefObject<HTMLDivElement>;
  scrollHeight: number;
  heightMinusPadding: number;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const resumeRef = useRef<HTMLDivElement>(null);
  const a4Ref = useRef<HTMLDivElement>(null);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [heightMinusPadding, setHeightMinusPadding] = useState(0);

  useEffect(() => {
    if (resumeRef.current && a4Ref.current) {
      const computedStyle = getComputedStyle(a4Ref.current);
      const paddingTop = parseFloat(computedStyle.paddingTop);
      const paddingBottom = parseFloat(computedStyle.paddingBottom);
      // console.log(paddingTop, paddingBottom);
      setScrollHeight(resumeRef.current.scrollHeight);
      setHeightMinusPadding(
        a4Ref.current.clientHeight - paddingTop - paddingBottom
      );
      //  console.log(heightMinusPadding);
    }
  }, [resumeRef, a4Ref, resumeRef.current?.scrollHeight]);

  return (
    <ResumeContext.Provider
      value={{ resumeRef, a4Ref, scrollHeight, heightMinusPadding }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResumeContext = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResumeContext must be used within a ResumeProvider");
  }
  return context;
};
