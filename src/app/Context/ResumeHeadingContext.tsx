"use client";
import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

interface ResumeHeadingContextProps {
  fullName: string;
  setFullName: React.Dispatch<React.SetStateAction<string>>;
  jobTitle: string;
  setJobTitle: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
}

const ResumeHeadingContext = createContext<
  ResumeHeadingContextProps | undefined
>(undefined);

export const ResumeHeadingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [fullName, setFullName] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("fullName") || "";
    }
    return "";
  });

  const [jobTitle, setJobTitle] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("jobTitle") || "";
    }
    return "";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("fullName", fullName);
      localStorage.setItem("jobTitle", jobTitle);
      setIsLoading(false);
    }
  }, [fullName, jobTitle]);

  return (
    <ResumeHeadingContext.Provider
      value={{ fullName, setFullName, jobTitle, setJobTitle, isLoading }}
    >
      {children}
    </ResumeHeadingContext.Provider>
  );
};

export const useResumeHeading = (): ResumeHeadingContextProps => {
  const context = useContext(ResumeHeadingContext);
  if (!context) {
    throw new Error(
      "useResumeHeading must be used within a ResumeHeadingProvider"
    );
  }
  return context;
};
