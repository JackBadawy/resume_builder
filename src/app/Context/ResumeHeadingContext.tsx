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
}

const ResumeHeadingContext = createContext<
  ResumeHeadingContextProps | undefined
>(undefined);

export const ResumeHeadingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [fullName, setFullName] = useState<string>(() => {
    const savedFullName = localStorage.getItem("fullName");
    return savedFullName || "";
  });

  const [jobTitle, setJobTitle] = useState<string>(() => {
    const savedJobTitle = localStorage.getItem("jobTitle");
    return savedJobTitle || "";
  });

  useEffect(() => {
    localStorage.setItem("fullName", fullName);
  }, [fullName]);

  useEffect(() => {
    localStorage.setItem("jobTitle", jobTitle);
  }, [jobTitle]);

  return (
    <ResumeHeadingContext.Provider
      value={{ fullName, setFullName, jobTitle, setJobTitle }}
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
